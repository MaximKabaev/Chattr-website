"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "../payment.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.arc-chat.app";
const POLL_INTERVAL = 2000;
const MAX_ATTEMPTS = 15;

export default function PaymentResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"polling" | "succeeded" | "failed">(
    "polling"
  );

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
              router.replace("/payment/success");
            }
            return;
          }
          if (data.status === "canceled" || data.status === "failed") {
            if (!cancelled) {
              setStatus("failed");
              router.replace("/payment/failed");
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
        router.replace("/payment/failed");
      }
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [searchParams, router]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.spinner} />
        <h1 className={styles.title}>Проверяем оплату...</h1>
        <p className={styles.description}>
          Пожалуйста, подождите. Это займёт несколько секунд.
        </p>
      </div>
    </div>
  );
}
