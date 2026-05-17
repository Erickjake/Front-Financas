import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-center">
      <div className="space-y-2">
        <p className="text-8xl font-bold tracking-tight text-primary">404</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Página não encontrada
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Voltar ao painel</Link>
      </Button>
    </div>
  );
}
