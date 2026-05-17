export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buildUrl(path: string): string {
  // No browser, usa o proxy do Next.js (/api/...) para evitar CORS.
  // No servidor (SSR), chama o backend diretamente.
  if (typeof window !== "undefined") {
    return `/api${path}`;
  }

  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}

/** Flag para evitar loop infinito de refresh. */
let isRefreshing = false;

async function tryRefreshToken(): Promise<boolean> {
  if (isRefreshing) return false;
  isRefreshing = true;
  try {
    const res = await fetch(buildUrl("/auth/refresh"), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    isRefreshing = false;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { _isRetry?: boolean },
): Promise<T> {
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  // Tentativa automática de refresh em caso de 401 (exceto na própria rota de auth).
  if (
    response.status === 401 &&
    !path.startsWith("/auth/") &&
    !init?._isRetry
  ) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // Re-executa a request original com o novo token.
      return apiFetch<T>(path, { ...init, _isRetry: true });
    } else if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } else if (response.status === 401 && init?._isRetry) {
    // Se já tentou e falhou, força o login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  if (!response.ok) {
    let message = `Erro na API: ${response.status}`;

    try {
      const data = (await response.json()) as {
        message?: string | string[];
      };
      if (Array.isArray(data.message)) {
        message = data.message.join(", ");
      } else if (typeof data.message === "string") {
        message = data.message;
      }
    } catch {
      // Fallback para resposta sem JSON.
    }

    throw new ApiError(message, response.status);
  }

  // Respostas sem body (204 No Content, ou content-length 0).
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
