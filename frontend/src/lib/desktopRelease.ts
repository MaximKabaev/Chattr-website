import { parse } from "yaml";

/**
 * Where the electron-updater feed lives. nginx on the VPS serves this
 * directory directly; the Next.js app only fetches the YAML manifests
 * server-side to surface the current version on the download page.
 *
 * Override per-environment via NEXT_PUBLIC_DESKTOP_FEED_URL when needed
 * (staging, local testing against a tunnelled VPS, etc.).
 */
export const DESKTOP_FEED_URL =
  process.env.NEXT_PUBLIC_DESKTOP_FEED_URL || "https://chattr-app.com/desktop";

export type DesktopAsset = {
  url: string;
  filename: string;
  sizeBytes: number;
  sha512: string;
};

export type DesktopRelease = {
  version: string;
  releasedAt: string | null;
  windows: DesktopAsset | null;
  macArm64: DesktopAsset | null;
  macIntel: DesktopAsset | null;
};

interface ElectronYmlFile {
  url: string;
  sha512: string;
  size: number;
}

interface ElectronYml {
  version?: string;
  files?: ElectronYmlFile[];
  releaseDate?: string;
}

async function fetchYml(
  name: "latest.yml" | "latest-mac.yml"
): Promise<ElectronYml | null> {
  try {
    const res = await fetch(`${DESKTOP_FEED_URL}/${name}`, {
      next: { revalidate: 300 },
      headers: { Accept: "text/yaml, text/plain, */*" },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return parse(text) as ElectronYml;
  } catch {
    return null;
  }
}

function pickAsset(
  yml: ElectronYml | null,
  predicate: (filename: string) => boolean
): DesktopAsset | null {
  if (!yml?.files?.length) return null;
  const match = yml.files.find((f) => predicate(f.url));
  if (!match) return null;
  return {
    url: `${DESKTOP_FEED_URL}/${match.url}`,
    filename: match.url,
    sizeBytes: match.size,
    sha512: match.sha512,
  };
}

export async function getDesktopRelease(): Promise<DesktopRelease | null> {
  const [win, mac] = await Promise.all([
    fetchYml("latest.yml"),
    fetchYml("latest-mac.yml"),
  ]);
  if (!win && !mac) return null;

  const version = mac?.version ?? win?.version ?? "0.0.0";
  const releasedAt = mac?.releaseDate ?? win?.releaseDate ?? null;

  return {
    version,
    releasedAt,
    windows: pickAsset(win, (f) => f.endsWith(".exe")),
    // Mac feed lists .dmg + .zip for each arch; we only surface .dmg to users
    // since electron-builder ships those as the primary user-facing installer.
    macArm64: pickAsset(
      mac,
      (f) => f.endsWith(".dmg") && /arm64/i.test(f)
    ),
    macIntel: pickAsset(
      mac,
      (f) => f.endsWith(".dmg") && !/arm64/i.test(f)
    ),
  };
}

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  const mb = n / (1024 * 1024);
  if (mb < 1024) return `${mb.toFixed(1)} МБ`;
  return `${(mb / 1024).toFixed(2)} ГБ`;
}
