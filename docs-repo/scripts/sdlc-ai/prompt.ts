type Row = Record<string, string>;
type Contract = Record<string, unknown> & {
  url: string;
  path: string;
  sha256: string;
  description: string;
  general: Row[];
  ubiquitousLanguage: Row[];
  actors: Row[];
  preconditions: Row[];
  mainFlow: Row[];
  alternativeFlows: Row[];
  postconditions: Row[];
  businessRules: Row[];
};

function table(headers: string[], rows: Row[]): string {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => ':---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => row[header] ?? '').join(' | ')} |`),
  ].join('\n');
}

function contractSection(contract: Contract): string {
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

export function renderPrompt(context: Record<string, any>, role: string): string {
  return `# LAND4 Agent Instruction

## Traceability

| Field | Value |
| :--- | :--- |
| Role | \`${role}\` |
| US | ${context.userStory.title} |
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

## Execution Rules

- Work only within the US scope and preserve every CU contract.
- Use the selected role skill as the operating procedure.
- Use TDD: add or update tests before implementation, make the minimum change, then refactor with green tests.
- Target at least 80% coverage when the repository supports coverage measurement.
- Execute the CP mapped to every CA and record evidence or automation links when applicable.
- Update Docs-as-Code when behavior, contracts, architecture, deployment, or operating instructions change.
- Do not add secrets, credentials, or sensitive production data.

## Required Completion Report

- Implementation summary.
- CA and CP status.
- Tests executed and coverage result.
- Documentation updated or \`N/A\` with justification.
- Remaining risks, blockers, or follow-up work.
`;
}
