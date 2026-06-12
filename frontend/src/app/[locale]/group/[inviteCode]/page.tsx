import Image from "next/image";
import { Metadata } from "next";
import styles from "./page.module.css";
import { StoreButtons } from "./StoreButtons";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string; inviteCode: string }>;
}

const APP_STORE_ID = "6757166779";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { inviteCode } = await params;
  return {
    other: {
      "apple-itunes-app": `app-id=${APP_STORE_ID}, app-argument=chattr://group/${inviteCode}`,
    },
  };
}

export default async function GroupInvitePage({ params }: PageProps) {
  const { locale: raw, inviteCode } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale).group;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.appIcon}
          src="/app-icon.png"
          alt="Chattr app icon"
          width={100}
          height={100}
          priority
        />
        <h1 className={styles.title}>Chattr</h1>
        <p className={styles.message}>{t.invited}</p>

        <a href={`chattr://group/${inviteCode}`} className={styles.openButton}>
          {t.openInApp}
        </a>

        <p className={styles.hint}>{t.noApp}</p>

        <StoreButtons />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Chattr. {t.rights}</p>
      </footer>
    </div>
  );
}
