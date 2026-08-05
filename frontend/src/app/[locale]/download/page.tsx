import type { Metadata } from "next";
import DownloadBody from "./_components/DownloadBody";
import { getDesktopRelease } from "@/lib/desktopRelease";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";
import { alternatesFor } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : defaultLocale;
  const t = getDictionary(resolved).download;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternatesFor(resolved, "/download"),
  };
}

export const revalidate = 300;

export default async function DownloadPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const release = await getDesktopRelease();
  return <DownloadBody release={release} locale={locale} t={dict.download} />;
}
