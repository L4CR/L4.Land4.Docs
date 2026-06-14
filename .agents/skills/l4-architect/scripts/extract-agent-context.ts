import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

type Row = Record<string, string>;
type Table = { headers: string[]; rows: Row[] };
type BacklogIssue = {
  title: string;
  body: string;
  url: string;
  projectItems?: unknown[];
  status?: string;
};

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function clean(value: string): string {
  return value.trim().replace(/^`|`$/g, '');
}

function hash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

function section(markdown: string, marker: '##' | '###', heading: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const start = lines.findIndex((line) => line.trim() === `${marker} ${heading}`);
  if (start === -1) throw new Error(`Missing required section: ${heading}`);
  const headingPattern = marker === '##' ? /^##\s+/ : /^###\s+/;
  const endOffset = lines.slice(start + 1).findIndex((line) => headingPattern.test(line));
  return lines.slice(start + 1, endOffset === -1 ? undefined : start + 1 + endOffset).join('\n').trim();
}

function parseTable(tableSection: string, required: string[]): Table {
  const lines = tableSection.split('\n').filter((line) => line.trim().startsWith('|'));
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
  return section(body, '###', heading);
}

function contractSection(body: string, heading: string): string {
  return section(body, '##', heading);
}

function areaFrom(issueAreaSection: string): string {
  let area: string | undefined;
  if (issueAreaSection.split('\n').some((line) => line.trim().startsWith('|'))) {
    const table = parseTable(issueAreaSection, ['Campo', 'Valor']);
    area = table.rows.find((row) => row.Campo === 'Area')?.Valor;
  } else {
    area = clean(issueAreaSection.split('\n').find((line) => line.trim()) ?? '');
  }
  const allowed = ['Tech', 'Business', 'Commercial'];
  if (!area || !allowed.includes(area)) throw new Error('US Area must be Tech, Business or Commercial.');
  return area;
}

function statusFrom(issue: BacklogIssue): string {
  const allowed = ['Backlog', 'Ready', 'In Progress', 'Blocked', 'Done'];
  if (issue.status && allowed.includes(issue.status)) return issue.status;
  const serialized = JSON.stringify(issue.projectItems ?? []);
  const match = allowed.find((status) => serialized.includes(`\"${status}\"`));
  if (!match) throw new Error('Issue status is missing or invalid in local input.');
  return match;
}

function contractUrls(sectionText: string): string[] {
  const urls = sectionText.split('\n').map(clean).filter((line) => line.startsWith('https://github.com/'));
  if (urls.length === 0) throw new Error('US must reference at least one CU contract URL.');
  return urls;
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

const fixture = argument('--fixture');
const out = argument('--out') ?? '.tmp/plans/context.json';
if (!fixture) throw new Error('Use --fixture <issue.json> --out <context.json>.');
if (!existsSync(fixture)) throw new Error(`Fixture file not found: ${fixture}`);

const issue = JSON.parse(readFileSync(fixture, 'utf8')) as BacklogIssue;
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

const cwd = process.cwd();
const contracts = relatedContractUrls.map((contractUrl) => {
  const contractRelativePath = contractPathFromUrl(contractUrl);
  const contractPath = resolve(cwd, contractRelativePath);
  if (!existsSync(contractPath)) throw new Error(`CU contract not found in checkout: ${contractRelativePath}`);
  const contract = readFileSync(contractPath, 'utf8');
  return {
    url: contractUrl,
    path: relative(cwd, contractPath),
    sha256: hash(contract),
    general: parseTable(contractSection(contract, 'Datos generales'), ['Campo', 'Valor']).rows,
    description: contractSection(contract, 'Descripción'),
    ubiquitousLanguage: parseTable(contractSection(contract, 'Lenguaje ubicuo'), ['Término', 'Definición']).rows,
    actors: parseTable(contractSection(contract, 'Actores'), ['Tipo', 'Actor', 'Responsabilidad']).rows,
    preconditions: parseTable(contractSection(contract, 'Precondiciones'), ['ID', 'Condición']).rows,
    mainFlow: parseTable(contractSection(contract, 'Flujo principal'), ['Paso', 'Actor', 'Acción']).rows,
    alternativeFlows: parseTable(contractSection(contract, 'Flujos alternos'), ['ID', 'Paso origen', 'Condición', 'Flujo', 'Resultado']).rows,
    postconditions: parseTable(contractSection(contract, 'Postcondiciones'), ['ID', 'Condición']).rows,
    businessRules: parseTable(contractSection(contract, 'Reglas de negocio'), ['ID', 'Nombre', 'Descripción / Restricción']).rows,
  };
});

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8' }).trim();
const context = {
  schemaVersion: '1.0.0',
  generatedFrom: {
    issueUrl: issue.url,
    commit,
    issueSha256: hash(issue.body),
    contracts: contracts.map(({ url, path, sha256 }) => ({ url, path, sha256 })),
  },
  userStory: {
    title: issue.title,
    status: statusFrom(issue),
    area: areaFrom(issueSection(issue.body, 'Area')),
    story: Object.fromEntries(story.rows.map((row) => [row.Campo, row.Valor])),
    description: issueSection(issue.body, 'Descripción'),
    acceptanceCriteria,
    testCases,
    tasks,
  },
  contracts,
};

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(context, null, 2)}\n`, 'utf8');
console.log(`Generated ${out}`);
