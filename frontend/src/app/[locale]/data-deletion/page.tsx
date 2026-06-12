import type { Metadata } from "next";
import Link from "next/link";
import styles from "./data-deletion.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).dataDeletion;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function DataDeletionPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.dataDeletion;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {dict.common.backHome}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>

        <section className={styles.section}>
          <h2>{t.howTitle}</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>{t.step1Title}</h3>
                <p>
                  {t.step1Before} <strong>{t.step1App}</strong> {t.step1Mid}{" "}
                  <strong>{t.step1Settings}</strong> {t.step1Mid}{" "}
                  <strong>{t.step1DeleteWord}</strong>
                  {t.step1After}
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>{t.step2Title}</h3>
                <p>
                  {t.step2Before}{" "}
                  <a
                    href="mailto:mkabaevuk@gmail.com"
                    className={styles.emailLink}
                  >
                    mkabaevuk@gmail.com
                  </a>
                  {t.step2After}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t.whatTitle}</h2>
          <ul className={styles.dataList}>
            <li>{t.whatItem1}</li>
            <li>{t.whatItem2}</li>
            <li>{t.whatItem3}</li>
            <li>{t.whatItem4}</li>
            <li>{t.whatItem5}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t.remainTitle}</h2>
          <p className={styles.sectionText}>
            <strong>{t.remainBold}</strong> {t.remainText}
          </p>
        </section>

        <div className={styles.contactBox}>
          <p>
            {t.contactBefore}{" "}
            <a href="mailto:mkabaevuk@gmail.com" className={styles.emailLink}>
              mkabaevuk@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
