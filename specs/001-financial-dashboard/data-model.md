# Modelo de Dados: Extensões do Dashboard

## Tipos (a adicionar/atualizar em `features/dashboard/types.ts`)

```typescript
export type DashboardFilters = {
  month: number;
  year: number;
};

// Tipos existentes são suficientes, mas podem precisar de consolidação
```

## Estado do Hook

### `useDashboardCharts`

- `categoryData`: `CategoryReport[]`
- `evolutionData`: `MonthlyReport[]`
- `isLoading`: `boolean`
- `error`: `string | null`
- `filters`: `DashboardFilters`
- `setFilters`: `(filters: DashboardFilters) => void`
