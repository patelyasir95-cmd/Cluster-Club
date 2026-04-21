import type { MetadataRoute } from "next";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://clusterclub.co.uk",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://clusterclub.co.uk/our-story",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://clusterclub.co.uk/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
