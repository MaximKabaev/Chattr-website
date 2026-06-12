import type { Metadata } from "next";
import Link from "next/link";
import styles from "../privacy/privacy.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).terms;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function TermsOfService({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.terms;
  const legal = dict.legal;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {dict.common.backHome}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.lastUpdated}>{t.lastUpdated}</p>

        <section className={styles.section}>
          <h2>{t.s1Title}</h2>
          <p>{t.s1Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s2Title}</h2>
          <p>{t.s2Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s3Title}</h2>
          <p>{t.s3Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s4Title}</h2>
          <p>{t.s4Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s5Title}</h2>
          <p>{t.s5Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s6Title}</h2>
          <p>{t.s6Intro}</p>
          <ul>
            <li>{t.s6Item1}</li>
            <li>{t.s6Item2}</li>
            <li>{t.s6Item3}</li>
            <li>{t.s6Item4}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t.s7Title}</h2>
          <p>{t.s7Intro}</p>
          <ul>
            <li>{t.s7Item1}</li>
            <li>{t.s7Item2}</li>
            <li>{t.s7Item3}</li>
          </ul>
          <p>{t.s7Outro}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s8Title}</h2>
          <p>
            {t.s8TextBefore}{" "}
            <Link href={localizedPath(locale, "/refund")} className={styles.emailLink}>
              {t.s8LinkLabel}
            </Link>
            {t.s8TextAfter}
          </p>
        </section>

        <section className={styles.section}>
          <h2>{t.s9Title}</h2>
          <p>{t.s9Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s10Title}</h2>
          <p>{t.s10Text}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.s11Title}</h2>
          <p>
            {legal.ipName}
            <br />
            {legal.regNumbers}
            <br />
            {legal.emailLabel}{" "}
            <a href="mailto:mkabaevuk@gmail.com" className={styles.emailLink}>
              mkabaevuk@gmail.com
            </a>
            <br />
            {legal.phoneLabel}{" "}
            <a href="tel:+79261011107" className={styles.emailLink}>
              {legal.phone}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
