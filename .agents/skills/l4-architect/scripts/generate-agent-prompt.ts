import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

type Row = Record<string, string>;

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function table(headers: string[], rows: Row[]): string {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => ':---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => row[header] ?? '').join(' | ')} |`),
  ].join('\n');
}

function contractSection(contract: Record<string, any>): string {
  return `### ${contract.url}

Path: \`${contract.path}\`
SHA-256: \`${contract.sha256}\`

#### Datos generales

${table(['Campo', 'Valor'], contract.general)}

#### Descripción

${contract.description}

#### Lenguaje ubicuo

${table(['Término', 'Definición'], contract.ubiquitousLanguage)}

#### Actores

${table(['Tipo', 'Actor', 'Responsabilidad'], contract.actors)}

#### Precondiciones

${table(['ID', 'Condición'], contract.preconditions)}

#### Flujo principal

${table(['Paso', 'Actor', 'Acción'], contract.mainFlow)}

#### Flujos alternos

${table(['ID', 'Paso origen', 'Condición', 'Flujo', 'Resultado'], contract.alternativeFlows)}

#### Postcondiciones

${table(['ID', 'Condición'], contract.postconditions)}

#### Reglas de negocio

${table(['ID', 'Nombre', 'Descripción / Restricción'], contract.businessRules)}`;
}

const contextFile = argument('--context');
const out = argument('--out') ?? '.tmp/plans/prompt.md';
const role = argument('--role') ?? 'l4-architect';
if (!contextFile) throw new Error('Use --context <context.json> --out <prompt.md>.');

const context = JSON.parse(readFileSync(contextFile, 'utf8'));
const prompt = `# LAND4 Agent Instruction

## Traceability

| Field | Value |
| :--- | :--- |
| Role | \`${role}\` |
| US | ${context.userStory.title} |
| Area | ${context.userStory.area} |
| Status | ${context.userStory.status} |
| Issue | ${context.generatedFrom.issueUrl} |
| Checkout commit | \`${context.generatedFrom.commit}\` |
| Issue SHA-256 | \`${context.generatedFrom.issueSha256}\` |

## Objective

Como **${context.userStory.story.Como}**, quiero **${context.userStory.story.Quiero}**, para **${context.userStory.story.Para}**.

${context.userStory.description}

## Tasks

${table(['ID', 'Descripción', 'Estado'], context.userStory.tasks)}

## Acceptance Criteria

${table(['ID', 'Dado', 'Cuando', 'Entonces'], context.userStory.acceptanceCriteria)}

## Test Cases

${table(['ID', 'CA relacionado', 'Tipo', 'Arrange', 'Act', 'Assert', 'Evidencia / Automatización'], context.userStory.testCases)}

## Domain Contracts

${context.contracts.map(contractSection).join('\n\n')}

## Planning Rules

- Create only an implementation plan; do not implement code.
- Work only within the US scope and preserve every CU contract.
- Use TDD planning: tests first, minimum implementation, refactor with green tests.
- Cover every CP mapped to CA.
- Include Docs-as-Code updates when behavior, contracts, architecture, deployment, or operating instructions change.
- Do not add secrets, credentials, or sensitive production data.
- Keep generated plan in .tmp/plans until human approval.
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, prompt, 'utf8');
console.log(`Generated ${out}`);
