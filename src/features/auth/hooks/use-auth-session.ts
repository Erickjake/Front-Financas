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

  useEffect(() => {
    getSession().then((data) => {
      setSession(data);
      setIsLoading(false);
    });
  }, []);

  return {
    session,
    isLoading,
  };
}
