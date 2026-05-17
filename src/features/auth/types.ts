export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type SessionState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};
