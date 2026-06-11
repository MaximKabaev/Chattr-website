"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderAuthLink from "./HeaderAuthLink";
import ThemeToggle from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

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

export default function SiteHeader() {
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
        <Link href="/" className={styles.logoGroup} onClick={closeMenu}>
          <Image
            src="/app-icon.png"
            alt="Chattr"
            width={36}
            height={36}
            className={styles.headerIcon}
          />
          <span className={styles.logoText}>Chattr</span>
        </Link>

        <nav className={styles.headerNav}>
          <Link href="/privacy" className={styles.headerLink}>
            Конфиденциальность
          </Link>
          <Link href="/pricing" className={styles.headerLink}>
            Тарифы
          </Link>
          <HeaderAuthLink
            loginLabel="Войти"
            loginClassName={styles.headerLink}
            profileClassName={styles.headerProfile}
          />
          <ThemeToggle />
          <Link href="/download" className={styles.headerCta}>
            Скачать
          </Link>
        </nav>

        <div className={styles.mobileActions}>
          <Link
            href="/download"
            className={styles.headerCta}
            onClick={closeMenu}
          >
            Скачать
          </Link>
          <button
            type="button"
            className={styles.hamburger}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
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
            href="/privacy"
            className={styles.mobileLink}
            onClick={closeMenu}
          >
            Конфиденциальность
          </Link>
          <Link
            href="/pricing"
            className={styles.mobileLink}
            onClick={closeMenu}
          >
            Тарифы
          </Link>
          <div className={styles.mobileRow}>
            <HeaderAuthLink
              loginLabel="Войти"
              loginClassName={styles.mobileLink}
              profileClassName={styles.headerProfile}
            />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
