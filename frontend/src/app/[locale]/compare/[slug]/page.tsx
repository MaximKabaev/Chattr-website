import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../compare.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales, localizedPath } from "@/i18n/config";
import { SITE_URL, absoluteUrl, alternatesFor } from "@/lib/seo";
import { COMPARISON_KEYS, keyForSlug, pathFor, slugFor } from "@/lib/compare";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    COMPARISON_KEYS.map((key) => ({ locale, slug: slugFor(key) })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = isLocale(locale) ? locale : defaultLocale;
  const key = keyForSlug(slug);
  if (!key) return {};

  const item = getDictionary(resolved).compare.items[key];
  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: alternatesFor(resolved, pathFor(key)),
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const key = keyForSlug(slug);
  if (!key) notFound();

  const dict = getDictionary(locale);
  const t = dict.compare;
  const item = t.items[key];
  const pageUrl = absoluteUrl(locale, pathFor(key));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: locale,
        mainEntity: item.faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Chattr",
            item: absoluteUrl(locale, "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.indexMetaTitle,
            item: absoluteUrl(locale, "/compare"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.metaTitle,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: item.metaTitle,
        description: item.metaDescription,
        inLanguage: locale,
        mainEntityOfPage: pageUrl,
        about: [
          { "@type": "SoftwareApplication", name: "Chattr", "@id": `${SITE_URL}/#app` },
          { "@type": "SoftwareApplication", name: item.name },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/compare")} className={styles.backLink}>
          {t.backToCompare}
        </Link>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t.indexEyebrow}
          </span>
          <h1 className={styles.title}>
            {item.title} <span className={styles.titleAccent}>{item.name}</span>
          </h1>
          <p className={styles.intro}>{item.intro}</p>
        </header>

        {/* The short answer sits high on the page on purpose: it is the passage
            search and answer engines quote when asked to compare the two apps. */}
        <section className={styles.shortAnswer} aria-label={t.shortAnswerLabel}>
          <span className={styles.shortAnswerLabel}>{t.shortAnswerLabel}</span>
          <p className={styles.shortAnswerText}>{item.shortAnswer}</p>
        </section>

        <section className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t.tableHeadFeature}</th>
                <th scope="col">Chattr</th>
                <th scope="col">{item.name}</th>
              </tr>
            </thead>
            <tbody>
              {item.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td className={styles.cellChattr}>{row.chattr}</td>
                  <td>{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.chooseGrid}>
          <div className={`${styles.chooseCard} ${styles.chooseCardChattr}`}>
            <h2 className={styles.chooseTitle}>{t.chooseChattrTitle}</h2>
            <ul className={styles.chooseList}>
              {item.chooseChattr.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className={styles.chooseCard}>
            <h2 className={styles.chooseTitle}>
              {t.chooseOtherTitle.replace("{other}", item.name)}
            </h2>
            <ul className={styles.chooseList}>
              {item.chooseOther.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2 className={styles.faqHeading}>{t.faqTitle}</h2>
          <div className={styles.faqList}>
            {item.faq.map((entry) => (
              <details key={entry.q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{entry.q}</span>
                  <svg
                    className={styles.faqChevron}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <p className={styles.faqAnswer}>{entry.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
          <p className={styles.ctaDesc}>{t.ctaDesc}</p>
          <Link href={localizedPath(locale, "/download")} className={styles.ctaButton}>
            {t.ctaButton}
          </Link>
        </section>

        <p className={styles.disclaimer}>{t.disclaimer}</p>
      </main>
    </div>
  );
}
