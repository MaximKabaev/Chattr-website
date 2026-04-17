"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch, ApiError, getToken, setToken } from "@/lib/api";
import styles from "../account.module.css";

type LoginResponse = { token: string };

export default function AccountLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/account");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier || !password) return;

    setError(null);
    setSubmitting(true);
    try {
      const data = await apiFetch<LoginResponse>("/api/users/login", {
        method: "POST",
        auth: false,
        body: { username: identifier.trim(), password },
      });
      setToken(data.token);
      router.replace("/account");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Не удалось войти. Попробуйте позже.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <h1 className={styles.title}>Вход в аккаунт</h1>
        <p className={styles.subtitle}>
          Войдите, чтобы управлять подпиской и привязанной картой.
        </p>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.fieldset}>
            <label className={styles.label}>
              Имя пользователя или email
              <input
                className={styles.input}
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={submitting}
                required
              />
            </label>
            <label className={styles.label}>
              Пароль
              <input
                className={styles.input}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                required
              />
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={submitting || !identifier || !password}
          >
            {submitting ? "Вход…" : "Войти"}
          </button>
        </form>
      </main>
    </div>
  );
}
