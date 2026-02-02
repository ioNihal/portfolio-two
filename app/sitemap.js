import { getSlugs } from "@/lib/blog";

export default function sitemap() {
  const baseUrl = "https://ionihal.vercel.app";
  const lastContentUpdate = "2025-10-06T00:00:00.000Z";

  const blogPages = getSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastContentUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPages,
  ];
}
