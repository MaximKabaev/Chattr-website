/**
 * Comparison pages ("Chattr vs X"). The URL slug carries the full phrase people
 * actually search for, so /compare/chattr-vs-signal rather than /compare/signal.
 */
export const COMPARISON_KEYS = ["signal", "telegram", "whatsapp"] as const;

export type ComparisonKey = (typeof COMPARISON_KEYS)[number];

export function slugFor(key: ComparisonKey): string {
  return `chattr-vs-${key}`;
}

export function pathFor(key: ComparisonKey): string {
  return `/compare/${slugFor(key)}`;
}

export function keyForSlug(slug: string): ComparisonKey | null {
  return COMPARISON_KEYS.find((key) => slugFor(key) === slug) ?? null;
}
