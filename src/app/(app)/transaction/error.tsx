"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface TransactionErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TransactionError({
  error,
  reset,
}: TransactionErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-sm font-medium text-destructive">
        Erro ao carregar transações
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} variant="outline" size="sm">
        Tentar novamente
      </Button>
    </div>
  );
}
