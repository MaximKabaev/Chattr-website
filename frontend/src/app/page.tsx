import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/chattr/id6757166779";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.arcchat.chattr";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoGroup}>
            <Image
              src="/app-icon.png"
              alt="Chattr"
              width={36}
              height={36}
              className={styles.headerIcon}
            />
            <span className={styles.logoText}>Chattr</span>
          </div>
          <nav className={styles.headerNav}>
            <Link href="/privacy" className={styles.headerLink}>
              Конфиденциальность
            </Link>
            <a href={APP_STORE_URL} className={styles.headerCta}>
              Скачать
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroContent}>
            <Image
              className={styles.appIcon}
              src="/app-icon.png"
              alt="Chattr app icon"
              width={140}
              height={140}
              priority
            />
            <h1 className={styles.title}>
              Общение без
              <br />
              <span className={styles.titleAccent}>компромиссов</span>
            </h1>
            <p className={styles.tagline}>
              Chattr — мессенджер, созданный для тех, кто ценит приватность.
              Никакого сбора данных. Никакой рекламы. Просто безопасное общение.
            </p>
            <div className={styles.heroCtas}>
              <a href={APP_STORE_URL} className={styles.primaryCta}>
                <svg
                  className={styles.appleIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Скачать в App Store
              </a>
              <a href={PLAY_STORE_URL} className={styles.primaryCta}>
                <svg
                  className={styles.playIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
                </svg>
                Скачать в Google Play
              </a>
              <Link href="/support" className={styles.secondaryCta}>
                Связаться с нами
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.features}>
          <div className={styles.featuresInner}>
            <h2 className={styles.sectionTitle}>Почему Chattr?</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Полная приватность</h3>
                <p className={styles.featureDesc}>
                  Ваши сообщения принадлежат только вам. Мы не читаем, не храним и не анализируем ваши данные.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Без сбора данных</h3>
                <p className={styles.featureDesc}>
                  Ноль аналитики, ноль трекеров, ноль рекламы. Мы не знаем, кто вы — и так и должно быть.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Простое общение</h3>
                <p className={styles.featureDesc}>
                  Чистый, быстрый интерфейс без лишнего. Мессенджер, который не отвлекает от главного.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Свобода общения</h3>
                <p className={styles.featureDesc}>
                  Создан для надёжной связи в любых условиях. Ваш голос не будет заглушён.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Готовы к приватному общению?</h2>
            <p className={styles.ctaDesc}>
              Скачайте Chattr и начните общаться безопасно уже сегодня.
            </p>
            <div className={styles.ctaCtas}>
              <a href={APP_STORE_URL} className={styles.primaryCta}>
                <svg
                  className={styles.appleIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Скачать в App Store
              </a>
              <a href={PLAY_STORE_URL} className={styles.primaryCta}>
                <svg
                  className={styles.playIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
                </svg>
                Скачать в Google Play
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Image
              src="/app-icon.png"
              alt="Chattr"
              width={28}
              height={28}
              className={styles.footerIcon}
            />
            <span className={styles.footerLogo}>Chattr</span>
          </div>
          <nav className={styles.footerNav}>
            <Link href="/privacy" className={styles.footerLink}>
              Конфиденциальность
            </Link>
            <Link href="/support" className={styles.footerLink}>
              Поддержка
            </Link>
            <Link href="/data-deletion" className={styles.footerLink}>
              Удаление данных
            </Link>
            <a href={APP_STORE_URL} className={styles.footerLink}>
              App Store
            </a>
            <a href={PLAY_STORE_URL} className={styles.footerLink}>
              Google Play
            </a>
          </nav>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Chattr. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
