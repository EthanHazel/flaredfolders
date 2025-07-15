import { locales } from "@/i18n/routing";

export default function sitemap() {
  return [
    {
      url: "https://www.flaredfolders.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `https://www.flaredfolders.com/${locale}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    })),
    ...locales.map((locale) => ({
      url: `https://www.flaredfolders.com/${locale}/editor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    })),
  ];
}
