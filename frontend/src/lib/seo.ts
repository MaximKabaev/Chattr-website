import type { Metadata } from "next";
import { defaultLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { COMPARISON_KEYS, pathFor } from "@/lib/compare";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://chattr-app.com";

/**
 * Public routes that should be crawled and listed in the sitemap.
 *
 * Deliberately a function rather than a top-level array: spreading the imported
 * COMPARISON_KEYS at module-evaluation time races with Turbopack's dev chunk
 * initialisation and throws "COMPARISON_KEYS is not defined". Calling it from
 * sitemap() defers the read until the module graph is fully initialised.
 */
export function indexablePaths(): string[] {
  return [
    "/",
    "/pricing",
    "/download",
    "/download/windows",
    "/download/macos",
    "/compare",
    ...COMPARISON_KEYS.map(pathFor),
    "/privacy",
    "/terms",
    "/refund",
    "/support",
    "/data-deletion",
  ];
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/**
 * Canonical + hreflang for a page. Every locale variant points at the same
 * canonical set, so Google and Yandex treat /privacy and /en/privacy as one
 * page in two languages rather than duplicates.
 */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(defaultLocale, path);

  return { canonical: absoluteUrl(locale, path), languages };
}

/** Pages that carry per-user or transactional state must stay out of the index. */
export const NO_INDEX: Metadata["robots"] = {
  index: false,
  follow: true,
};
