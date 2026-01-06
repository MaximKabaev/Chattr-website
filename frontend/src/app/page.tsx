import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.appIcon}
          src="/app-icon.png"
          alt="Chatter app icon"
          width={120}
          height={120}
          priority
        />
        <h1 className={styles.title}>Chattr</h1>
        <p className={styles.tagline}>Ваш iOS мессенджер</p>

        <nav className={styles.nav}>
          <Link href="/privacy" className={styles.link}>
            Политика конфиденциальности
          </Link>
          <a href="mailto:mkabaevuk@gmail.com" className={styles.link}>
            Поддержка
          </a>
        </nav>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Chattr. Все права защищены.</p>
      </footer>
    </div>
  );
}
