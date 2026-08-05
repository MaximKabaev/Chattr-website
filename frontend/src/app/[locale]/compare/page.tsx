import type { Metadata } from "next";
import Link from "next/link";
import styles from "./compare.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";
import { alternatesFor } from "@/lib/seo";
import { COMPARISON_KEYS, pathFor } from "@/lib/compare";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : defaultLocale;
  const t = getDictionary(resolved).compare;
  return {
    title: t.indexMetaTitle,
    description: t.indexMetaDescription,
    alternates: alternatesFor(resolved, "/compare"),
  };
}

export default async function CompareIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.compare;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {dict.common.backHome}
        </Link>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t.indexEyebrow}
          </span>
          <h1 className={styles.title}>
            {t.indexTitle} <span className={styles.titleAccent}>{t.indexTitleAccent}</span>
          </h1>
          <p className={styles.intro}>{t.indexSubtitle}</p>
        </header>

        <div className={styles.cardGrid}>
          {COMPARISON_KEYS.map((key) => {
            const item = t.items[key];
            return (
              <Link
                key={key}
                href={localizedPath(locale, pathFor(key))}
                className={styles.card}
              >
                <h2 className={styles.cardTitle}>Chattr vs {item.name}</h2>
                <p className={styles.cardDesc}>{item.shortAnswer}</p>
                <span className={styles.cardCta}>{t.cardCta} &rarr;</span>
              </Link>
            );
          })}
        </div>

        <p className={styles.disclaimer}>{t.disclaimer}</p>
      </main>
    </div>
  );
}
