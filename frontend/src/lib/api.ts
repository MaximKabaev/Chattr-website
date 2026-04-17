export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.arc-chat.app";

const TOKEN_KEY = "chattr_auth_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, auth = true }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (auth) {
    const token = getToken();
    if (!token) {
      throw new ApiError(401, "Не авторизован");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: { success?: boolean; error?: string; [k: string]: unknown } = {};
  try {
    data = await res.json();
  } catch {
    // non-JSON response
  }

  if (!res.ok || data.success === false) {
    const message =
      (typeof data.error === "string" && data.error) ||
      `Ошибка ${res.status}`;
    throw new ApiError(res.status, message);
  }

  return data as T;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}
