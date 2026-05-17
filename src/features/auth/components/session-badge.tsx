import { Badge } from "@/components/ui/badge";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";

export function SessionBadge() {
  const { session, isLoading } = useAuthSession();

  if (isLoading) {
    return <Badge variant="outline">Carregando sessão...</Badge>;
  }

  if (!session.isAuthenticated || !session.user) {
    return <Badge variant="destructive">Sessão desconectada</Badge>;
  }

  return <Badge variant="secondary">Olá, {session.user.name}</Badge>;
}
