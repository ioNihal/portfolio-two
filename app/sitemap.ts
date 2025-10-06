import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  
  const lastContentUpdate = '2025-10-06T00:00:00.000Z'; 

  return [
    
    {
      url: 'https://ionihal.vercel.app',
      lastModified: lastContentUpdate, 
      changeFrequency: 'monthly',
      priority: 1, 
    },
  ];
}