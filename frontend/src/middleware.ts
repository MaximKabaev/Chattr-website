import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonicalize the default locale: /ru and /ru/* redirect to the unprefixed path.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(new URL(stripped, request.url));
  }

  // Non-default locale prefixes (e.g. /en, /en/...) map straight to the [locale] segment.
  const hasNonDefaultPrefix = locales.some(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  );
  if (hasNonDefaultPrefix) {
    return NextResponse.next();
  }

  // Everything else is the default locale, served unprefixed: rewrite internally
  // to /ru/... so the URL stays clean but the [locale] segment still resolves.
  const suffix = pathname === "/" ? "" : pathname;
  return NextResponse.rewrite(new URL(`/${defaultLocale}${suffix}`, request.url));
}

export const config = {
  // Skip Next internals, the API, and any path with a file extension (static assets,
  // /.well-known/apple-app-site-association, etc.).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
