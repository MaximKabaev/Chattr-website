import Image from "next/image";
import { Metadata } from "next";
import styles from "../../invite/[username]/page.module.css";
import { StoreButtons } from "../../invite/[username]/StoreButtons";
import { defaultLocale, isLocale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string; code: string }>;
}

const APP_STORE_ID = "6757166779";

// Fallback page for the desktop-linking QR. Universal/app links open the installed
// Chattr app directly (and it handles the code in-app); this page is only shown when
// the link is opened in a browser without the app installed.
const COPY = {
  en: {
    heading: "Link your desktop",
    message: "Open this link in the Chattr app on the phone where you're signed in to authorize your desktop.",
    openInApp: "Open in the app",
    noApp: "Don't have the app?",
    rights: "All rights reserved.",
  },
  ru: {
    heading: "Подключение компьютера",
    message: "Откройте эту ссылку в приложении Chattr на телефоне, где вы вошли в аккаунт, чтобы авторизовать компьютер.",
    openInApp: "Открыть в приложении",
    noApp: "Нет приложения?",
    rights: "Все права защищены.",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    other: {
      "apple-itunes-app": `app-id=${APP_STORE_ID}, app-argument=chattr://link/${code}`,
    },
  };
}

export default async function LinkPage({ params }: PageProps) {
  const { locale: raw, code } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = COPY[locale === "ru" ? "ru" : "en"];

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
        <h1 className={styles.title}>{t.heading}</h1>
        <p className={styles.message}>{t.message}</p>

        <a href={`chattr://link/${code}`} className={styles.openButton}>
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
