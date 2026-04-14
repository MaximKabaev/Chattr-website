"use client";

import { useEffect, useState } from "react";
import styles from "../payment.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/chattr/id6757166779";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.arcchat.chattr";
const DEEP_LINK = "chattr://";

export default function PaymentFailed() {
  const [storeUrl, setStoreUrl] = useState(APP_STORE_URL);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/android/i.test(ua)) {
      setStoreUrl(PLAY_STORE_URL);
    }
  }, []);

  const handleReturn = () => {
    window.location.href = DEEP_LINK;
    setTimeout(() => {
      window.location.href = storeUrl;
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={`${styles.iconCircle} ${styles.iconFailed}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="40"
            height="40"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 className={styles.title}>Оплата не прошла</h1>
        <p className={styles.description}>
          К сожалению, платёж не был завершён. Вы можете вернуться в приложение и
          попробовать снова.
        </p>
        <button
          className={`${styles.button} ${styles.buttonFailed}`}
          onClick={handleReturn}
        >
          Вернуться в приложение
        </button>
      </div>
    </div>
  );
}
