import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { buildContext, FixtureBacklogAdapter, GitHubBacklogAdapter } from './lib.ts';

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

const out = argument('--out') ?? '.tmp/land4-prompts/context.json';
const fixture = argument('--fixture');
const issue = argument('--issue');
const adapter = fixture ? new FixtureBacklogAdapter(fixture) : issue ? new GitHubBacklogAdapter(issue, argument('--repo')) : null;
if (!adapter) throw new Error('Use --fixture <issue.json> or --issue <url|number> [--repo <owner/repo>].');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(buildContext(adapter.load()), null, 2)}\n`, 'utf8');
console.log(`Generated ${out}`);
