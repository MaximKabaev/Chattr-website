import Link from "next/link";
import styles from "./data-deletion.module.css";

export const metadata = {
  title: "Удаление данных — Chattr",
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
          <strong>Chattr</strong> уважает ваше право на удаление персональных
          данных. Ниже описано, как вы можете удалить свои данные из приложения.
        </p>

        <section className={styles.section}>
          <h2>Как удалить данные</h2>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Через настройки приложения</h3>
                <p>
                  Откройте <strong>Chattr</strong>, перейдите в{" "}
                  <strong>Настройки</strong> и выберите{" "}
                  <strong>Удалить аккаунт</strong>. Все ваши данные будут
                  безвозвратно удалены.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Если вы потеряли доступ к аккаунту</h3>
                <p>
                  Если вы не можете войти в приложение, свяжитесь с нашей
                  поддержкой по адресу{" "}
                  <a
                    href="mailto:mkabaevuk@gmail.com"
                    className={styles.emailLink}
                  >
                    mkabaevuk@gmail.com
                  </a>
                  . Мы поможем вам удалить ваш аккаунт и все связанные данные.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Какие данные удаляются</h2>
          <p className={styles.sectionText}>
            При удалении аккаунта <strong>все</strong> ваши данные удаляются
            полностью и безвозвратно. Это включает:
          </p>
          <ul className={styles.dataList}>
            <li>Профиль и информация аккаунта</li>
            <li>Все сообщения и история переписок</li>
            <li>Медиафайлы (фото, видео, документы)</li>
            <li>Контакты и списки чатов</li>
            <li>Все прочие данные, связанные с вашим аккаунтом</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Какие данные сохраняются</h2>
          <p className={styles.sectionText}>
            <strong>Никакие.</strong> После удаления аккаунта мы не храним
            никаких ваших персональных данных. Удаление является полным и
            необратимым.
          </p>
        </section>

        <div className={styles.contactBox}>
          <p>
            Есть вопросы? Свяжитесь с нами:{" "}
            <a href="mailto:mkabaevuk@gmail.com" className={styles.emailLink}>
              mkabaevuk@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
