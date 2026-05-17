import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <header className="surface-panel reveal-up rounded-3xl border border-white/25 p-6 text-slate-100 shadow-2xl sm:p-8 lg:p-10">
      <Badge
        variant="secondary"
        className="w-fit bg-teal-100/20 text-xs uppercase tracking-[0.2em] text-teal-50"
      >
        Finance OS para quem cresce
      </Badge>

      <h1 className="font-heading mt-4 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Sua nova casa financeira para decidir com confiança.
      </h1>

      <p className="mt-5 max-w-xl text-base text-teal-50/90 sm:text-lg">
        Menos atrito, mais visibilidade. Organize o caixa, elimine desperdícios
        e avance suas metas com dados em tempo real.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          className="h-10 bg-amber-300 px-5 text-sm font-semibold text-slate-950 hover:bg-amber-200"
          asChild
        >
          <Link href="/cadastro">Comece agora</Link>
        </Button>

        <Button
          variant="outline"
          className="h-10 border-white/60 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20"
        >
          <PlayCircle className="size-4" />
          Ver demonstração
        </Button>
      </div>
    </header>
  );
}
