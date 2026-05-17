# Pesquisa: APIs do Dashboard Financeiro

## Endpoints Verificados

- `GET /reports/summary`: Retorna `income`, `expense`, `balance`.
- `GET /reports/by-category?month=&year=`: Retorna lista de categorias com totais e porcentagens.
- `GET /reports/monthly?month=&year=`: Retorna evolução mensal.
- `GET /transactions?limit=5`: Retorna as últimas 5 transações (suporta paginação e limite).

## Dependências

- **Recharts**: Necessário para os componentes `category-chart.tsx` e `evolution-chart.tsx`.
- **Lucide-React**: Já disponível para ícones.
- **Shadcn/UI**: Componentes `Card` já disponíveis. Pode ser necessário `Select` ou `Tabs` para o `timeframe-selector.tsx`.

## Análise da Lógica Existente

- O `dashboard-service.ts` já possui as funções básicas, mas elas não recebem parâmetros de filtro em todas as chamadas.
- O `useDashboardSummary.ts` é um hook simples que não lida com mudanças de mês/ano.
- O componente `SummaryCards` está funcional e bem estilizado com Tailwind v4.
