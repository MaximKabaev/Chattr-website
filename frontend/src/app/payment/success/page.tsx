"use client";

import { useEffect, useState } from "react";
import styles from "../payment.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/chattr/id6757166779";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.arcchat.chattr";
const DEEP_LINK = "chattr://";

export default function PaymentSuccess() {
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
        <div className={`${styles.iconCircle} ${styles.iconSuccess}`}>
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className={styles.title}>Оплата прошла успешно</h1>
        <p className={styles.description}>
          Спасибо за покупку! Теперь вы можете вернуться в приложение.
        </p>
        <button
          className={`${styles.button} ${styles.buttonSuccess}`}
          onClick={handleReturn}
        >
          Вернуться в приложение
        </button>
      </div>
    </div>
  );
}
