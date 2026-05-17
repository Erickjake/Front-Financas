"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/features/auth/services/auth-service";
import type { SessionState } from "@/features/auth/types";

const INITIAL_SESSION: SessionState = {
  user: null,
  isAuthenticated: false,
};

export function useAuthSession() {
  const [session, setSession] = useState<SessionState>(INITIAL_SESSION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getSession();
        if (!cancelled) {
          setSession(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Erro ao verificar sessão",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    session,
    isLoading,
    error,
  };
}
