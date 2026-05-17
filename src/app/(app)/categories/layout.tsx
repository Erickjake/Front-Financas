import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categorias | Front Finanças",
  description: "Crie e organize categorias para classificar transações.",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
