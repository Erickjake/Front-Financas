# Front Finanças

Painel de controle financeiro pessoal em Next.js 16, conectado a uma API REST NestJS.

## Pré-requisitos

- Node.js 20+
- API Nest rodando em `http://localhost:3000`

## Configuração

```bash
cd front-financas
cp .env.example .env.local
npm install
```

Variáveis disponíveis (ver [`.env.example`](.env.example)):

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL da API no SSR (padrão: `http://localhost:3000`) |
| `API_PROXY_URL` | Destino do rewrite `/api/*` no dev (padrão: `http://127.0.0.1:3000`) |
| `AUTH_COOKIE_NAME` | Cookie de sessão customizado (opcional) |

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3002](http://localhost:3002). O front usa a porta **3002**; a API deve estar na **3000**.

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 3002) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção (porta 3002) |
| `npm run lint` | Biome check |
| `npm run format` | Biome format |
| `npm run test` | Vitest |

## Arquitetura de features

O projeto segue arquitetura orientada a domínio em `src/features`.

Cada domínio possui:

- `components/` — UI do domínio
- `hooks/` — estado e composição no cliente
- `services/` — chamadas HTTP via `api-client`
- `types.ts` — contratos TypeScript
- `index.ts` — barrel exports

Domínios:

- `home` — landing pública
- `auth` — login, registro e sessão
- `dashboard` — resumo e gráficos
- `transactions` — CRUD de receitas/despesas
- `categories` — categorias de transação
- `goals` — metas financeiras (API `/budgets`)
- `export` — exportação CSV/PDF
- `backup` — snapshot e restore
- `user` — perfil do usuário

Rotas autenticadas compartilham o layout `AppShell` via route group `(app)`.

## Roadmap

O plano de evolução está em [`ROADMAP.md`](ROADMAP.md).

## Endpoints da API

Auth:

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

Usuários:

- `POST /users`
- `GET /users`
- `GET /users/me`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

Transações (protegidos):

- `GET /transactions?page=&limit=`
- `POST /transactions`
- `GET /transactions/:id`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`

Categorias:

- `POST /categories`
- `GET /categories`
- `GET /categories/:id`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

Orçamentos / metas (protegidos):

- `POST /budgets`
- `GET /budgets`
- `GET /budgets/status?month=&year=`
- `GET /budgets/:id`
- `PATCH /budgets/:id`
- `DELETE /budgets/:id`

Relatórios (protegidos):

- `GET /reports/summary`
- `GET /reports/by-category`
- `GET /reports/monthly`

Exportação (protegidos):

- `GET /export/csv`
- `GET /export/pdf`

Backup (protegidos):

- `GET /backup`
- `POST /backup/restore`
