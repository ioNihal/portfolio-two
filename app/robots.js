
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
    sitemap: 'https://ionihal.vercel.app/sitemap.xml',
  }
}
