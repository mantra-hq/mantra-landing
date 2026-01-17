// External site URLs
export const SITE_URLS = {
  main: 'https://mantra.gonewx.com',
  docs: 'https://docs.mantra.gonewx.com',
  blog: 'https://blog.mantra.gonewx.com',
} as const;

// Get localized URLs based on language
export function getLocalizedUrls(lang: 'zh' | 'en') {
  const isZh = lang === 'zh';

  return {
    docs: isZh ? SITE_URLS.docs : `${SITE_URLS.docs}/en`,
    blog: isZh ? `${SITE_URLS.blog}/zh` : SITE_URLS.blog,
    about: isZh ? `${SITE_URLS.docs}/about` : `${SITE_URLS.docs}/en/about`,
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
