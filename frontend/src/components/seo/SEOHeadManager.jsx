import { Helmet } from "react-helmet-async";

const SITE_NAME = "PromptCraft AI";
const DEFAULT_DESCRIPTION =
  "PromptCraft AI helps teams generate, preview, and ship production-ready web experiences with AI-assisted workflows, exports, and analytics.";

const DEFAULT_OG_IMAGE = "/favicon.svg";

/**
 * Sets document title, description, and social meta tags per route.
 * Uses react-helmet-async so nested pages can override defaults safely.
 */
export default function SEOHeadManager({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
}) {
  const pageTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = path ? `${origin}${path}` : origin || "";

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#020617" />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `${origin}${ogImage}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith("http") ? ogImage : `${origin}${ogImage}`} />
    </Helmet>
  );
}
