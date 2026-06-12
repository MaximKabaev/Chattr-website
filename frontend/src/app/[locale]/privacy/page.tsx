import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).privacy;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function PrivacyPolicy({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.privacy;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {dict.common.backHome}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.lastUpdated}>{t.lastUpdated}</p>

        <section className={styles.section}>
          <h2>{t.introTitle}</h2>
          <p>{t.introText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.collectionTitle}</h2>
          <p>{t.collectionText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.storageTitle}</h2>
          <p>{t.storageText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.thirdPartyTitle}</h2>
          <p>{t.thirdPartyText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.changesTitle}</h2>
          <p>{t.changesText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.contactTitle}</h2>
          <p>
            {t.contactText}{" "}
            <a href="mailto:mkabaevuk@gmail.com" className={styles.emailLink}>
              mkabaevuk@gmail.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
