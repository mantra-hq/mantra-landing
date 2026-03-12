// External site URLs
export const SITE_URLS = {
  main: 'https://mantra.gonewx.com',
  docs: 'https://docs.mantra.gonewx.com',
  blog: 'https://blog.mantra.gonewx.com',
} as const;

// UTM parameters for cross-domain attribution
const UTM_LANDING = 'utm_source=website&utm_medium=landing';

function withUtm(url: string): string {
  return url + (url.includes('?') ? '&' : '?') + UTM_LANDING;
}

// Get localized URLs based on language
export function getLocalizedUrls(lang: 'zh' | 'en') {
  const isZh = lang === 'zh';

  const docsBase = isZh ? SITE_URLS.docs : `${SITE_URLS.docs}/en`;
  const blogBase = isZh ? `${SITE_URLS.blog}/zh` : SITE_URLS.blog;
  const aboutBase = isZh ? `${SITE_URLS.docs}/about` : `${SITE_URLS.docs}/en/about`;
  const quickstartBase = isZh ? `${SITE_URLS.docs}/guide/getting-started` : `${SITE_URLS.docs}/en/guide/getting-started`;

  return {
    docs: withUtm(docsBase),
    quickstart: withUtm(quickstartBase),
    blog: withUtm(blogBase),
    about: aboutBase, // about is a base path, UTM added when final URL is built
    withUtm,
  };
}

// Common page paths
export const PAGE_PATHS = {
  faq: '/faq.html',
  privacy: '/privacy-policy.html',
  terms: '/terms-of-service.html',
  security: '/security-policy.html',
  license: '/license-overview.html',
} as const;
