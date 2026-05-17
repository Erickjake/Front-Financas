"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBackup } from "@/features/backup";

export default function BackupPage() {
  const [restorePayload, setRestorePayload] = useState("{}");
  const [parseError, setParseError] = useState<string | null>(null);
  const {
    snapshot,
    isLoading,
    isRestoring,
    message,
    error,
    loadSnapshot,
    restore,
    clearFeedback,
  } = useBackup();

  async function handleRestore() {
    clearFeedback();
    setParseError(null);
    let payload: unknown;
    try {
      payload = JSON.parse(restorePayload) as unknown;
    } catch {
      setParseError("JSON inválido. Verifique o payload antes de restaurar.");
      return;
    }
    await restore(payload);
  }

  const snapshotText = snapshot ? JSON.stringify(snapshot, null, 2) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Backup
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Exporte e restaure um snapshot dos seus dados financeiros
        </p>
      </div>

      {message && (
        <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
          {message}
        </p>
      )}
      {(error || parseError) && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {parseError ?? error}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Snapshot atual</CardTitle>
          <CardDescription>
            Baixe ou visualize o backup mais recente da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={loadSnapshot} disabled={isLoading}>
            {isLoading ? "Carregando..." : "Carregar snapshot"}
          </Button>

          {snapshotText && (
            <pre className="max-h-72 overflow-auto rounded-md border border-border bg-muted p-3 text-xs">
              {snapshotText}
            </pre>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Restaurar backup</CardTitle>
          <CardDescription>
            Cole o JSON do snapshot para restaurar os dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="grid gap-1 text-sm" htmlFor="restore-payload">
            Payload JSON
            <textarea
              id="restore-payload"
              className="min-h-40 w-full rounded-md border border-input bg-background p-3 font-mono text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={restorePayload}
              onChange={(e) => setRestorePayload(e.target.value)}
              placeholder='{"items":[]}'
            />
          </label>
          <Button
            variant="destructive"
            onClick={handleRestore}
            disabled={isRestoring}
          >
            {isRestoring ? "Restaurando..." : "Restaurar dados"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
