import Link from "next/link";
import styles from "./support.module.css";

export const metadata = {
  title: "Поддержка — Chattr",
  description: "Свяжитесь с командой Chattr",
};

export default function SupportPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <h1 className={styles.title}>Поддержка</h1>
        <p className={styles.subtitle}>
          Если у вас есть вопросы, предложения или проблемы с приложением —
          напишите нам.
        </p>

        <div className={styles.card}>
          <div className={styles.emailIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="28"
              height="28"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <p className={styles.emailLabel}>Напишите нам на</p>
          <p className={styles.email}>mkabaevuk@gmail.com</p>
          <a href="mailto:mkabaevuk@gmail.com" className={styles.emailButton}>
            Написать письмо
          </a>
        </div>

        <div className={styles.note}>
          <p>
            Мы стараемся отвечать в течение 48 часов. При обращении, пожалуйста,
            опишите проблему как можно подробнее — это поможет нам быстрее
            разобраться и помочь.
          </p>
        </div>
      </main>
    </div>
  );
}
