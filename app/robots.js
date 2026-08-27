
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/docs/'
      ],
    },
    sitemap: 'https://www.nihalu.com/sitemap.xml',
  }
}
