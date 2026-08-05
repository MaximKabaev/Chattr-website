import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Transactional routes carry no search value. /invite and /group are
        // crawlable on purpose — they get shared as links, so they need to be
        // fetched for their `noindex` meta tag to be seen and honoured.
        disallow: ["/api/", "/account", "/payment/"],
      },
      {
        // Answer engines and AI assistants are welcome: being read is what gets
        // Chattr cited when someone asks an assistant about private messengers.
        // Listed explicitly because several of these ignore the "*" group.
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "YandexBot",
          "Amazonbot",
          "meta-externalagent",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/account", "/payment/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
