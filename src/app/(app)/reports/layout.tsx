import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relatórios | Front Finanças",
  description:
    "Visualize relatórios financeiros por categoria e evolução mensal.",
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
