import Link from "next/link";
import styles from "./pricing.module.css";

export const metadata = {
  title: "Chattr Pro",
  description: "Подписка Chattr Pro. Поддержите развитие Chattr.",
};

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Chattr Pro
          </span>
          <h1 className={styles.title}>Поддержите Chattr</h1>
          <p className={styles.subtitle}>
            Подписка помогает нам развивать Chattr без инвесторов и рекламы.
            Выберите план, отменить можно в любой момент.
          </p>
        </header>

        <div className={styles.plans}>
          <div className={styles.planCard}>
            <div className={styles.planHead}>
              <h3 className={styles.planName}>1 месяц</h3>
              <p className={styles.planSub}>Без обязательств</p>
            </div>
            <div className={styles.planPrice}>
              <span className={styles.amount}>150</span>
              <span className={styles.currency}>₽</span>
              <span className={styles.per}>/мес</span>
            </div>
            <p className={styles.planFootnote}>Списание раз в месяц</p>
          </div>

          <div className={`${styles.planCard} ${styles.planCardPopular}`}>
            <div className={styles.planBadge}>Выгоднее на 17%</div>
            <div className={styles.planHead}>
              <h3 className={styles.planName}>12 месяцев</h3>
              <p className={styles.planSub}>Рекомендуем</p>
            </div>
            <div className={styles.planPrice}>
              <span className={styles.amount}>125</span>
              <span className={styles.currency}>₽</span>
              <span className={styles.per}>/мес</span>
            </div>
            <p className={styles.planFootnote}>
              1 500 ₽ списываются раз в год
            </p>
          </div>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Защищённая оплата
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Отмена в любой момент
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Без скрытых платежей
          </div>
        </div>

        <section className={styles.included}>
          <h2 className={styles.includedTitle}>Что входит</h2>
          <ul className={styles.includedList}>
            <li className={styles.includedItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <strong>Поддержка независимого мессенджера</strong>
                <span>
                  Chattr развивается без инвесторов и рекламы. Подписка
                  позволяет нам продолжать.
                </span>
              </div>
            </li>
            <li className={styles.includedItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <strong>Приоритетная поддержка</strong>
                <span>
                  Ваши обращения обрабатываются в первую очередь, напрямую
                  командой разработки.
                </span>
              </div>
            </li>
            <li className={styles.includedItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <strong>Автоматическое продление</strong>
                <span>
                  Подписка продлевается сама. Отменить можно в один клик в
                  разделе «Управление подпиской».
                </span>
              </div>
            </li>
          </ul>
        </section>

        <div className={styles.note}>
          <p>
            Оплата производится в рублях через защищённый платёжный шлюз.
            Управляйте подпиской в разделе{" "}
            <Link href="/account" className={styles.link}>
              «Управление подпиской»
            </Link>
            .
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
