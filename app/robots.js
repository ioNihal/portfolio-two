
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/docs/'
      ],
    },
    sitemap: 'https://ionihal.vercel.app/sitemap.xml',
  }
}
