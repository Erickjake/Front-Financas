# Roadmap de Implementacoes Futuras

Este roadmap organiza as proximas entregas do produto em fases incrementais, com foco em valor de negocio, qualidade tecnica e escalabilidade.

## Visao de produto

- Entregar um painel financeiro confiavel para controle de receitas, despesas e metas.
- Evoluir de dados mockados para operacao com API real e persistencia segura.
- Garantir uma experiencia rapida, clara e responsiva para desktop e mobile.

## Fase 1 - Base funcional (0 a 2 semanas)

Objetivo: transformar os dominios atuais em fluxos navegaveis e usaveis no dia a dia.

Entregas:

- Criar paginas reais para `dashboard`, `transactions` e `user` no App Router.
- Integrar componentes de dominio nas respectivas rotas.
- Definir estados de carregamento, vazio e erro em todas as listas e cards.
- Padronizar navegacao inicial com header e menu lateral simples.

Criterios de pronto:

- Rotas principais renderizam sem mocks quebrados.
- Fluxos basicos funcionam sem erro visual em mobile e desktop.
- Projeto passa no check de formatacao/lint dos arquivos alterados.

## Fase 2 - Dados e autenticacao (2 a 4 semanas)

Objetivo: conectar o app com backend e autenticar usuarios.

Entregas:

- Substituir services mockados por chamadas HTTP tipadas.
- Implementar login e sessao persistida no dominio `auth`.
- Criar camada de cliente HTTP central com tratamento de erros.
- Configurar variaveis de ambiente para ambientes local e producao.

Criterios de pronto:

- Usuario autenticado acessa dashboard com dados reais.
- Falhas de API exibem feedback claro ao usuario.
- Contracts de entrada e saida validados por tipos.

## Fase 3 - Operacao financeira (4 a 6 semanas)

Objetivo: habilitar a gestao financeira ponta a ponta.

Entregas:

- CRUD de transacoes com categorias, filtros e busca.
- Resumo mensal com totais por tipo e categoria.
- Metas financeiras com progresso e status por periodo.
- Exportacao simples de transacoes para CSV.

Criterios de pronto:

- Usuario consegue cadastrar, editar e excluir transacoes.
- Dashboard atualiza indicadores apos mudancas.
- Filtros e ordenacao funcionam com bom desempenho.

## Fase 4 - Qualidade, seguranca e observabilidade (6 a 8 semanas)

Objetivo: preparar o sistema para operacao estavel em producao.

Entregas:

- Testes unitarios para hooks e services dos dominios.
- Testes de integracao para fluxos criticos de autenticacao e transacoes.
- Politicas de seguranca de sessao, headers e validacao de input.
- Logs estruturados e monitoramento de erros de frontend.

Criterios de pronto:

- Cobertura minima definida para modulos criticos.
- Principais fluxos com testes automatizados em CI.
- Erros relevantes monitorados com contexto suficiente para depuracao.

## Fase 5 - Escala e experiencia avancada (8+ semanas)

Objetivo: aumentar retenção, performance e capacidade analitica.

Entregas:

- Dashboards comparativos por periodo com graficos avancados.
- Regras de alertas inteligentes para excesso de gasto.
- Onboarding guiado para novos usuarios.
- Otimizacoes de performance com cache e streaming de dados.

Criterios de pronto:

- Tempo de carregamento reduzido em telas principais.
- Aumento de uso recorrente das funcoes de controle financeiro.
- Base pronta para novas features sem acoplamento alto.

## Backlog tecnico transversal

- Criar padrao de testes por dominio em `src/features`.
- Adotar convencao de nomes para arquivos de hooks e services.
- Revisar acessibilidade dos componentes com foco em teclado e contraste.
- Definir estrategia de versionamento de API e migracao de contratos.
- Automatizar release notes e checklist de deploy.

## Status atual (atualizado)

| Fase | Status |
|------|--------|
| Fase 1 — Base funcional | Concluida |
| Fase 2 — Dados e autenticacao | Em andamento (API real, proxy auth, `.env.example`) |
| Fase 3 — Operacao financeira | Parcial (transacoes, dashboard e metas prontos; relatorios e orcamentos em evolucao) |
| Fase 4 — Qualidade | Inicio (CI, testes unitarios em expansao) |
| Fase 5 — Escala | Nao iniciada |

## Proxima entrega recomendada

Priorizar a conclusao da Fase 3 e o avanco da Fase 4:

- Polir telas de relatorios, orcamentos e backup no padrao do dashboard.
- Expandir cobertura de testes (auth, dashboard, services criticos).
- Adotar cache de dados (ex.: TanStack Query) nas telas com maior refetch.
