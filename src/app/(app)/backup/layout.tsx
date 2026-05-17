import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backup | Front Finanças",
  description: "Faça backup e restauração dos seus dados financeiros.",
};

export default function BackupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
