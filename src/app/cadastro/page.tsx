import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(156deg,#041a26_0%,#0b3f4f_34%,#ecf5e9_34%,#f7fdf4_100%)]">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_16%_16%,rgba(74,222,128,.2),transparent_38%),radial-gradient(circle_at_82%_16%,rgba(251,191,36,.2),transparent_40%),radial-gradient(circle_at_64%_84%,rgba(16,185,129,.16),transparent_50%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10 sm:px-10">
        <section className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-up rounded-2xl border border-white/20 surface-panel p-6 text-white shadow-xl sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-200/90 uppercase">
              Front Finanças
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl">
              Crie sua conta e comece seu controle financeiro.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-emerald-100/90 sm:text-base">
              Configure seu acesso em poucos passos para acompanhar seu caixa,
              metas e tendências com dados atualizados.
            </p>
          </div>

          <div className="reveal-up [animation-delay:120ms]">
            <RegisterForm />
          </div>
        </section>
      </main>
    </div>
  );
}
