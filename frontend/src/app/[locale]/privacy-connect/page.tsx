import type { Metadata } from "next";
import Link from "next/link";
import styles from "../privacy/privacy.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).privacyConnect;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function PrivacyConnect({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.privacyConnect;

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
          <h2>{t.noLogsTitle}</h2>
          <p>{t.noLogsText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.collectionTitle}</h2>
          <p>{t.collectionText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.paymentTitle}</h2>
          <p>{t.paymentText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.usageTitle}</h2>
          <p>{t.usageText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.thirdPartyTitle}</h2>
          <p>{t.thirdPartyText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.retentionTitle}</h2>
          <p>{t.retentionText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.securityTitle}</h2>
          <p>{t.securityText}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.rightsTitle}</h2>
          <p>{t.rightsText}</p>
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
