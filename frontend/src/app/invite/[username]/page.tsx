import Image from "next/image";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ username: string }>;
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

        <p className={styles.hint}>
          Нет приложения? Скоро будет доступно в App Store
        </p>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Chattr. Все права защищены.</p>
      </footer>
    </div>
  );
}
