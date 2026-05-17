import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transações | Front Finanças",
  description:
    "Gerencie suas receitas e despesas com filtros, busca e exportação.",
};

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
