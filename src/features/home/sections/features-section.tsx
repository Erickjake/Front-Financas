import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { HomeFeature } from "@/features/home/types";

type FeaturesSectionProps = {
  items: HomeFeature[];
};

export function FeaturesSection({ items }: FeaturesSectionProps) {
  return (
    <section className="surface-card reveal-up rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg sm:p-8">
      <p className="font-heading text-xs uppercase tracking-[0.2em] text-emerald-700">
        Recursos principais
      </p>
      <h2 className="font-heading mt-3 text-3xl leading-tight font-semibold text-slate-900">
        Plataforma feita para transformar rotina financeira em estrategia.
      </h2>

      <Separator className="my-6 bg-slate-200" />

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className="border-slate-200 bg-slate-50/75 py-0"
              style={{ animationDelay: `${260 + index * 90}ms` }}
            >
              <CardHeader>
                <div className="mb-2 inline-flex w-fit rounded-xl bg-emerald-100 p-2 text-emerald-700">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="font-heading text-lg font-semibold text-slate-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-slate-600">
                  {feature.text}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
