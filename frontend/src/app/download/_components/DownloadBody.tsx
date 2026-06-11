import Link from "next/link";
import PlatformCard from "./PlatformCard";
import {
  formatBytes,
  type DesktopRelease,
} from "../../../lib/desktopRelease";
import styles from "../download.module.css";

interface Props {
  release: DesktopRelease | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("ru-RU", {
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

export default function DownloadBody({ release }: Props) {
  const winSize = release?.windows ? formatBytes(release.windows.sizeBytes) : "—";
  const macArmSize = release?.macArm64
    ? formatBytes(release.macArm64.sizeBytes)
    : "—";
  const macIntelSize = release?.macIntel
    ? formatBytes(release.macIntel.sizeBytes)
    : "—";

  const winMeta = release?.windows
    ? `Версия ${release.windows.version}${release.windows.releasedAt ? ` · ${formatDate(release.windows.releasedAt)}` : ""}`
    : null;
  const macArmMeta = release?.macArm64
    ? `Версия ${release.macArm64.version}${release.macArm64.releasedAt ? ` · ${formatDate(release.macArm64.releasedAt)}` : ""}`
    : null;
  const macIntelMeta = release?.macIntel
    ? `Версия ${release.macIntel.version}${release.macIntel.releasedAt ? ` · ${formatDate(release.macIntel.releasedAt)}` : ""}`
    : null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              Chattr для <span className={styles.titleAccent}>рабочего стола</span>
            </h1>
            <p className={styles.tagline}>
              Chattr для Windows и macOS. Защищённое подключение. Автоматические обновления.
            </p>
          </div>
        </section>

        <section className={styles.platforms}>
          <div className={styles.platformsInner}>
            <PlatformCard
              platform="macArm64"
              title="macOS"
              subtitle="Apple Silicon (M1, M2, M3, M4)"
              size={macArmSize}
              versionMeta={macArmMeta}
              href={release?.macArm64?.url ?? null}
              icon={<AppleGlyph />}
            />
            <PlatformCard
              platform="macIntel"
              title="macOS"
              subtitle="Intel"
              size={macIntelSize}
              versionMeta={macIntelMeta}
              href={release?.macIntel?.url ?? null}
              icon={<AppleGlyph />}
            />
            <PlatformCard
              platform="windows"
              title="Windows"
              subtitle="10 или новее, 64-bit"
              size={winSize}
              versionMeta={winMeta}
              href={release?.windows?.url ?? null}
              icon={<WindowsGlyph />}
            />
          </div>
        </section>

        <section className={styles.requirements}>
          <div className={styles.requirementsInner}>
            <h2 className={styles.requirementsTitle}>Системные требования</h2>
            <div className={styles.requirementsGrid}>
              <div className={styles.requirementCard}>
                <div className={styles.requirementHead}>
                  <AppleGlyph />
                  <strong>macOS</strong>
                </div>
                <p>macOS 11 Big Sur или новее. Apple Silicon или Intel.</p>
              </div>
              <div className={styles.requirementCard}>
                <div className={styles.requirementHead}>
                  <WindowsGlyph />
                  <strong>Windows</strong>
                </div>
                <p>Windows 10 (64-bit) или новее. Установщик запросит права администратора.</p>
              </div>
            </div>
            <p className={styles.fineprint}>
              Приложение обновляется автоматически в фоне. После выхода новой
              версии вам не придётся скачивать установщик заново — обновление
              применится при перезапуске.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} Chattr</span>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Конфиденциальность</Link>
            <Link href="/terms">Условия</Link>
            <Link href="/support">Поддержка</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
