import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orçamentos | Front Finanças",
  description: "Acompanhe seus orçamentos mensais e controle gastos.",
};

export default function BudgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
