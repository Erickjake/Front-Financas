import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { HomeKpi } from "@/features/home/types";

type KpiSectionProps = {
  items: HomeKpi[];
};

export function KpiSection({ items }: KpiSectionProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {items.map((item, index) => (
        <Card
          key={item.label}
          className="surface-card reveal-up border-slate-200/70 bg-[#fffaf3]/95 py-0 shadow-lg"
          style={{ animationDelay: `${180 + index * 120}ms` }}
        >
          <CardHeader className="pb-2">
            <CardDescription className="text-sm text-slate-600">
              {item.label}
            </CardDescription>
            <CardTitle className="font-heading text-3xl font-semibold text-emerald-900">
              {item.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{item.detail}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
