import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SiteHeader from "./_components/SiteHeader";
import ScrollReset from "./_components/ScrollReset";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleParams = { locale: string };

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = resolveLocale(locale);
  const dict = getDictionary(resolved);
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    applicationName: "Chattr",
    icons: {
      icon: "/app-icon.png",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      siteName: "Chattr",
      locale: resolved === "ru" ? "ru_RU" : "en_US",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: absoluteUrl(resolved, "/"),
      images: [{ url: "/app-icon.png", width: 512, height: 512, alt: "Chattr" }],
    },
    twitter: {
      card: "summary",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: ["/app-icon.png"],
    },
  };
}

const themeInitScript = `(function(){try{var s=localStorage.getItem('chattr_theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScrollReset />
        <SiteHeader locale={locale} nav={dict.nav} theme={dict.theme} />
        {children}
      </body>
    </html>
  );
}
