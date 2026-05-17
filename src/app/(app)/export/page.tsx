"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { exportCsv, exportPdf } from "@/features/export";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ExportPage() {
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExportCsv() {
    setError(null);
    setIsCsvLoading(true);
    try {
      const file = await exportCsv();
      triggerDownload(
        file,
        `transacoes_${new Date().toISOString().slice(0, 10)}.csv`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao exportar CSV.");
    } finally {
      setIsCsvLoading(false);
    }
  }

  async function handleExportPdf() {
    setError(null);
    setIsPdfLoading(true);
    try {
      const file = await exportPdf();
      triggerDownload(
        file,
        `relatorio_${new Date().toISOString().slice(0, 10)}.pdf`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao exportar PDF.");
    } finally {
      setIsPdfLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Exportação
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gere arquivos para compartilhamento externo dos dados financeiros.
        </p>
      </div>

      <Card className="py-0">
        <CardHeader>
          <CardTitle>Arquivos disponíveis</CardTitle>
          <CardDescription>
            Escolha o formato de exportação desejado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          {error ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleExportCsv} disabled={isCsvLoading}>
              <Download className="h-4 w-4" />
              {isCsvLoading ? "Gerando CSV..." : "Exportar CSV"}
            </Button>
            <Button
              variant="outline"
              onClick={handleExportPdf}
              disabled={isPdfLoading}
            >
              <Download className="h-4 w-4" />
              {isPdfLoading ? "Gerando PDF..." : "Exportar PDF"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
