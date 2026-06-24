import { NextResponse, type NextRequest } from "next/server";
import { getDesktopRelease, type DesktopRelease } from "@/lib/desktopRelease";
import { captureAnonymous } from "@/lib/analytics";

/**
 * Download redirector. The download cards link here instead of straight at the
 * installer so we can count downloads server-side (anonymous PostHog event,
 * no cookies, no client IP) before 302-ing to the real asset on the VPS.
 *
 * Lives under /api so the i18n middleware leaves it alone (see middleware.ts).
 */

type PlatformKey = keyof DesktopRelease; // "windows" | "macArm64" | "macIntel"
const VALID: PlatformKey[] = ["windows", "macArm64", "macIntel"];

function isPlatformKey(value: string): value is PlatformKey {
  return (VALID as string[]).includes(value);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const origin = request.nextUrl.origin;

  if (!isPlatformKey(platform)) {
    return NextResponse.redirect(new URL("/download", origin));
  }

  const release = await getDesktopRelease();
  const asset = release?.[platform] ?? null;

  // Feed unreachable or this platform not built yet — send the user back to the
  // download page rather than 404-ing them.
  if (!asset) {
    return NextResponse.redirect(new URL("/download", origin));
  }

  await captureAnonymous("desktop_download", {
    platform,
    version: asset.version,
    filename: asset.filename,
    // Useful for splitting macOS arm64 vs intel in PostHog.
    os: platform === "windows" ? "windows" : "macos",
  });

  return NextResponse.redirect(asset.url);
}
