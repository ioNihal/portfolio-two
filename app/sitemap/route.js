//app/sitemap/route.js

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ionihal.vercel.app</loc>
    <lastmod>2025-10-06T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
</urlset>`;

export function GET(request) {
    return new Response(sitemapXml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}