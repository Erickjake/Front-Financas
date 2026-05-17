import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exportação | Front Finanças",
  description: "Exporte seus dados financeiros em CSV ou PDF.",
};

export default function ExportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
