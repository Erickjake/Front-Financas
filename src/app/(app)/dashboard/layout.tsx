import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Front Finanças",
  description: "Resumo financeiro com receitas, despesas e evolução mensal.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
