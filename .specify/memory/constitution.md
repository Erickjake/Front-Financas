# Front Finanças Constitution

## Core Principles

### I. Next.js 16 First
All application work must follow the installed Next.js version, currently Next.js 16. Before changing framework-specific behavior, agents must consult the relevant local guide in `node_modules/next/dist/docs/`. App Router conventions, `src/proxy.ts`, Server and Client Component boundaries, metadata, route files, and async APIs must match those local docs.

### II. Domain-Oriented Frontend
Feature code belongs in `src/features/<domain>` using the existing pattern: `components`, `hooks`, `services`, `types.ts`, and `index.ts`. Route files in `src/app` should stay thin and compose domain modules. Shared primitives belong in `src/components` or `src/lib` only when they are genuinely cross-domain.

### III. Type Safety and API Contracts
TypeScript strictness is required. API calls must go through the shared client pattern in `src/lib/api-client.ts` unless a feature has a clear binary/file-download need. Frontend contracts must reflect the backend endpoints documented in `README.md`, using `/api` rewrites in the browser and the backend base URL on the server.

### IV. Test-First Changes
Bug fixes and behavior changes require a failing Vitest test before implementation. Regression tests should cover the user-visible behavior or integration boundary, not only implementation details. Existing tests must stay green before work is considered complete.

### V. Quality Gates Are Mandatory
No implementation is complete until these checks pass:

- `npm test`
- `.\node_modules\.bin\tsc.cmd --noEmit --pretty false`
- `npm run lint`
- `npm run build`

Biome is the source of formatting and lint truth. Generated, agent, and local tooling directories must stay excluded from product linting unless intentionally adopted as product code.

## Product Constraints

The product is a financial dashboard for Brazilian Portuguese users. UI text should be clear, consistent, and preferably written in PT-BR with proper accents. Authenticated application routes must be protected in `src/proxy.ts`; login and cadastro routes must redirect authenticated users to `/dashboard`.

The backend is expected at `http://127.0.0.1:3000` during local development and exposed to the frontend through the `/api/:path*` rewrite. Cookie names used for session detection must stay aligned with the backend before changing auth behavior.

## Development Workflow

Use Spec Kit for substantial changes:

1. Create or update a specification with `speckit.specify`.
2. Resolve ambiguities with `speckit.clarify` when requirements are unclear.
3. Generate an implementation plan with `speckit.plan`.
4. Break the work into tasks with `speckit.tasks`.
5. Implement with tests and run all quality gates.

Todos os documentos do Spec Kit, incluindo especificações, planos, tarefas, checklists e revisões, devem ser escritos em português do Brasil. Símbolos de código, comandos, caminhos de arquivos, rotas, endpoints, nomes de branch e IDs como `FR-001` e `SC-001` devem permanecer inalterados.

Small fixes may be implemented directly, but must still respect the principles above. Do not restructure domains, change public routes, or alter auth/session behavior without an explicit spec or user request.

## Governance

This constitution overrides ad hoc implementation preferences for this repository. Changes to these rules must be intentional, documented in this file, and followed by updating any affected specs or plans.

Pull requests or completed agent work must mention which quality gates were run. If a gate cannot run because of environment limits, the reason and residual risk must be stated clearly.

**Version**: 1.0.0 | **Ratified**: 2026-05-02 | **Last Amended**: 2026-05-02
