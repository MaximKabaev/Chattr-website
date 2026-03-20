import Image from "next/image";
import { Metadata } from "next";
import styles from "./page.module.css";
import { StoreButtons } from "./StoreButtons";

interface PageProps {
  params: Promise<{ username: string }>;
}

const APP_STORE_ID = "6757166779";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    other: {
      "apple-itunes-app": `app-id=${APP_STORE_ID}, app-argument=chattr://invite/${username}`,
    },
  };
}

export default async function InvitePage({ params }: PageProps) {
  const { username } = await params;

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
          <strong>@{username}</strong> приглашает вас в Chattr
        </p>

        <a href={`chattr://invite/${username}`} className={styles.openButton}>
          Открыть в приложении
        </a>

        <p className={styles.hint}>Нет приложения?</p>

        <StoreButtons />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Chattr. Все права защищены.</p>
      </footer>
    </div>
  );
}
