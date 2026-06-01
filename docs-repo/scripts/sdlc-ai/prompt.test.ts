import assert from 'node:assert/strict';
import test from 'node:test';
import { buildContext, FixtureBacklogAdapter } from './lib.ts';
import { renderPrompt } from './prompt.ts';

test('renders implementation context and traceability', () => {
  const issue = new FixtureBacklogAdapter('docs-repo/scripts/sdlc-ai/fixtures/issue-valid.json').load();
  const context = buildContext(issue);
  const prompt = renderPrompt(context, 'land4-implementer');
  for (const expected of [
    '## Traceability',
    '## Tasks',
    'TASK-001',
    '## Test Cases',
    'Evidencia / Automatización',
    '## Domain Contracts',
    '#### Lenguaje ubicuo',
    '#### Actores',
    '#### Precondiciones',
    '#### Flujo principal',
    '#### Flujos alternos',
    '#### Postcondiciones',
    '#### Reglas de negocio',
    '## Required Completion Report',
  ]) {
    assert.match(prompt, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
