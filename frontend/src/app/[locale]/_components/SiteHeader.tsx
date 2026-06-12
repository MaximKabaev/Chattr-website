"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderAuthLink from "./HeaderAuthLink";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import styles from "./SiteHeader.module.css";
import { localizedPath, type Locale } from "@/i18n/config";

type NavStrings = {
  logoAlt: string;
  privacy: string;
  pricing: string;
  login: string;
  download: string;
  account: string;
  menuOpen: string;
  menuClose: string;
};

type ThemeStrings = { toggle: string; toLight: string; toDark: string };

type Props = {
  locale: Locale;
  nav: NavStrings;
  theme: ThemeStrings;
};

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

export default function SiteHeader({ locale, nav, theme }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link
          href={localizedPath(locale, "/")}
          className={styles.logoGroup}
          onClick={closeMenu}
        >
          <Image
            src="/app-icon.png"
            alt={nav.logoAlt}
            width={36}
            height={36}
            className={styles.headerIcon}
          />
          <span className={styles.logoText}>Chattr</span>
        </Link>

        <nav className={styles.headerNav}>
          <Link
            href={localizedPath(locale, "/privacy")}
            className={styles.headerLink}
          >
            {nav.privacy}
          </Link>
          <Link
            href={localizedPath(locale, "/pricing")}
            className={styles.headerLink}
          >
            {nav.pricing}
          </Link>
          <HeaderAuthLink
            locale={locale}
            loginLabel={nav.login}
            accountLabel={nav.account}
            loginClassName={styles.headerLink}
            profileClassName={styles.headerProfile}
          />
          <LanguageToggle
            locale={locale}
            className={styles.langToggle}
            itemClassName={styles.langItem}
            activeClassName={styles.langActive}
          />
          <ThemeToggle labels={theme} />
          <Link
            href={localizedPath(locale, "/download")}
            className={styles.headerCta}
          >
            {nav.download}
          </Link>
        </nav>

        <div className={styles.mobileActions}>
          <Link
            href={localizedPath(locale, "/download")}
            className={styles.headerCta}
            onClick={closeMenu}
          >
            {nav.download}
          </Link>
          <button
            type="button"
            className={styles.hamburger}
            aria-label={open ? nav.menuClose : nav.menuOpen}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div id="site-mobile-menu" className={styles.mobilePanel}>
          <Link
            href={localizedPath(locale, "/privacy")}
            className={styles.mobileLink}
            onClick={closeMenu}
          >
            {nav.privacy}
          </Link>
          <Link
            href={localizedPath(locale, "/pricing")}
            className={styles.mobileLink}
            onClick={closeMenu}
          >
            {nav.pricing}
          </Link>
          <div className={styles.mobileRow}>
            <HeaderAuthLink
              locale={locale}
              loginLabel={nav.login}
              accountLabel={nav.account}
              loginClassName={styles.mobileLink}
              profileClassName={styles.headerProfile}
            />
            <div className={styles.mobileRow}>
              <LanguageToggle
                locale={locale}
                className={styles.langToggle}
                itemClassName={styles.langItem}
                activeClassName={styles.langActive}
              />
              <ThemeToggle labels={theme} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
