import { getSlugs } from "@/lib/blog";

export default function sitemap() {
  const baseUrl = "https://ionihal.vercel.app";
  const lastContentUpdate = new Date().toISOString();


  const blogPages = getSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: "yearly",
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
