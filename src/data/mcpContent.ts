// Single source of truth for /mcp and its markdown mirror (/mcp.md).
// Keeping copy here means the HTML page and the markdown export can never drift apart.

export const meta = {
	title: 'MCP Insights — Building Production MCP Servers',
	description: "A practitioner's view on shipping production Model Context Protocol servers: tool-surface design, least privilege, identity, human-in-the-loop control, and lifecycle governance — backed by a real production case study.",
	datePublished: '2026-09-28',
	specRevision: '2026-07-28',
	specUrl: 'https://modelcontextprotocol.io/specification/2026-07-28',
};

export const hero = {
	eyebrow: 'MCP / Agentic Platforms',
	headline: 'MCP is a product, not a sidecar.',
	subhead: "I design and ship MCP servers that let AI agents act on real platforms safely.",
};

export interface CaseFact {
	title: string;
	detail: string;
}

export const caseStudy = {
	title: "What I've built",
	intro: "A non-custodial crypto payment platform. I designed and shipped its MCP surface end to end — these are the verified facts, not a pitch. (Name withheld here; happy to share it in a conversation.)",
	facts: [
		{
			title: 'Production authenticated MCP server',
			detail: '33 agent-callable tools, covering the full payment lifecycle: payment requests and orders, conversion quotes, balances, deposit addresses, plus webhooks, payee identity, and reseller sub-account and credit management. Built on the same platform as its REST/OpenAPI API.',
		},
		{
			title: 'Access split by trust level',
			detail: 'Merchant tools, reseller tools, and a separate public payer server (5 tools) so an agent can complete a payment without ever holding merchant credentials. Separate dev and production environments.',
		},
		{
			title: 'WebMCP tools on the public site',
			detail: "Verified via WebMCP's public tool directory: a read-only fee-schedule tool, and a contact tool that only drafts — a human reviews and sends.",
		},
		{
			title: 'Agent discovery',
			detail: 'An llms.txt with agent-specific variants, plus MCP manifests and server cards on /.well-known paths, audited with Google Lighthouse.',
		},
	] as CaseFact[],
};

export type PrincipleStatus = 'applied' | 'wouldDo';

export interface Principle {
	title: string;
	opinion: string;
	note: string;
	status: PrincipleStatus;
}

export const principles: Principle[] = [
	{
		title: 'Design the tool surface like an API product',
		opinion: 'Tool names, scopes, and descriptions determine whether an agent picks the right tool and calls it correctly. A coverage gap or a vague description is a product bug, not a documentation nit.',
		note: "Its 33 tools were built on the same platform as its REST/OpenAPI API — same naming discipline, same source of truth, so the tool surface didn't drift from the API it's standing on.",
		status: 'applied',
	},
	{
		title: 'Least privilege by default',
		opinion: 'Read-only defaults, scoped permissions, and access levels matched to the caller — not one flat permission set — limit the blast radius of a bad or manipulated tool call before it happens.',
		note: 'The platform splits by trust level: merchant tools, reseller tools, and a separate 5-tool public payer server, so an agent completing a payment never needs to hold merchant credentials.',
		status: 'applied',
	},
	{
		title: 'Identity is the foundation',
		opinion: "MCP's authorization model is OAuth-based (the server is an OAuth resource server, the client an OAuth client). The bigger decision is architectural: reuse the identity and business logic your APIs already trust, instead of standing up a parallel stack for agents.",
		note: "Its MCP server is built on the same platform as its REST API — same identity, same business logic, not a bolted-on second system.",
		status: 'applied',
	},
	{
		title: 'Humans stay in control of consequential actions',
		opinion: 'Separate "answer" tools from "transact" tools. An agent should be able to draft a consequential action, but a person approves it — with a traceable, reversible trail behind that approval.',
		note: "Its WebMCP contact tool only drafts a message; the human reviews and sends it. Nothing consequential fires without that step.",
		status: 'applied',
	},
	{
		title: 'Agent-specific threats are real',
		opinion: "Prompt injection, tool poisoning, and over-permissioned tools aren't hypothetical — a tool description and anything a tool returns are both attack surface an attacker can shape, not just documentation for the model.",
		note: "Threat-model the tool surface the same way you'd threat-model an API — assume a hostile prompt reaches every tool description and every returned payload, and design scopes so a single compromised call can't cascade.",
		status: 'wouldDo',
	},
	{
		title: 'Govern the server lifecycle',
		opinion: "An MCP server needs the same lifecycle discipline as any other production API: a versioning and breaking-change policy, a real dev-to-prod path, and a clear owner between the platform team and the domain team that owns the underlying data.",
		note: 'It runs separate dev and production MCP environments — the server graduates the same way the rest of the platform does, not as a side project.',
		status: 'applied',
	},
	{
		title: 'Make it discoverable',
		opinion: "An agent can't use a tool it can't find. llms.txt, /.well-known manifests and server cards, and OpenAPI as the single source for docs, SDKs, and MCP tools all exist to answer the same question: how does an agent find out what's here without a human pointing it there first.",
		note: 'It publishes an llms.txt with agent-specific variants plus MCP manifests and server cards on /.well-known paths — audited with Lighthouse like any other production surface.',
		status: 'applied',
	},
	{
		title: 'Measure it',
		opinion: "Track tool invocation success rate, task completion, latency, cost per task, time to first successful call, and coverage across products — and run evals that check whether an agent chose the right tool, as a regression suite, not a vibe check.",
		note: "Wire tool-selection accuracy and task completion into the same dashboards and alerting the rest of the platform already has, rather than treating agent traffic as a separate, unmeasured channel.",
		status: 'wouldDo',
	},
];

export interface ChecklistItem {
	id: string;
	label: string;
}

export const checklist: ChecklistItem[] = [
	{ id: 'write-alt', label: 'Every write tool has a read-only alternative, or requires explicit confirmation before it executes.' },
	{ id: 'tool-desc', label: 'Tool descriptions state exactly what the tool does, what scope it needs, and any side effects — not just a name.' },
	{ id: 'trust-split', label: 'Access is split by trust level (public / single account / reseller or portfolio), not one flat permission set.' },
	{ id: 'shared-identity', label: 'The MCP server reuses your existing identity and authorization system, not a parallel one-off stack.' },
	{ id: 'human-approval', label: 'Consequential actions (payments, sends, deletes) are drafted by the agent and confirmed by a human, not auto-executed.' },
	{ id: 'audit-trail', label: 'Every tool call and its outcome is logged and traceable back to a caller and a human decision.' },
	{ id: 'untrusted-content', label: 'Tool descriptions and anything returned to the model are treated as untrusted input, not just documentation.' },
	{ id: 'versioning', label: 'The MCP server has its own versioning and breaking-change policy, separate from your public API.' },
	{ id: 'dev-prod', label: 'There is a real dev-to-production path for the server, not one shared production instance everyone edits live.' },
	{ id: 'ownership', label: "Someone specific owns the MCP server's quality bar — it isn't everyone's job and no one's job." },
	{ id: 'discoverable', label: 'The server is discoverable by agents (llms.txt, /.well-known manifests, or equivalent) without a human pointing them to it.' },
	{ id: 'measured', label: 'You track tool-selection accuracy and task completion, not just uptime.' },
];
