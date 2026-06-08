import Link from "next/link";
import styles from "./data-deletion.module.css";

export const metadata = {
  title: "Удаление данных · Chattr",
  description: "Как удалить свои данные из приложения Chattr",
};

export default function DataDeletionPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <h1 className={styles.title}>Удаление данных</h1>
        <p className={styles.subtitle}>
          Вы можете удалить аккаунт и все связанные данные в любой момент,
          без обращения к нам и без объяснения причин.
        </p>

        <section className={styles.section}>
          <h2>Как удалить аккаунт</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Через настройки приложения</h3>
                <p>
                  Откройте <strong>Chattr</strong> → <strong>Настройки</strong>{" "}
                  → <strong>Удалить аккаунт</strong>. Все данные удалятся
                  мгновенно и безвозвратно.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Если потеряли доступ к аккаунту</h3>
                <p>
                  Напишите на{" "}
                  <a
                    href="mailto:mkabaevuk@gmail.com"
                    className={styles.emailLink}
                  >
                    mkabaevuk@gmail.com
                  </a>
                  . После проверки личности мы удалим аккаунт вручную, обычно в
                  течение 48 часов.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Что удаляется</h2>
          <ul className={styles.dataList}>
            <li>Профиль и настройки аккаунта</li>
            <li>Сообщения и история переписок</li>
            <li>Медиафайлы (фото, видео, документы)</li>
            <li>Контакты и списки чатов</li>
            <li>Все остальные связанные данные</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Что остаётся у нас</h2>
          <p className={styles.sectionText}>
            <strong>Ничего.</strong> Никаких бэкапов, метаданных или
            «обезличенных» копий. Удаление полное и окончательное.
          </p>
        </section>

        <div className={styles.contactBox}>
          <p>
            Остались вопросы? Напишите нам:{" "}
            <a href="mailto:mkabaevuk@gmail.com" className={styles.emailLink}>
              mkabaevuk@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
