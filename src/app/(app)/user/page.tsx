import { UserProfileCard } from "@/features/user";

export default function UserPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Perfil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie suas informações de conta
        </p>
      </div>

      <UserProfileCard />
    </div>
  );
}
