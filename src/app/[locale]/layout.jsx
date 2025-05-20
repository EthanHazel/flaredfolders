import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { Analytics } from "@vercel/analytics/next";

const description =
  "Generate custom folder designs for your favorite operating system. Free, open source, and no ads. Import your own icons, use Simple Icons, or use Lucide icons.";

const title = "Flared Folders";
const url = "https://www.flaredfolders.com/";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export const metadata = {
  title,
  description,
  links: [
    { rel: "icon", type: "image/png", href: "/favicon/96.png", sizes: "96x96" },
    { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple.png" },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
  ],
  openGraph: {
    metadataBase: new URL(url),
    title,
    description,
    images: [
      {
        url: "/meta/banner.png",
        alt: "Flared Folders Banner",
        width: 1200,
        height: 628,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: "/meta/banner.png",
        alt: "Flared Folders Banner",
        width: 1200,
        height: 628,
      },
    ],
    themeColor: "#000000",
  },
  appleMobileWebAppTitle: title,
  url,
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return redirect(`/en`);
  }
  const cookiesInstance = await cookies();
  const theme = cookiesInstance.get("theme")?.value || "light";

  return (
    <html lang={locale}>
      <body className={theme === "dark" ? "dark" : ""}>
        <Analytics />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
