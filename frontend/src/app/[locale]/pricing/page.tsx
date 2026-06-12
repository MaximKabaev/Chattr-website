import type { Metadata } from "next";
import Link from "next/link";
import styles from "./pricing.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).pricing;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function PricingPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.pricing;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {dict.common.backHome}
        </Link>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t.eyebrow}
          </span>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </header>

        <div className={styles.plans}>
          <div className={styles.planCard}>
            <div className={styles.planHead}>
              <h3 className={styles.planName}>{t.plan1Name}</h3>
              <p className={styles.planSub}>{t.plan1Sub}</p>
            </div>
            <div className={styles.planPrice}>
              <span className={styles.amount}>150</span>
              <span className={styles.currency}>₽</span>
              <span className={styles.per}>{t.perMonth}</span>
            </div>
            <p className={styles.planFootnote}>{t.plan1Footnote}</p>
          </div>

          <div className={`${styles.planCard} ${styles.planCardPopular}`}>
            <div className={styles.planBadge}>{t.plan2Badge}</div>
            <div className={styles.planHead}>
              <h3 className={styles.planName}>{t.plan2Name}</h3>
              <p className={styles.planSub}>{t.plan2Sub}</p>
            </div>
            <div className={styles.planPrice}>
              <span className={styles.amount}>125</span>
              <span className={styles.currency}>₽</span>
              <span className={styles.per}>{t.perMonth}</span>
            </div>
            <p className={styles.planFootnote}>{t.plan2Footnote}</p>
          </div>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {t.trust1}
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t.trust2}
          </div>
          <div className={styles.trustItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {t.trust3}
          </div>
        </div>

        <section className={styles.included}>
          <h2 className={styles.includedTitle}>{t.includedTitle}</h2>
          <ul className={styles.includedList}>
            <li className={styles.includedItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <strong>{t.included1Title}</strong>
                <span>{t.included1Text}</span>
              </div>
            </li>
            <li className={styles.includedItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <strong>{t.included2Title}</strong>
                <span>{t.included2Text}</span>
              </div>
            </li>
            <li className={styles.includedItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <strong>{t.included3Title}</strong>
                <span>{t.included3Text}</span>
              </div>
            </li>
          </ul>
        </section>

        <div className={styles.note}>
          <p>
            {t.noteBefore}{" "}
            <Link href={localizedPath(locale, "/account")} className={styles.link}>
              {t.noteAccountLink}
            </Link>
            {t.noteAfter}
          </p>
          <p>
            {t.noteMoreBefore}{" "}
            <Link href={localizedPath(locale, "/terms")} className={styles.link}>
              {t.noteTermsLink}
            </Link>
            {" · "}
            <Link href={localizedPath(locale, "/refund")} className={styles.link}>
              {t.noteRefundLink}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
