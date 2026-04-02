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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <p className={styles.emailLabel}>Позвоните нам</p>
          <p className={styles.email}>+7 (926) 101-11-07</p>
          <a href="tel:+79261011107" className={styles.emailButton}>
            Позвонить
          </a>
        </div>

        <div className={styles.note}>
          <p>
            Кабаев Максим Владимирович
            <br />
            Адрес: 3-я улица Ямского Поля, 2к16, г. Москва
          </p>
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
