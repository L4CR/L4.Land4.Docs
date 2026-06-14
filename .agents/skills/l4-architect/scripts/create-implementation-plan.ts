import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

type Row = Record<string, string>;

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'user-story';
}

function hash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

function table(headers: string[], rows: Row[]): string {
  if (!rows.length) return '_Sin datos._';
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => ':---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => row[header] ?? '').join(' | ')} |`),
  ].join('\n');
}

function requireArray(value: unknown, label: string): Row[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error(`Missing required context collection: ${label}`);
  return value as Row[];
}

function renderList(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

const contextFile = argument('--context');
const promptFile = argument('--prompt');
if (!contextFile || !promptFile) {
  throw new Error('Use --context <context.json> --prompt <prompt.md> [--out <implementation-plan.md>].');
}
if (!existsSync(contextFile)) throw new Error(`Context file not found: ${contextFile}`);
if (!existsSync(promptFile)) throw new Error(`Prompt file not found: ${promptFile}`);

const context = JSON.parse(readFileSync(contextFile, 'utf8'));
const prompt = readFileSync(promptFile, 'utf8');
const userStory = context.userStory;
if (!userStory) throw new Error('Missing userStory in context.');
if (userStory.status !== 'Ready') throw new Error(`US must be Ready to create an implementation plan. Current status: ${userStory.status}`);

const acceptanceCriteria = requireArray(userStory.acceptanceCriteria, 'userStory.acceptanceCriteria');
const testCases = requireArray(userStory.testCases, 'userStory.testCases');
const tasks = requireArray(userStory.tasks, 'userStory.tasks');
const contracts = Array.isArray(context.contracts) && context.contracts.length > 0 ? context.contracts : null;
if (!contracts) throw new Error('Missing required context collection: contracts');

const out = argument('--out') ?? `.tmp/plans/${slug(userStory.title ?? 'user-story')}/implementation-plan.md`;
const templatePath = new URL('../assets/implementation-plan-template.md', import.meta.url);
const template = readFileSync(templatePath, 'utf8');

const traceabilityRows = [
  { Campo: 'Issue', Valor: context.generatedFrom?.issueUrl ?? '' },
  { Campo: 'Commit', Valor: context.generatedFrom?.commit ?? '' },
  { Campo: 'Issue SHA-256', Valor: context.generatedFrom?.issueSha256 ?? '' },
  { Campo: 'Prompt SHA-256', Valor: hash(prompt) },
  { Campo: 'US', Valor: userStory.title ?? '' },
  { Campo: 'Area', Valor: userStory.area ?? '' },
  { Campo: 'Estado', Valor: userStory.status ?? '' },
];

const objective = [
  `Como **${userStory.story?.Como ?? ''}**, quiero **${userStory.story?.Quiero ?? ''}**, para **${userStory.story?.Para ?? ''}**.`,
  '',
  userStory.description ?? '',
].join('\n');

const plan = template
  .replace('{{traceability}}', [
    table(['Campo', 'Valor'], traceabilityRows),
    '',
    '### Contratos CU',
    table(['url', 'path', 'sha256'], context.generatedFrom?.contracts ?? []),
    '',
    '### Criterios de Aceptacion',
    table(['ID', 'Dado', 'Cuando', 'Entonces'], acceptanceCriteria),
    '',
    '### Casos de Prueba',
    table(['ID', 'CA relacionado', 'Tipo', 'Arrange', 'Act', 'Assert', 'Evidencia / Automatización'], testCases),
  ].join('\n'))
  .replace('{{objective}}', objective)
  .replace('{{scope}}', [
    'Implementar solamente el alcance descrito por la US, sus CA, CP y CU relacionados.',
    '',
    '### Tareas de la US',
    table(['ID', 'Descripción', 'Estado'], tasks),
  ].join('\n'))
  .replace('{{out_of_scope}}', renderList([
    'Cambios no trazados a CA o CP.',
    'Cambios de dominio no reflejados en CU.',
    'Modificaciones de estado en GitHub Projects.',
  ]))
  .replace('{{risks}}', renderList([
    'Registrar riesgos tecnicos o funcionales detectados al revisar el prompt.',
    'Registrar preguntas abiertas antes de pasar a implementacion.',
    'No continuar si falta trazabilidad CA -> CP.',
  ]))
  .replace('{{tdd_strategy}}', renderList([
    'Crear o ajustar pruebas antes de implementar comportamiento.',
    'Cubrir cada CP vinculado a CA.',
    'Priorizar unit tests, luego integracion y E2E solo para flujos criticos.',
  ]))
  .replace('{{development_plan}}', renderList([
    'Identificar modulos afectados desde el prompt y CU.',
    'Implementar el cambio minimo para satisfacer los CA.',
    'Mantener cambios acotados a la US.',
  ]))
  .replace('{{refactor_plan}}', renderList([
    'Refactorizar solo con pruebas verdes.',
    'Preservar comportamiento observable de CA y CP.',
    'Evitar refactors fuera del alcance de la US.',
  ]))
  .replace('{{qa_plan}}', renderList([
    'Ejecutar pruebas relacionadas a los CP.',
    'Validar regresion del flujo afectado.',
    'Registrar evidencia o enlaces de automatizacion cuando aplique.',
  ]))
  .replace('{{docs_plan}}', renderList([
    'Actualizar Docs-as-Code si cambia comportamiento, arquitectura, despliegue, CU o instrucciones operativas.',
    'Justificar `N/A` si no hay cambio documental.',
  ]))
  .replace('{{pr_checks}}', renderList([
    'Issue US vinculado.',
    'CU relacionado referenciado.',
    'CA y CP cubiertos.',
    'Pruebas ejecutadas.',
    'Documentacion actualizada o `N/A` justificado.',
    'Aprobacion humana requerida antes de avanzar.',
  ]));

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${plan.trim()}\n`, 'utf8');
console.log(`Generated ${out}`);
