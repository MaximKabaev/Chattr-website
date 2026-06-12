"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
};

/**
 * Links the current page to its equivalent in each locale. The default locale
 * is served unprefixed (/privacy); others are prefixed (/en/privacy).
 */
export default function LanguageToggle({
  locale,
  className,
  itemClassName,
  activeClassName,
}: Props) {
  const pathname = usePathname() || "/";

  // Strip any non-default locale prefix to recover the canonical (default) path.
  let basePath = pathname;
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) {
      basePath = "/";
      break;
    }
    if (pathname.startsWith(`/${l}/`)) {
      basePath = pathname.slice(l.length + 1);
      break;
    }
  }

  function hrefFor(target: Locale): string {
    if (target === defaultLocale) return basePath;
    return basePath === "/" ? `/${target}` : `/${target}${basePath}`;
  }

  return (
    <div className={className}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            className={
              active && activeClassName
                ? `${itemClassName ?? ""} ${activeClassName}`.trim()
                : itemClassName
            }
            aria-current={active ? "true" : undefined}
            hrefLang={l}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
