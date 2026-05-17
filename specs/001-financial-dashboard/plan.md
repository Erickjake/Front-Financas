# Plano de Implementação: Dashboard Financeiro

**Branch**: `001-financial-dashboard` | **Data**: 2026-05-01 | **Spec**: [spec.md](../spec.md)
**Entrada**: Especificação da feature em `/specs/001-financial-dashboard/spec.md`

## Resumo

Implementar um dashboard financeiro completo que forneça uma visão consolidada das finanças do usuário. O projeto já possui a estrutura base de `features/dashboard` com `SummaryCards` e `dashboard-service`. Este plano foca em expandir essa funcionalidade com gráficos de evolução mensal, análise por categoria, lista de transações recentes e controle de período (timeframe).

## Contexto Técnico

**Linguagem/Versão**: TypeScript / React 19 / Next.js 15+ (App Router)  
**Dependências Principais**: `lucide-react`, `recharts` (para gráficos), shadcn/ui  
**Armazenamento**: Consumo via API REST (protegido por auth)  
**Testes**: Vitest (unitário/componente)  
**Plataforma-alvo**: Web (desktop/mobile responsivo)  
**Tipo de Projeto**: FinTech / dashboard de finanças pessoais  
**Metas de Performance**: < 1,5s LCP em 4G, animações fluidas nos gráficos  
**Restrições**: Uso obrigatório de `apiFetch`, estilização com Tailwind v4  
**Escala/Escopo**: Dashboard principal do usuário logado

## Estrutura do Projeto

### Documentação (esta feature)

```text
specs/001-financial-dashboard/
├── plan.md              # Este arquivo
├── research.md          # Notas de pesquisa sobre APIs e componentes
├── data-model.md        # Definição dos tipos estendidos
└── contracts/           # Contratos de API simulados/verificados
```

### Código-fonte

```text
src/
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── summary-cards.tsx       # Existente
│   │   │   ├── category-chart.tsx      # NOVO
│   │   │   ├── evolution-chart.tsx     # NOVO
│   │   │   ├── recent-transactions.tsx # NOVO
│   │   │   └── timeframe-selector.tsx  # NOVO
│   │   ├── hooks/
│   │   │   ├── use-dashboard-summary.ts # Existente (será estendido)
│   │   │   └── use-dashboard-charts.ts  # NOVO
│   │   ├── services/
│   │   │   └── dashboard-service.ts     # Existente (será estendido)
│   │   └── types.ts                     # Existente (será estendido)
├── app/
│   └── dashboard/
│       └── page.tsx                     # Atualizar para incluir novos componentes
```

**Decisão de Estrutura**: Seguir o padrão Feature-Sliced Design (FSD) já estabelecido em `src/features/dashboard`. Reutilizar o `api-client.ts` para todas as chamadas.

## Detalhes de Implementação

### Estratégia de Busca de Dados

- Estender `dashboard-service.ts` para suportar filtros de mês/ano.
- Criar `useDashboardCharts` para lidar com o estado dos gráficos e sincronização com o período selecionado.
- Utilizar `recent-transactions.tsx` consumindo o `transactions-service.ts` existente com limite de 5 itens.

### UI/UX

- **Gráficos**: Utilizar `recharts` devido à sua flexibilidade e integração com React.
- **Resumo**: Manter os `SummaryCards` como topo da hierarquia visual.
- **Responsividade**: Layout em grid que se adapta de 1 a 2 colunas dependendo da largura da tela.

### Estratégia de Verificação

- Testes unitários para as funções de agregação de dados no service.
- Testes de renderização (Vitest + Testing Library) para os componentes de gráfico com mock de dados.
- Verificação manual de estados de erro e loading.
