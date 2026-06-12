"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch, ApiError, getToken, setToken } from "@/lib/api";
import styles from "./login.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath, type Locale } from "@/i18n/config";

type LoginResponse = { token: string };

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function AccountLoginPage() {
  const router = useRouter();
  const params = useParams();
  const rawLocale = typeof params.locale === "string" ? params.locale : defaultLocale;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.login;
  const accountPath = localizedPath(locale, "/account");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace(accountPath);
    }
  }, [router, accountPath]);

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
      router.replace(accountPath);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(t.errorFallback);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {t.backLink}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.fieldset}>
            <label className={styles.label}>
              {t.identifierLabel}
              <span className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <UserIcon />
                </span>
                <input
                  className={styles.input}
                  type="text"
                  autoComplete="username"
                  placeholder={t.identifierPlaceholder}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={submitting}
                  required
                />
              </span>
            </label>
            <label className={styles.label}>
              {t.passwordLabel}
              <span className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <LockIcon />
                </span>
                <input
                  className={styles.input}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  required
                />
              </span>
            </label>
          </div>

          {error && (
            <p className={styles.error}>
              <AlertIcon />
              <span>{error}</span>
            </p>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={submitting || !identifier || !password}
          >
            {submitting ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </button>
        </form>

        <p className={styles.footnote}>
          {t.footnoteBefore}{" "}
          <Link href={localizedPath(locale, "/")} className={styles.footnoteAccent}>
            {t.footnoteLink}
          </Link>
          {t.footnoteAfter}
        </p>
      </div>
    </div>
  );
}
