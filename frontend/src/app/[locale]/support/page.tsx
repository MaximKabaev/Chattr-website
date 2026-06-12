import type { Metadata } from "next";
import Link from "next/link";
import styles from "./support.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).support;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function SupportPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.support;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {dict.common.backHome}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>

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
          <p className={styles.emailLabel}>{t.emailLabel}</p>
          <p className={styles.email}>mkabaevuk@gmail.com</p>
          <a href="mailto:mkabaevuk@gmail.com" className={styles.emailButton}>
            {t.emailButton}
          </a>
        </div>

        <div className={styles.note}>
          <p>{t.note}</p>
        </div>
      </main>
    </div>
  );
}
