import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(148deg,#021a25_0%,#0b3948_36%,#f8f2e8_36%,#fffaf2_100%)]">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_12%_14%,rgba(45,212,191,.2),transparent_38%),radial-gradient(circle_at_85%_22%,rgba(251,191,36,.18),transparent_40%),radial-gradient(circle_at_62%_86%,rgba(14,116,144,.18),transparent_48%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10 sm:px-10">
        <section className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-up rounded-2xl border border-white/20 surface-panel p-6 text-white shadow-xl sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-200/90 uppercase">
              Front Finanças
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl">
              Faça login para ver seu painel financeiro.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-cyan-100/90 sm:text-base">
              Centralize receitas, despesas e metas em uma única visão. Sua
              sessão será validada na API Nest em tempo real.
            </p>
          </div>

          <div className="reveal-up [animation-delay:120ms]">
            <LoginForm />
          </div>
        </section>
      </main>
    </div>
  );
}
