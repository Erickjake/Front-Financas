"use client";

import { useCallback, useState } from "react";
import {
  getBackup,
  restoreBackup,
} from "@/features/backup/services/backup-service";

export function useBackup() {
  const [snapshot, setSnapshot] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadSnapshot = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const data = await getBackup();
      setSnapshot(data);
      setMessage("Snapshot carregado com sucesso.");
    } catch (err) {
      setSnapshot(null);
      setError(
        err instanceof Error ? err.message : "Falha ao carregar backup.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restore = useCallback(async (payload: unknown) => {
    setIsRestoring(true);
    setError(null);
    setMessage(null);
    try {
      await restoreBackup(payload);
      setMessage("Restauração concluída com sucesso.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao restaurar backup.",
      );
    } finally {
      setIsRestoring(false);
    }
  }, []);

  return {
    snapshot,
    isLoading,
    isRestoring,
    message,
    error,
    loadSnapshot,
    restore,
    clearFeedback: () => {
      setMessage(null);
      setError(null);
    },
  };
}
