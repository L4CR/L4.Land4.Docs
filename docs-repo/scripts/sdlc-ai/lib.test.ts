import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { buildContext } from './lib.ts';

const fixtures = new URL('./fixtures/', import.meta.url);
function workspace(bodyTransform = (body: string) => body) {
  const root = mkdtempSync(join(tmpdir(), 'land4-sdlc-'));
  execFileSync('git', ['init'], { cwd: root });
  execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: root });
  execFileSync('git', ['config', 'user.name', 'Test'], { cwd: root });
  const contractPath = join(root, 'docs-repo/req/registro-comercio/CONTRACT.md');
  mkdirSync(dirname(contractPath), { recursive: true });
  writeFileSync(contractPath, readFileSync(new URL('registro-comercio/CONTRACT.md', fixtures), 'utf8'));
  writeFileSync(join(root, 'README.md'), 'fixture');
  execFileSync('git', ['add', '.'], { cwd: root });
  execFileSync('git', ['commit', '-m', 'fixture'], { cwd: root });
  const issue = JSON.parse(readFileSync(new URL('issue-valid.json', fixtures), 'utf8'));
  issue.body = bodyTransform(issue.body);
  return { root, issue };
}

test('builds normalized context from Issue and CONTRACT.md', () => {
  const { root, issue } = workspace();
  const context = buildContext(issue, root);
  assert.equal(context.userStory.status, 'Ready');
  assert.equal(context.userStory.acceptanceCriteria[0].ID, 'CA-001');
  assert.equal(context.contracts[0].mainFlow[0].Paso, '1');
});

test('builds context with multiple related CU contracts', () => {
  const { root, issue } = workspace((body) => body.replace(
    'https://github.com/L4CR/demo/blob/main/docs-repo/req/registro-comercio/CONTRACT.md',
    'https://github.com/L4CR/demo/blob/main/docs-repo/req/registro-comercio/CONTRACT.md\nhttps://github.com/L4CR/demo/blob/main/docs-repo/req/validacion-correo/CONTRACT.md',
  ));
  const source = join(root, 'docs-repo/req/registro-comercio/CONTRACT.md');
  const target = join(root, 'docs-repo/req/validacion-correo/CONTRACT.md');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, readFileSync(source, 'utf8'));
  const context = buildContext(issue, root);
  assert.equal(context.contracts.length, 2);
});

test('rejects CA without mapped CP', () => {
  const { root, issue } = workspace((body) => body.replace('| CP-001 | CA-001 |', '| CP-001 | CA-999 |'));
  assert.throws(() => buildContext(issue, root), /CA without mapped CP: CA-001/);
});

test('rejects invalid project status', () => {
  const { root, issue } = workspace();
  issue.projectItems = [{ status: { name: 'Todo' } }];
  assert.throws(() => buildContext(issue, root), /Project status is missing or invalid/);
});

test('rejects missing Issue section', () => {
  const { root, issue } = workspace((body) => body.replace('### Tareas', '### Trabajo'));
  assert.throws(() => buildContext(issue, root), /Missing required Issue section: Tareas/);
});

test('rejects incomplete Issue table', () => {
  const { root, issue } = workspace((body) => body.replace('| ID | Dado | Cuando | Entonces |', '| ID | Dado | Cuando |'));
  assert.throws(() => buildContext(issue, root), /Missing required table column: Entonces/);
});

test('rejects invalid CU URL', () => {
  const { root, issue } = workspace((body) => body.replace('/blob/main/docs-repo/req/registro-comercio/CONTRACT.md', '/blob/dev/docs-repo/req/registro-comercio/CONTRACT.md'));
  assert.throws(() => buildContext(issue, root), /CU URL must point/);
});

test('rejects missing CU contract', () => {
  const { root, issue } = workspace((body) => body.replace('/registro-comercio/', '/otro-caso/'));
  assert.throws(() => buildContext(issue, root), /CU contract not found/);
});

test('rejects duplicate CA IDs', () => {
  const { root, issue } = workspace((body) => body.replace('\n\n### Casos de prueba', '\n| CA-001 | duplicado | actúa | falla |\n\n### Casos de prueba'));
  assert.throws(() => buildContext(issue, root), /Duplicate ID: CA-001/);
});
