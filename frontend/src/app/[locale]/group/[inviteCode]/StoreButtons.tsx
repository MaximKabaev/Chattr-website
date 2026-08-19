"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const APP_STORE_URL = "https://apps.apple.com/app/chattr/id6757166779";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.arcchat.chattr";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "unknown";
}

interface StoreButtonsProps {
  /** Copied to the clipboard when a store button is tapped — carries a referral
   *  code across the App Store install gap, where the link itself cannot follow. */
  copyText?: string;
  /** Overrides the Google Play target — the VPN referral flow lives in Chattr
   *  Connect on Android, not the messenger, and its listing URL carries the
   *  install-referrer payload. */
  playStoreUrl?: string;
}

export function StoreButtons({ copyText, playStoreUrl }: StoreButtonsProps = {}) {
  const params = useParams();
  const rawLocale = typeof params.locale === "string" ? params.locale : defaultLocale;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale).store;

  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleClick = () => {
    if (copyText) {
      navigator.clipboard?.writeText(copyText).catch(() => {});
    }
  };

  const playUrl = playStoreUrl ?? PLAY_STORE_URL;

  if (platform === "android") {
    return (
      <a href={playUrl} className={styles.storeButton} onClick={handleClick}>
        {t.googlePlay}
      </a>
    );
  }

  if (platform === "ios") {
    return (
      <a href={APP_STORE_URL} className={styles.storeButton} onClick={handleClick}>
        {t.appStore}
      </a>
    );
  }

  // Unknown platform — show both
  return (
    <div className={styles.storeLinks}>
      <a href={APP_STORE_URL} className={styles.storeButton} onClick={handleClick}>
        {t.appStore}
      </a>
      <a href={playUrl} className={styles.storeButton} onClick={handleClick}>
        {t.googlePlay}
      </a>
    </div>
  );
}
