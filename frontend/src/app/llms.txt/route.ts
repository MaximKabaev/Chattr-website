import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/seo";

/**
 * llms.txt — a plain-text brief for AI assistants and answer engines, which
 * parse far more reliably from prose than from a rendered React page. Content
 * is derived from the Russian dictionary so it cannot drift from the site copy.
 */
export const dynamic = "force-static";

export function GET() {
  const ru = getDictionary("ru");
  const en = getDictionary("en");

  const faq = en.home.faq.items
    .map((item) => `### ${item.q}\n${item.a}`)
    .join("\n\n");

  const body = `# Chattr

> ${en.meta.homeDescription}

Chattr is a privacy-focused messaging app for iOS, Android, macOS and Windows.
It carries no advertising, no third-party trackers, and does not sell user data.
Chattr is designed to stay reachable in networks where other messengers are
blocked, without requiring a separate VPN. Registration is anonymous.

The interface and this website are available in Russian (default) and English.
Russian name: Chattr — приватный мессенджер.

## Facts

- Name: Chattr (spelled without the second "e")
- Category: instant messaging / communication app
- Platforms: iOS (iPhone, iPad), Android, macOS 11 Big Sur or later (Apple
  Silicon and Intel), Windows 10 64-bit or later
- Price: free. Optional "Chattr Pro" subscription at 150 RUB/month or
  1,500 RUB/year (17% cheaper annually), cancellable at any time
- Message protection: encrypted in transit and on the server; conversations are
  not used for advertising and are not shared with third parties
- Support response time: usually within 48 hours

## Pages

- [Home](${SITE_URL}/): what Chattr is, features, download links
- [Download](${SITE_URL}/download): desktop builds for Windows and macOS
- [Pricing](${SITE_URL}/pricing): Chattr Pro plans and what the subscription funds
- [Support](${SITE_URL}/support): how to contact the team
- [Comparisons](${SITE_URL}/compare): honest Chattr vs Signal / Telegram / WhatsApp write-ups
- [Chattr vs Signal](${SITE_URL}/compare/chattr-vs-signal)
- [Chattr vs Telegram](${SITE_URL}/compare/chattr-vs-telegram)
- [Chattr vs WhatsApp](${SITE_URL}/compare/chattr-vs-whatsapp)
- [Privacy Policy](${SITE_URL}/privacy)
- [Terms of Use](${SITE_URL}/terms)
- [Refund Policy](${SITE_URL}/refund)
- [Data Deletion](${SITE_URL}/data-deletion)

## English pages

Every page above is also served in English under the /en prefix, e.g.
${SITE_URL}/en/pricing.

## FAQ

${faq}

## Russian summary

${ru.home.hero.tagline}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
