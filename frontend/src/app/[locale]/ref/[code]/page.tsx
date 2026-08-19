import Image from "next/image";
import { Metadata } from "next";
import styles from "./page.module.css";
import { StoreButtons } from "../../group/[inviteCode]/StoreButtons";
import { CopyCode } from "./CopyCode";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";
import { NO_INDEX } from "@/lib/seo";
import { API_BASE } from "@/lib/api";

interface PageProps {
  params: Promise<{ locale: string; code: string }>;
}

const APP_STORE_ID = "6757166779";

// Mirrors the backend's Crockford-ish base32 alphabet loosely; anything outside
// this shape is garbage and never hits the API.
const CODE_SHAPE = /^[A-Za-z0-9]{4,16}$/;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    robots: NO_INDEX,
    other: {
      "apple-itunes-app": `app-id=${APP_STORE_ID}, app-argument=chattr://ref/${encodeURIComponent(code)}`,
    },
  };
}

interface Validation {
  valid: boolean;
  referrerName: string | null;
}

/**
 * Ask the backend whether the code exists. Returns null when the backend is
 * unreachable or errors — the page then renders without a verdict rather than
 * wrongly telling the visitor their invite is broken.
 */
async function validateCode(code: string): Promise<Validation | null> {
  if (!CODE_SHAPE.test(code)) return { valid: false, referrerName: null };
  try {
    const res = await fetch(
      `${API_BASE}/api/vpn/referrals/validate/${encodeURIComponent(code)}`,
      { next: { revalidate: 300 } },
    );
    const data = await res.json();
    if (!res.ok || data.success !== true) return null;
    return {
      valid: data.valid === true,
      referrerName: typeof data.referrer_name === "string" ? data.referrer_name : null,
    };
  } catch {
    return null;
  }
}

export default async function ReferralInvitePage({ params }: PageProps) {
  const { locale: raw, code: rawCode } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale).referral;

  const code = rawCode.toUpperCase();
  const validation = await validateCode(code);
  const invalid = validation !== null && !validation.valid;
  const referrerName = validation?.referrerName ?? null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.appIcon}
          src="/app-icon.png"
          alt="Chattr app icon"
          width={100}
          height={100}
          priority
        />
        <h1 className={styles.title}>Chattr</h1>

        {invalid ? (
          <p className={styles.message}>{t.invalid}</p>
        ) : (
          <>
            <p className={styles.message}>
              {referrerName ? `${referrerName} ${t.invitedBy}` : t.invited}
            </p>

            <p className={styles.codeLabel}>{t.codeLabel}</p>
            <CopyCode code={code} copyLabel={t.copy} copiedLabel={t.copied} />
            <p className={styles.howTo}>{t.howTo}</p>

            <a href={`chattr://ref/${encodeURIComponent(code)}`} className={styles.openButton}>
              {t.openInApp}
            </a>
          </>
        )}

        <p className={styles.hint}>{t.noApp}</p>

        <StoreButtons />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Chattr. {t.rights}</p>
      </footer>
    </div>
  );
}
