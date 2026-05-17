import type { AuthUser } from "@/features/auth/types";

export type UserProfile = AuthUser & {
  createdAt?: string;
  avatarUrl?: string;
};
