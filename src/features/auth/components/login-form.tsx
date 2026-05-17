"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/features/auth/services/auth-service";
import { ApiError } from "@/lib/api-client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Preencha email e senha.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const session = await login({ email, password });

      if (!session.isAuthenticated) {
        setError("Login inválido. Verifique suas credenciais.");
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Email ou senha incorretos.");
          return;
        }

        if (err.status === 429) {
          setError("Muitas tentativas de login. Aguarde e tente novamente.");
          return;
        }

        setError(err.message || "Não foi possível concluir o login.");
        return;
      }
      setError("Não foi possível conectar à API de autenticação.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-white/20 bg-white/90 py-0 shadow-2xl shadow-cyan-950/20 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Acesse sua conta para acompanhar receitas e despesas.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              disabled={isSubmitting}
            />
          </div>

          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          ) : null}

          <Button
            className="h-10 w-full"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-between bg-muted/35 text-xs text-muted-foreground">
        <span>Novo por aqui?</span>
        <Button
          asChild
          variant="link"
          size="sm"
          className="h-auto px-0 text-xs"
        >
          <Link href="/cadastro">Criar conta</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
