import Link from "next/link";
import PlatformCard from "./PlatformCard";
import {
  formatBytes,
  type DesktopRelease,
} from "@/lib/desktopRelease";
import styles from "../download.module.css";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface Props {
  release: DesktopRelease | null;
  locale: Locale;
  t: Dictionary["download"];
}

function formatDate(iso: string | null, intlLocale: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M3 5.479l7.377-1.005.003 7.116-7.373.042L3 5.479zm7.374 6.929l.006 7.123-7.373-1.014v-6.165l7.367.056zm.895-8.065L21.05 3v8.584l-9.781.078V4.343zm9.783 8.221l-.002 8.546-9.781-1.38-.014-7.18 9.797.014z" />
    </svg>
  );
}

export default function DownloadBody({ release, locale, t }: Props) {
  const intlLocale = locale === "en" ? "en-US" : "ru-RU";

  const cardLabels = {
    recommended: t.cardRecommended,
    soon: t.cardSoon,
    download: t.cardDownload,
    unavailable: t.cardUnavailable,
  };

  const winSize = release?.windows ? formatBytes(release.windows.sizeBytes) : "—";
  const macArmSize = release?.macArm64
    ? formatBytes(release.macArm64.sizeBytes)
    : "—";
  const macIntelSize = release?.macIntel
    ? formatBytes(release.macIntel.sizeBytes)
    : "—";

  const versionMeta = (
    entry: { version: string; releasedAt: string | null } | undefined | null,
  ) =>
    entry
      ? `${t.versionPrefix} ${entry.version}${entry.releasedAt ? ` · ${formatDate(entry.releasedAt, intlLocale)}` : ""}`
      : null;

  const winMeta = versionMeta(release?.windows);
  const macArmMeta = versionMeta(release?.macArm64);
  const macIntelMeta = versionMeta(release?.macIntel);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              {t.titleBefore} <span className={styles.titleAccent}>{t.titleAccent}</span>
            </h1>
            <p className={styles.tagline}>{t.tagline}</p>
          </div>
        </section>

        <section className={styles.platforms}>
          <div className={styles.platformsInner}>
            <PlatformCard
              platform="macArm64"
              title="macOS"
              subtitle={t.macSubtitle}
              size={macArmSize}
              versionMeta={macArmMeta}
              href={release?.macArm64?.url ?? null}
              icon={<AppleGlyph />}
              labels={cardLabels}
            />
            <PlatformCard
              platform="macIntel"
              title="macOS"
              subtitle={t.macIntelSubtitle}
              size={macIntelSize}
              versionMeta={macIntelMeta}
              href={release?.macIntel?.url ?? null}
              icon={<AppleGlyph />}
              labels={cardLabels}
            />
            <PlatformCard
              platform="windows"
              title="Windows"
              subtitle={t.windowsSubtitle}
              size={winSize}
              versionMeta={winMeta}
              href={release?.windows?.url ?? null}
              icon={<WindowsGlyph />}
              labels={cardLabels}
            />
          </div>
        </section>

        <section className={styles.requirements}>
          <div className={styles.requirementsInner}>
            <h2 className={styles.requirementsTitle}>{t.requirementsTitle}</h2>
            <div className={styles.requirementsGrid}>
              <div className={styles.requirementCard}>
                <div className={styles.requirementHead}>
                  <AppleGlyph />
                  <strong>macOS</strong>
                </div>
                <p>{t.macReq}</p>
              </div>
              <div className={styles.requirementCard}>
                <div className={styles.requirementHead}>
                  <WindowsGlyph />
                  <strong>Windows</strong>
                </div>
                <p>{t.windowsReq}</p>
              </div>
            </div>
            <p className={styles.fineprint}>{t.fineprint}</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} Chattr</span>
          <div className={styles.footerLinks}>
            <Link href={localizedPath(locale, "/privacy")}>{t.footerPrivacy}</Link>
            <Link href={localizedPath(locale, "/terms")}>{t.footerTerms}</Link>
            <Link href={localizedPath(locale, "/support")}>{t.footerSupport}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
