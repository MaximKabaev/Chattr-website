"use client";

import { useEffect, useState } from "react";
import styles from "../download.module.css";

type Platform = "windows" | "macArm64" | "macIntel";

interface Props {
  platform: Platform;
  title: string;
  subtitle: string;
  size: string;
  href: string | null;
  /**
   * When set, this card is highlighted as the recommended pick regardless of
   * UA detection. Used by /download/[platform] deep-links.
   */
  forcedRecommended?: boolean;
  icon: React.ReactNode;
}

function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  const platform =
    // navigator.userAgentData is the modern API but isn't on Safari yet
    (navigator as unknown as { userAgentData?: { platform?: string } })
      .userAgentData?.platform ?? "";

  if (/Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) {
    // Apple Silicon detection from the browser is unreliable: navigator.platform
    // reports "MacIntel" even on M1+. We default to arm64 since most new Macs
    // are Apple Silicon — Intel users can still pick the other card.
    return "macArm64";
  }
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
  return null;
}

export default function PlatformCard({
  platform,
  title,
  subtitle,
  size,
  href,
  forcedRecommended,
  icon,
}: Props) {
  const [detected, setDetected] = useState<Platform | null>(null);
  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const recommended = forcedRecommended ?? detected === platform;
  const available = !!href;

  return (
    <a
      href={href ?? "#"}
      className={`${styles.platformCard} ${recommended ? styles.platformCardRecommended : ""} ${!available ? styles.platformCardDisabled : ""}`}
      aria-disabled={!available}
      onClick={(e) => {
        if (!available) e.preventDefault();
      }}
      download={available ? "" : undefined}
    >
      {recommended && <span className={styles.recommendedBadge}>Рекомендуется</span>}
      <div className={styles.platformIcon} aria-hidden="true">
        {icon}
      </div>
      <div className={styles.platformText}>
        <div className={styles.platformTitle}>{title}</div>
        <div className={styles.platformSubtitle}>{subtitle}</div>
      </div>
      <div className={styles.platformMeta}>
        <span className={styles.platformSize}>{available ? size : "Скоро"}</span>
        <span className={styles.platformAction}>
          {available ? "Скачать" : "Недоступно"}
        </span>
      </div>
    </a>
  );
}
