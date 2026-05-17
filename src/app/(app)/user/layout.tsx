import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil | Front Finanças",
  description: "Gerencie seu perfil e preferências de conta.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
