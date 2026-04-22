import { HOME_FEATURES, HOME_KPIS, HOME_STEPS } from "@/features/home/content";
import { FeaturesSection } from "@/features/home/sections/features-section";
import { HeroSection } from "@/features/home/sections/hero-section";
import { KpiSection } from "@/features/home/sections/kpi-section";
import { RoadmapSection } from "@/features/home/sections/roadmap-section";

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(140deg,#062a2f_0%,#0f3e47_42%,#f4efe6_42%,#fbf6ef_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_14%_12%,rgba(56,189,149,.28),transparent_40%),radial-gradient(circle_at_84%_18%,rgba(234,179,8,.2),transparent_42%),radial-gradient(circle_at_65%_88%,rgba(14,116,144,.22),transparent_45%)]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <HeroSection />
        <KpiSection items={HOME_KPIS} />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <FeaturesSection items={HOME_FEATURES} />
          <RoadmapSection steps={HOME_STEPS} />
        </section>
      </main>
    </div>
  );
}
