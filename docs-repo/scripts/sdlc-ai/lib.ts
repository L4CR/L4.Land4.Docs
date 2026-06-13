import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

export type Row = Record<string, string>;
export type Table = { headers: string[]; rows: Row[] };

export type BacklogIssue = {
  title: string;
  body: string;
  url: string;
  projectItems: unknown[];
};

export interface BacklogAdapter {
  load(): BacklogIssue;
}

export class GitHubBacklogAdapter implements BacklogAdapter {
  private issue: string;
  private repo?: string;

  constructor(issue: string, repo?: string) {
    this.issue = issue;
    this.repo = repo;
  }

  load(): BacklogIssue {
    const args = ['issue', 'view', this.issue, '--json', 'title,body,url,projectItems'];
    if (this.repo) args.push('--repo', this.repo);
    return JSON.parse(execFileSync('gh', args, { encoding: 'utf8' })) as BacklogIssue;
  }
}

export class FixtureBacklogAdapter implements BacklogAdapter {
  private file: string;

  constructor(file: string) {
    this.file = file;
  }
  load(): BacklogIssue {
    return JSON.parse(readFileSync(this.file, 'utf8')) as BacklogIssue;
  }
}

function clean(value: string): string {
  return value.trim().replace(/^`|`$/g, '');
}

export function extractSection(markdown: string, heading: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) throw new Error(`Missing required section: ${heading}`);
  const endOffset = lines.slice(start + 1).findIndex((line) => /^##\s+/.test(line));
  return lines.slice(start + 1, endOffset === -1 ? undefined : start + 1 + endOffset).join('\n').trim();
}

export function parseTable(section: string, required: string[]): Table {
  const lines = section.split('\n').filter((line) => line.trim().startsWith('|'));
  if (lines.length < 3) throw new Error(`Expected Markdown table with columns: ${required.join(', ')}`);
  const headers = lines[0].split('|').slice(1, -1).map(clean);
  for (const column of required) {
    if (!headers.includes(column)) throw new Error(`Missing required table column: ${column}`);
  }
  const rows = lines.slice(2).map((line) => {
    const values = line.split('|').slice(1, -1).map(clean);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
  return { headers, rows };
}

function issueSection(body: string, heading: string): string {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const start = lines.findIndex((line) => line.trim() === `### ${heading}`);
  if (start === -1) throw new Error(`Missing required Issue section: ${heading}`);
  const endOffset = lines.slice(start + 1).findIndex((line) => /^###\s+/.test(line));
  return lines.slice(start + 1, endOffset === -1 ? undefined : start + 1 + endOffset).join('\n').trim();
}

function contractUrls(section: string): string[] {
  const urls = section.split('\n').map(clean).filter((line) => line.startsWith('https://github.com/'));
  if (urls.length === 0) throw new Error('US must reference at least one CU contract URL.');
  return urls;
}

function statusFrom(projectItems: unknown[]): string {
  const allowed = ['Backlog', 'Ready', 'In Progress', 'Blocked', 'Done'];
  const serialized = JSON.stringify(projectItems);
  const match = allowed.find((status) => serialized.includes(`\"${status}\"`));
  if (!match) throw new Error('GitHub Project status is missing or invalid.');
  return match;
}

function contractPathFromUrl(url: string): string {
  const match = url.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/main\/(docs-repo\/req\/[^/]+\/CONTRACT\.md)$/);
  if (!match) throw new Error('CU URL must point to docs-repo/req/<caso-de-uso>/CONTRACT.md on GitHub main.');
  return match[1];
}

function ensureUnique(rows: Row[], column: string): void {
  const seen = new Set<string>();
  for (const row of rows) {
    const value = row[column];
    if (!value) throw new Error(`Missing value in required column: ${column}`);
    if (seen.has(value)) throw new Error(`Duplicate ID: ${value}`);
    seen.add(value);
  }
}

function hash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function buildContext(issue: BacklogIssue, cwd = process.cwd()) {
  const relatedContractUrls = contractUrls(issueSection(issue.body, 'CU relacionados'));

  const story = parseTable(issueSection(issue.body, 'Historia'), ['Campo', 'Valor']);
  const acceptanceCriteria = parseTable(issueSection(issue.body, 'Criterios de aceptación'), ['ID', 'Dado', 'Cuando', 'Entonces']).rows;
  const testCases = parseTable(issueSection(issue.body, 'Casos de prueba'), ['ID', 'CA relacionado', 'Tipo', 'Arrange', 'Act', 'Assert', 'Evidencia / Automatización']).rows;
  const tasks = parseTable(issueSection(issue.body, 'Tareas'), ['ID', 'Descripción', 'Estado']).rows;
  ensureUnique(acceptanceCriteria, 'ID');
  ensureUnique(testCases, 'ID');
  ensureUnique(tasks, 'ID');
  for (const criterion of acceptanceCriteria) {
    if (!/^CA-\d{3}$/.test(criterion.ID)) throw new Error(`Invalid CA ID: ${criterion.ID}`);
    if (!testCases.some((test) => test['CA relacionado'] === criterion.ID)) throw new Error(`CA without mapped CP: ${criterion.ID}`);
  }
  for (const test of testCases) {
    if (!/^CP-\d{3}$/.test(test.ID)) throw new Error(`Invalid CP ID: ${test.ID}`);
  }

  const contracts = relatedContractUrls.map((contractUrl) => {
    const contractRelativePath = contractPathFromUrl(contractUrl);
    const contractPath = resolve(cwd, contractRelativePath);
    if (!existsSync(contractPath)) throw new Error(`CU contract not found in checkout: ${contractRelativePath}`);
    const contract = readFileSync(contractPath, 'utf8');
    return {
      url: contractUrl,
      path: relative(cwd, contractPath),
      sha256: hash(contract),
      general: parseTable(extractSection(contract, 'Datos generales'), ['Campo', 'Valor']).rows,
      description: extractSection(contract, 'Descripción'),
      ubiquitousLanguage: parseTable(extractSection(contract, 'Lenguaje ubicuo'), ['Término', 'Definición']).rows,
      actors: parseTable(extractSection(contract, 'Actores'), ['Tipo', 'Actor', 'Responsabilidad']).rows,
      preconditions: parseTable(extractSection(contract, 'Precondiciones'), ['ID', 'Condición']).rows,
      mainFlow: parseTable(extractSection(contract, 'Flujo principal'), ['Paso', 'Actor', 'Acción']).rows,
      alternativeFlows: parseTable(extractSection(contract, 'Flujos alternos'), ['ID', 'Paso origen', 'Condición', 'Flujo', 'Resultado']).rows,
      postconditions: parseTable(extractSection(contract, 'Postcondiciones'), ['ID', 'Condición']).rows,
      businessRules: parseTable(extractSection(contract, 'Reglas de negocio'), ['ID', 'Nombre', 'Descripción / Restricción']).rows,
    };
  });
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8' }).trim();
  return {
    schemaVersion: '1.0.0',
    generatedFrom: { issueUrl: issue.url, commit, issueSha256: hash(issue.body), contracts: contracts.map(({ url, path, sha256 }) => ({ url, path, sha256 })) },
    userStory: {
      title: issue.title,
      status: statusFrom(issue.projectItems),
      story: Object.fromEntries(story.rows.map((row) => [row.Campo, row.Valor])),
      description: issueSection(issue.body, 'Descripción'),
      acceptanceCriteria,
      testCases,
      tasks,
    },
    contracts,
  };
}
