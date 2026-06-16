import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

const APP_STORE_URL = "https://apps.apple.com/app/chattr/id6757166779";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.arcchat.chattr";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
    </svg>
  );
}

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M3 5.479l7.377-1.005.003 7.116-7.373.042L3 5.479zm7.374 6.929l.006 7.123-7.373-1.014v-6.165l7.367.056zm.895-8.065L21.05 3v8.584l-9.781.078V4.343zm9.783 8.221l-.002 8.546-9.781-1.38-.014-7.18 9.797.014z" />
    </svg>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.home;

  const macDownloadUrl = localizedPath(locale, "/download/macos");
  const windowsDownloadUrl = localizedPath(locale, "/download/windows");

  return (
    <div className={styles.page}>
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                {t.hero.eyebrow}
              </span>
              <h1 className={styles.title}>
                {t.hero.titleLine1}
                <br />
                <span className={styles.titleAccent}>{t.hero.titleAccent}</span>
              </h1>
              <p className={styles.tagline}>{t.hero.tagline}</p>

              <div className={styles.mobileButtons}>
                <a href={APP_STORE_URL} className={styles.primaryCta}>
                  <AppleGlyph />
                  {t.hero.appStore}
                </a>
                <a href={PLAY_STORE_URL} className={styles.primaryCta}>
                  <PlayGlyph />
                  {t.hero.googlePlay}
                </a>
              </div>

              <div className={styles.desktopRow}>
                <span className={styles.desktopRowLabel}>{t.hero.alsoFor}</span>
                <a href={macDownloadUrl} className={styles.pillCta}>
                  <AppleGlyph />
                  Mac
                </a>
                <a href={windowsDownloadUrl} className={styles.pillCta}>
                  <WindowsGlyph />
                  Windows
                </a>
              </div>
            </div>

            {/* Chat preview mockup */}
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.chatCard}>
                <div className={styles.chatHeader}>
                  <div className={styles.chatAvatar}>{t.preview.name.charAt(0)}</div>
                  <div className={styles.chatHeaderText}>
                    <div className={styles.chatName}>{t.preview.name}</div>
                    <div className={styles.chatStatus}>
                      <span className={styles.statusDot} />
                      {t.preview.online}
                    </div>
                  </div>
                  <div className={styles.chatLock}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                </div>
                <div className={styles.chatBody}>
                  <div className={`${styles.bubble} ${styles.bubbleIn}`}>
                    {t.preview.msg1}
                  </div>
                  <div className={`${styles.bubble} ${styles.bubbleOut}`}>
                    {t.preview.msg2}
                  </div>
                  <div className={`${styles.bubble} ${styles.bubbleIn}`}>
                    {t.preview.msg3}
                  </div>
                  <div className={`${styles.bubble} ${styles.bubbleOut} ${styles.bubbleSending}`}>
                    {t.preview.msg4}
                  </div>
                  <div className={`${styles.typingBubble} ${styles.typingBubbleDelayed}`}>
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </div>
                </div>
              </div>
              <div className={styles.floatBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>{t.preview.badge}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className={styles.trustStrip}>
          <div className={styles.trustInner}>
            <span className={styles.trustItem}>
              <span className={styles.trustDot} />
              {t.trust.noData}
            </span>
            <span className={styles.trustItem}>
              <span className={styles.trustDot} />
              {t.trust.noAds}
            </span>
            <span className={styles.trustItem}>
              <span className={styles.trustDot} />
              {t.trust.noTrackers}
            </span>
            <span className={styles.trustItem}>
              <span className={styles.trustDot} />
              {t.trust.anonymous}
            </span>
          </div>
        </section>

        {/* Features — bento grid */}
        <section className={styles.features}>
          <div className={styles.featuresInner}>
            <span className={styles.featuresEyebrow}>{t.features.eyebrow}</span>
            <h2 className={styles.sectionTitle}>
              {t.features.title}{" "}
              <span className={styles.sectionTitleAccent}>{t.features.titleAccent}</span>
            </h2>
            <div className={styles.bentoGrid}>
              <div className={`${styles.bentoCard} ${styles.bentoBig}`}>
                <div className={styles.bentoBigVisual}>
                  <div className={styles.miniBubbleIn}>•••</div>
                  <div className={styles.miniBubbleOut}>•••</div>
                  <div className={styles.miniBubbleIn}>•••</div>
                </div>
                <div className={styles.bentoBody}>
                  <h3 className={styles.bentoTitle}>{t.features.card1Title}</h3>
                  <p className={styles.bentoDesc}>{t.features.card1Desc}</p>
                </div>
              </div>

              <div className={`${styles.bentoCard} ${styles.bentoSmall}`}>
                <div className={`${styles.bentoIcon} ${styles.bentoIconOutline}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className={styles.bentoTitle}>{t.features.card2Title}</h3>
                <p className={styles.bentoDesc}>{t.features.card2Desc}</p>
              </div>

              <div className={`${styles.bentoCard} ${styles.bentoSmall}`}>
                <div className={`${styles.bentoIcon} ${styles.bentoIconOutline}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                    <polyline points="13 2 13 13 19 13 11 22 11 11 5 11 13 2" />
                  </svg>
                </div>
                <h3 className={styles.bentoTitle}>{t.features.card3Title}</h3>
                <p className={styles.bentoDesc}>{t.features.card3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section id="download" className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaBubbleAccent} />
            <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
            <p className={styles.ctaDesc}>{t.cta.desc}</p>
            <div className={styles.ctaCtas}>
              <a href={APP_STORE_URL} className={styles.primaryCta}>
                <AppleGlyph />
                App Store
              </a>
              <a href={PLAY_STORE_URL} className={styles.primaryCta}>
                <PlayGlyph />
                Google Play
              </a>
              <a href={macDownloadUrl} className={styles.pillCta}>
                <AppleGlyph />
                Mac
              </a>
              <a href={windowsDownloadUrl} className={styles.pillCta}>
                <WindowsGlyph />
                Windows
              </a>
            </div>
            <Link href={localizedPath(locale, "/support")} className={styles.ctaSupport}>
              {t.cta.support}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogoRow}>
                <Image
                  src="/app-icon.png"
                  alt="Chattr"
                  width={48}
                  height={48}
                  className={styles.footerIcon}
                />
                <span className={styles.footerLogo}>Chattr</span>
              </div>
              <p className={styles.footerTagline}>{dict.footer.tagline}</p>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>{dict.footer.contactsHeading}</h4>
              <a href="mailto:mkabaevuk@gmail.com" className={styles.footerContact}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                mkabaevuk@gmail.com
              </a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>{dict.footer.legalHeading}</h4>
              <Link href={localizedPath(locale, "/privacy")} className={styles.footerLink}>
                {dict.footer.privacy}
              </Link>
              <Link href={localizedPath(locale, "/privacy-connect")} className={styles.footerLink}>
                {dict.footer.privacyConnect}
              </Link>
              <Link href={localizedPath(locale, "/terms")} className={styles.footerLink}>
                {dict.footer.terms}
              </Link>
              <Link href={localizedPath(locale, "/refund")} className={styles.footerLink}>
                {dict.footer.refund}
              </Link>
              <Link href={localizedPath(locale, "/data-deletion")} className={styles.footerLink}>
                {dict.footer.dataDeletion}
              </Link>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>{dict.footer.navHeading}</h4>
              <Link href={localizedPath(locale, "/pricing")} className={styles.footerLink}>
                {dict.footer.pricing}
              </Link>
              <Link href={localizedPath(locale, "/account")} className={styles.footerLink}>
                {dict.footer.account}
              </Link>
              <a href={APP_STORE_URL} className={styles.footerLink}>
                App Store
              </a>
              <a href={PLAY_STORE_URL} className={styles.footerLink}>
                Google Play
              </a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Chattr. {dict.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
