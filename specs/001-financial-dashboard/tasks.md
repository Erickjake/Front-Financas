# Tarefas: Dashboard Financeiro

**Entrada**: Documentos de design em `/specs/001-financial-dashboard/`
**Pré-requisitos**: plan.md, spec.md, research.md, data-model.md

**Organização**: As tarefas são agrupadas por história de usuário para permitir implementação e teste independentes de cada história.

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: A qual história de usuário esta tarefa pertence (ex.: US1, US2, US3)

---

## Fase 1: Setup e Fundação

**Objetivo**: Inicialização do projeto e estrutura básica

- [x] T001 Instalar a dependência `recharts` (`npm install recharts`)
- [x] T002 [P] Atualizar `src/features/dashboard/types.ts` com `DashboardFilters`, `CategoryReport` e `MonthlyReport`
- [x] T003 [P] Atualizar `src/features/dashboard/services/dashboard-service.ts` para suportar parâmetros `month` e `year` em todas as funções
- [x] T004 Criar hook fundacional `src/features/dashboard/hooks/use-dashboard-charts.ts` para gerenciar estado de período

**Checkpoint**: Fundação pronta - implementação das histórias de usuário pode começar

---

## Fase 2: História de Usuário 1 - Visão Geral Financeira (Prioridade: P1) 🎯 MVP

**Objetivo**: Resumo de alto nível da situação financeira (saldo, receitas, despesas)

**Teste Independente**: Verificar se os cards de resumo exibem dados corretos para mês/ano selecionados

### Implementação da História de Usuário 1

- [x] T005 [P] [US1] Atualizar `src/features/dashboard/components/summary-cards.tsx` para aceitar e usar filtros `month` e `year`
- [x] T006 [US1] Integrar `SummaryCards` com o novo estado de período em `src/app/dashboard/page.tsx`

---

## Fase 3: História de Usuário 2 - Atividade Recente (Prioridade: P1)

**Objetivo**: Lista das últimas transações no dashboard

**Teste Independente**: Verificar se o dashboard mostra as 5 transações mais recentes em ordem correta

### Implementação da História de Usuário 2

- [x] T007 [P] [US2] Criar `src/features/dashboard/components/recent-transactions.tsx` usando `transactions-service`
- [x] T008 [US2] Adicionar componente `RecentTransactions` em `src/app/dashboard/page.tsx`

---

## Fase 4: História de Usuário 3 - Análise por Categoria (Prioridade: P2)

**Objetivo**: Despesas agrupadas por categoria com visualização

**Teste Independente**: Verificar se o gráfico donut representa corretamente as proporções de gastos

### Implementação da História de Usuário 3

- [x] T009 [P] [US3] Criar `src/features/dashboard/components/category-chart.tsx` usando Recharts
- [x] T010 [US3] Adicionar componente `CategoryChart` em `src/app/dashboard/page.tsx`

---

## Fase 5: História de Usuário 4 - Evolução Mensal (Prioridade: P2)

**Objetivo**: Gráfico mostrando evolução de receitas e despesas ao longo do tempo

**Teste Independente**: Verificar se o gráfico de barras mostra corretamente as tendências mensais

### Implementação da História de Usuário 4

- [x] T011 [P] [US4] Criar `src/features/dashboard/components/evolution-chart.tsx` usando Recharts
- [x] T012 [US4] Adicionar componente `EvolutionChart` em `src/app/dashboard/page.tsx`

---

## Fase 6: Controles e Polimento

**Objetivo**: Seleção de período e refinamentos finais de UI

- [x] T013 [P] [US5] Criar `src/features/dashboard/components/timeframe-selector.tsx` usando Select/Tabs de shadcn/ui
- [x] T014 [US5] Implementar lógica de troca de período em `src/app/dashboard/page.tsx`
- [ ] T015 [P] Adicionar testes unitários para funções atualizadas de `dashboard-service.ts` em `src/features/dashboard/services/dashboard-service.test.ts`
- [x] T016 Polimento final de UI, ajustes responsivos e checagem Biome lint/format

---

## Dependências e Ordem de Execução

1. **Setup e Fundação (Fase 1)**: Deve ser concluída primeiro, pois fornece tipos e lógica de serviço para todas as histórias.
2. **Histórias de Prioridade 1 (US1 e US2)**: Devem ser implementadas em seguida para entregar o valor central do dashboard.
3. **Histórias de Prioridade 2 (US3 e US4)**: Podem ser implementadas em paralelo ou sequencialmente quando o núcleo estiver pronto.
4. **Controles (US5)**: Essenciais para a experiência final de alternar meses.

---

## Estratégia de Implementação

### MVP Primeiro

- Concluir Fundação (Fase 1)
- Concluir US1 e US2 (Fases 2 e 3)
- Resultado: dashboard funcional com resumo e movimentações recentes.

### Feature Completa

- Adicionar visualizações (Fases 4 e 5)
- Adicionar seleção de período (Fase 6)
- Resultado: cockpit financeiro completo com análise e tendências históricas.
