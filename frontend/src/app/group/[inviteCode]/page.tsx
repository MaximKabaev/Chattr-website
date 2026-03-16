import Image from "next/image";
import { Metadata } from "next";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ inviteCode: string }>;
}

const APP_STORE_ID = "6757166779";
const APP_STORE_URL = `https://apps.apple.com/app/chattr/id${APP_STORE_ID}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { inviteCode } = await params;
  return {
    other: {
      "apple-itunes-app": `app-id=${APP_STORE_ID}, app-argument=chattr://group/${inviteCode}`,
    },
  };
}

export default async function GroupInvitePage({ params }: PageProps) {
  const { inviteCode } = await params;

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
        <p className={styles.message}>
          Вас пригласили в группу в Chattr
        </p>

        <a href={`chattr://group/${inviteCode}`} className={styles.openButton}>
          Открыть в приложении
        </a>

        <p className={styles.hint}>Нет приложения?</p>

        <a href={APP_STORE_URL} className={styles.appStoreButton}>
          Скачать в App Store
        </a>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Chattr. Все права защищены.</p>
      </footer>
    </div>
  );
}
