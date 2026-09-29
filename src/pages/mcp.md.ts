import type { APIRoute } from 'astro';
import { meta, hero, caseStudy, principles, checklist } from '../data/mcpContent';

export const prerender = true;

function render(): string {
	const lines: string[] = [];

	lines.push(`# ${hero.headline}`);
	lines.push('');
	lines.push(hero.subhead);
	lines.push('');
	lines.push('---');
	lines.push('');

	lines.push(`## ${caseStudy.title}`);
	lines.push('');
	lines.push(caseStudy.intro);
	lines.push('');
	for (const fact of caseStudy.facts) {
		lines.push(`- **${fact.title}** — ${fact.detail}`);
	}
	lines.push('');
	lines.push('---');
	lines.push('');

	lines.push('## Principles');
	lines.push('');
	for (const principle of principles) {
		lines.push(`### ${principle.title}`);
		lines.push('');
		lines.push(principle.opinion);
		lines.push('');
		lines.push(`**${principle.status === 'applied' ? 'How I applied it' : "What I'd do"}:** ${principle.note}`);
		lines.push('');
	}
	lines.push('---');
	lines.push('');

	lines.push('## Is your MCP server production-ready?');
	lines.push('');
	for (const item of checklist) {
		lines.push(`- [ ] ${item.label}`);
	}
	lines.push('');
	lines.push('---');
	lines.push('');

	lines.push('## Talk MCP strategy');
	lines.push('');
	lines.push('Building an MCP server, or deciding whether to? I help teams design the tool surface, the access model, and the governance around it before it ships — not after.');
	lines.push('');
	lines.push('Contact: https://technical.pm/mcp (see page for consultation and contact forms)');
	lines.push('');
	lines.push(`_Technical references on this page verified against the MCP spec, revision [${meta.specRevision}](${meta.specUrl})._`);

	return lines.join('\n') + '\n';
}

export const GET: APIRoute = () => {
	return new Response(render(), {
		status: 200,
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};
