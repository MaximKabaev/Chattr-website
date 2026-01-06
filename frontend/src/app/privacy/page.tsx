import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata = {
  title: "Политика конфиденциальности - Chattr",
  description: "Политика конфиденциальности приложения Chattr для iOS",
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <h1 className={styles.title}>Политика конфиденциальности</h1>
        <p className={styles.lastUpdated}>Последнее обновление: Январь 2025</p>

        <section className={styles.section}>
          <h2>Введение</h2>
          <p>
            Chattr (&quot;мы&quot;, &quot;наш&quot; или &quot;приложение&quot;) стремится защитить вашу конфиденциальность.
            Данная Политика конфиденциальности объясняет, как мы обрабатываем вашу информацию при использовании нашего приложения для iOS.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Сбор информации</h2>
          <p>
            Chattr разработан с учётом конфиденциальности. Мы не собираем, не храним и не передаём
            какие-либо персональные данные на внешние серверы. Все ваши данные остаются на вашем устройстве.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Хранение данных</h2>
          <p>
            Любые данные, которые вы создаёте в приложении, хранятся локально на вашем устройстве.
            Мы не имеем доступа к этим данным, и они не передаются третьим лицам.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Сторонние сервисы</h2>
          <p>
            Chattr не использует сторонние сервисы аналитики, рекламы или отслеживания.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Изменения в политике</h2>
          <p>
            Мы можем время от времени обновлять данную Политику конфиденциальности.
            Любые изменения будут отражены на этой странице с указанием обновлённой даты.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Связаться с нами</h2>
          <p>
            Если у вас есть вопросы по данной Политике конфиденциальности, свяжитесь с нами:{" "}
            <a href="mailto:mkabaevuk@gmail.com" className={styles.emailLink}>
              mkabaevuk@gmail.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
