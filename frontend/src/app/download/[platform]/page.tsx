import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DownloadBody from "../_components/DownloadBody";
import { getDesktopRelease } from "../../../lib/desktopRelease";

export const revalidate = 300;

const VALID = new Set(["windows", "macos"]);

interface Params {
  platform: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { platform } = await params;
  const label = platform === "windows" ? "Windows" : "macOS";
  return {
    title: `Скачать Chattr для ${label}`,
    description: `Скачайте Chattr для ${label} — приватный VPN-клиент с автоматическими обновлениями.`,
  };
}

export default async function PlatformDownloadPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { platform } = await params;
  if (!VALID.has(platform)) redirect("/download");

  const release = await getDesktopRelease();
  return (
    <DownloadBody
      release={release}
      defaultPlatform={platform as "windows" | "macos"}
    />
  );
}
