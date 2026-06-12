"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import styles from "../payment.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath, type Locale } from "@/i18n/config";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.arc-chat.app";
const POLL_INTERVAL = 2000;
const MAX_ATTEMPTS = 15;

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const rawLocale = typeof params.locale === "string" ? params.locale : defaultLocale;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale).payment;
  const successPath = localizedPath(locale, "/payment/success");
  const failedPath = localizedPath(locale, "/payment/failed");

  const [, setStatus] = useState<"polling" | "succeeded" | "failed">("polling");

  useEffect(() => {
    const key = searchParams.get("key");
    if (!key) {
      setStatus("failed");
      return;
    }

    let attempt = 0;
    let cancelled = false;

    async function poll() {
      while (attempt < MAX_ATTEMPTS && !cancelled) {
        try {
          const res = await fetch(
            `${API_BASE}/api/vpn/payment/check/${encodeURIComponent(key!)}`
          );
          const data = await res.json();

          if (data.status === "succeeded") {
            if (!cancelled) {
              setStatus("succeeded");
              router.replace(successPath);
            }
            return;
          }
          if (data.status === "canceled" || data.status === "failed") {
            if (!cancelled) {
              setStatus("failed");
              router.replace(failedPath);
            }
            return;
          }
        } catch {
          // Network error — keep polling
        }

        attempt++;
        await new Promise((r) => setTimeout(r, POLL_INTERVAL));
      }

      // Timed out
      if (!cancelled) {
        setStatus("failed");
        router.replace(failedPath);
      }
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [searchParams, router, successPath, failedPath]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.spinner} />
        <h1 className={styles.title}>{t.checkingTitle}</h1>
        <p className={styles.description}>{t.checkingDesc}</p>
      </div>
    </div>
  );
}

export default function PaymentResult() {
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className={styles.card}>
            <div className={styles.spinner} />
          </div>
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
