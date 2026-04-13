import Link from "next/link";
import styles from "./pricing.module.css";

export const metadata = {
  title: "Chattr Pro",
  description: "Подписка Chattr Pro — поддержите развитие Chattr",
};

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <h1 className={styles.title}>Chattr Pro</h1>
        <p className={styles.subtitle}>
          Поддержите развитие безопасного и приватного мессенджера.
          Выберите подходящий план.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.plan}>1 месяц</h3>
            <div className={styles.price}>
              150 <span className={styles.currency}>₽</span>
            </div>
            <p className={styles.period}>в месяц</p>
            <ul className={styles.features}>
              <li>Поддержка развития Chattr</li>
              <li>Приоритетная поддержка</li>
              <li>Автоматическое продление</li>
            </ul>
          </div>

          <div className={`${styles.card} ${styles.cardPopular}`}>
            <div className={styles.badge}>Выгодно</div>
            <h3 className={styles.plan}>12 месяцев</h3>
            <div className={styles.price}>
              1 500 <span className={styles.currency}>₽</span>
            </div>
            <p className={styles.period}>в год — 125 ₽/мес</p>
            <ul className={styles.features}>
              <li>Поддержка развития Chattr</li>
              <li>Приоритетная поддержка</li>
              <li>Автоматическое продление</li>
              <li>Экономия 17%</li>
            </ul>
          </div>
        </div>

        <div className={styles.note}>
          <p>
            Подписка оформляется на сайте Chattr. Оплата производится в
            рублях. Подписка продлевается автоматически — вы можете отменить
            её в любое время до начала нового периода.
          </p>
          <p>
            Подробнее:{" "}
            <Link href="/terms" className={styles.link}>
              Условия использования
            </Link>
            {" · "}
            <Link href="/refund" className={styles.link}>
              Политика возврата
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
