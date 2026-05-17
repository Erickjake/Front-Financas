import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

function createRequest(
  pathname: string,
  cookieValues: Record<string, string> = {},
) {
  const url = `http://localhost:3002${pathname}`;

  return {
    nextUrl: new URL(url),
    url,
    cookies: {
      get(name: string) {
        const value = cookieValues[name];
        return value ? { name, value } : undefined;
      },
    },
  };
}

describe("proxy", () => {
  it("exports matcher config for Next.js proxy", async () => {
    const mod = await import("./proxy");

    expect(mod.config).toEqual({
      matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
    });
  });

  it("redirects protected routes without session to login with next path", () => {
    const response = proxy(createRequest("/categories") as never);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3002/login?next=%2Fcategories",
    );
  });

  it("redirects auth routes with session to dashboard", () => {
    const response = proxy(
      createRequest("/login", { access_token: "token" }) as never,
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3002/dashboard",
    );
  });
});
