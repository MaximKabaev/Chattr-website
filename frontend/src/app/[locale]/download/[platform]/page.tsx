import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DownloadBody from "../_components/DownloadBody";
import { getDesktopRelease } from "@/lib/desktopRelease";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";

export const revalidate = 300;

const VALID = new Set(["windows", "macos"]);

interface Params {
  locale: string;
  platform: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, platform } = await params;
  const t = getDictionary(isLocale(locale) ? locale : defaultLocale).download;
  const label = platform === "windows" ? "Windows" : "macOS";
  return {
    title: t.platformMetaTitle.replace("{platform}", label),
    description: t.platformMetaDescription.replace("{platform}", label),
  };
}

export default async function PlatformDownloadPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale: raw, platform } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  if (!VALID.has(platform)) redirect(localizedPath(locale, "/download"));

  const dict = getDictionary(locale);
  const release = await getDesktopRelease();
  return <DownloadBody release={release} locale={locale} t={dict.download} />;
}
