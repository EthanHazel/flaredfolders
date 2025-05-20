export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://flaredfolders.vercel.app/sitemap.xml",
  };
}
