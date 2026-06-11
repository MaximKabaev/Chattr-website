import type { Metadata } from "next";
import DownloadBody from "./_components/DownloadBody";
import { getDesktopRelease } from "../../lib/desktopRelease";

export const metadata: Metadata = {
  title: "Скачать Chattr · Для Windows и macOS",
  description:
    "Скачайте Chattr для Windows и macOS. Автоматические обновления, защищённое подключение.",
};

export const revalidate = 300;

export default async function DownloadPage() {
  const release = await getDesktopRelease();
  return <DownloadBody release={release} />;
}
