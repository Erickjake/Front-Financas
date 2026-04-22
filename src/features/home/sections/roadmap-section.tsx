import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RoadmapSectionProps = {
  steps: string[];
};

export function RoadmapSection({ steps }: RoadmapSectionProps) {
  return (
    <aside className="surface-card reveal-up rounded-3xl border border-slate-200 bg-[#fff5e8] p-6 shadow-lg sm:p-8">
      <p className="font-heading text-xs uppercase tracking-[0.2em] text-amber-700">
        Como funciona
      </p>
      <h2 className="font-heading mt-3 text-2xl leading-tight font-semibold text-slate-900">
        Tres passos para sair da duvida e entrar no controle.
      </h2>

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <Badge className="mt-0.5 size-6 rounded-full bg-amber-300 p-0 text-amber-950">
              {index + 1}
            </Badge>
            <p className="text-sm text-slate-700">{step}</p>
          </li>
        ))}
      </ol>

      <Card className="mt-8 border-emerald-200 bg-emerald-50 py-0">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-emerald-900">
            Pronto para virar a chave da sua vida financeira?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-emerald-800">
            Entre agora e receba um plano personalizado com foco no seu perfil.
          </CardDescription>
        </CardContent>
      </Card>
    </aside>
  );
}
