import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { renderPrompt } from './prompt.ts';

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}
const contextFile = argument('--context');
if (!contextFile) throw new Error('Use --context <context.json>.');
const role = argument('--role') ?? 'land4-implementer';
const out = argument('--out') ?? '.tmp/land4-prompts/prompt.md';
const context = JSON.parse(readFileSync(contextFile, 'utf8'));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, renderPrompt(context, role), 'utf8');
console.log(`Generated ${out}`);
