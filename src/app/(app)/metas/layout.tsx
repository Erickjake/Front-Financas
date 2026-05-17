import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metas | Front Finanças",
  description: "Defina metas financeiras e acompanhe o progresso.",
};

export default function MetasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
