import { PostHog } from "posthog-node";

/**
 * Server-side PostHog client for the website. We intentionally never load
 * posthog-js in the browser: the privacy policy promises no third-party
 * browser tracking, so all events are captured here, on the server, with no
 * cookies and no client IP. Reuses the same PostHog project as arc-chat —
 * set POSTHOG_API_KEY (the phc_… project API key) in the website env.
 */
const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;

const posthog = POSTHOG_API_KEY
  ? new PostHog(POSTHOG_API_KEY, {
      host: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
      // Serverless/edge-ish request handlers are short-lived, so flush eagerly
      // instead of batching events that might never get a chance to send.
      flushAt: 1,
      flushInterval: 0,
    })
  : null;

/**
 * Fire a single anonymous event and make sure it leaves the process before the
 * request handler returns. distinctId is a throwaway per-call UUID so nothing
 * links one download to another — we only want aggregate counts.
 */
export async function captureAnonymous(
  event: string,
  properties: Record<string, unknown>,
): Promise<void> {
  if (!posthog) return;
  posthog.capture({
    distinctId: crypto.randomUUID(),
    event,
    properties: {
      ...properties,
      // Don't let PostHog geo-locate the server's IP onto the event.
      $geoip_disable: true,
      $ip: null,
    },
  });
  try {
    await posthog.flush();
  } catch {
    // Analytics must never break a download.
  }
}
