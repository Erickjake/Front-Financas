import { Badge } from "@/components/ui/badge";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";

export function SessionBadge() {
  const { session, isLoading } = useAuthSession();

  if (isLoading) {
    return <Badge variant="outline">Carregando sessao...</Badge>;
  }

  if (!session.isAuthenticated || !session.user) {
    return <Badge variant="destructive">Sessao desconectada</Badge>;
  }

  return <Badge variant="secondary">Ola, {session.user.name}</Badge>;
}
