# Instruções do Projeto para o Gemini CLI

## Idioma

- **Idioma do projeto:** português do Brasil (`pt-BR`), definido em `.specify/init-options.json`.
- Documentação, specs, planos e respostas ao usuário devem ser em pt-BR (ver também `.specify/memory/constitution.md`).
- Código-fonte (nomes de variáveis, funções, tipos) permanece em inglês.

## Visão Geral do Projeto

- **Nome:** Front-Financas
- **Framework:** Next.js 16.2 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 (via PostCSS)
- **Linting/Formatação:** Biome (`biome.json`)
- **Versão do React:** React 19

## Gemini Ignore

-** Ignorar arquivos e pastas específicos para evitar que o Gemini CLI os modifique ou analise. O arquivo `.geminiignore` deve conter:

```geminiignore

node_modules/
dist/
```

## Convenções de Código

- **Componentes (Shadcn/UI):** Use componentes funcionais e React Hooks. Priorize o uso dos componentes existentes do shadcn/ui localizados em `src/components/ui`. Se um componente de UI necessário estiver faltando, instale-o via CLI do shadcn em vez de construí-lo do zero.
- **Ícones:** Use sempre `lucide-react` para os ícones.
- **Arquitetura (Feature-Sliced Design):** Siga o padrão estabelecido em `src/features` para a lógica de domínio. Uma pasta típica de feature deve conter:
  - `/components`: Componentes de UI específicos do domínio.
  - `/hooks`: Hooks React customizados para a feature.
  - `/services`: Chamadas de API e funções de regras de negócio.
  - `types.ts`: Tipos e interfaces TypeScript.
  - `index.ts`: Exportação da API pública da feature.
- **Componentes Globais:** Mantenha componentes de UI reutilizáveis em `src/components/ui`.
- **Estilização:** Use Tailwind CSS v4 para estilização. Funções utilitárias (como `cn`) devem ser colocadas ou usadas a partir de `src/lib/utils.ts`.
- **Roteamento:** Use o App Router do Next.js (`src/app`).

## Requisições de Dados & Gerenciamento de Estado

- **Cliente de API:** TODAS as requisições de rede DEVEM usar a função customizada `apiFetch` de `src/lib/api-client.ts`. NÃO use o `fetch` nativo diretamente e NÃO instale `axios`, `react-query` ou `swr` a menos que explicitamente solicitado. O wrapper `apiFetch` lida com o proxy entre cliente/servidor (`/api`) e o tratamento de erros (`ApiError`).
- **Gerenciamento de Estado:** Baseie-se no estado nativo do React (useState, useReducer, Context API) e nos parâmetros de busca da URL (search params). Não introduza bibliotecas de estado global (como Zustand ou Redux) a menos que solicitado.

## Comandos de Desenvolvimento

- **Porta:** O servidor de desenvolvimento roda na porta 3002 (`npm run dev`).
- **Linting:** `npm run lint` (usa Biome)
- **Formatação:** `npm run format` (usa Biome)
- **Shadcn/UI:** Para adicionar um novo componente, use `npx shadcn@latest add <nome-do-componente>`.

## Diretrizes do Agente

- Sempre priorize as convenções descritas neste arquivo.
- Garanta que qualquer código gerado adira ao modo estrito do TypeScript e às regras do Biome do projeto.
- NÃO use comandos do ESLint ou Prettier, pois este projeto utiliza o Biome.
- NUNCA modifique ou presuma a existência de um arquivo `tailwind.config.ts`, pois o projeto usa Tailwind v4 via CSS.
- Ao criar novas features, integre-as no diretório `src/features` usando a estrutura de pastas especificada.

## EndPoints de API

## Endpoints principais

Auth:

- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

Usuarios:

- POST /users
- GET /users
- GET /users/:id
- PATCH /users/:id
- DELETE /users/:id

Transacoes (protegidos):

- GET /transactions?page=&limit=
- POST /transactions
- GET /transactions/:id
- PUT /transactions/:id
- DELETE /transactions/:id

Categorias:

- POST /categories
- GET /categories
- GET /categories/:id
- PATCH /categories/:id
- DELETE /categories/:id

Orcamentos (protegidos):

- POST /budgets
- GET /budgets
- GET /budgets/status?month=&year=
- GET /budgets/:id
- PATCH /budgets/:id
- DELETE /budgets/:id

Relatorios (protegidos):

- GET /reports/summary
- GET /reports/by-category
- GET /reports/monthly

Exportacao (protegidos):

- GET /export/csv
- GET /export/pdf

Backup (protegidos):

- GET /backup
- POST /backup/restore

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
