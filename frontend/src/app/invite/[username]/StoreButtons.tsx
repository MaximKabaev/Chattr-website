"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/chattr/id6757166779";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.arcchat.chattr";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "unknown";
}

export function StoreButtons() {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  if (platform === "android") {
    return (
      <a href={PLAY_STORE_URL} className={styles.storeButton}>
        Скачать в Google Play
      </a>
    );
  }

  if (platform === "ios") {
    return (
      <a href={APP_STORE_URL} className={styles.storeButton}>
        Скачать в App Store
      </a>
    );
  }

  // Unknown platform — show both
  return (
    <div className={styles.storeLinks}>
      <a href={APP_STORE_URL} className={styles.storeButton}>
        Скачать в App Store
      </a>
      <a href={PLAY_STORE_URL} className={styles.storeButton}>
        Скачать в Google Play
      </a>
    </div>
  );
}
