import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardSummary } from "@/features/dashboard/hooks/use-dashboard-summary";

export function SummaryCards() {
  const { summary, isLoading } = useDashboardSummary();

  if (isLoading || !summary) {
    return (
      <p className="text-sm text-muted-foreground">Carregando resumo...</p>
    );
  }

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {summary.kpis.map((kpi) => (
        <Card key={kpi.label} className="py-0">
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <CardTitle>{kpi.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Tendencia: {kpi.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
