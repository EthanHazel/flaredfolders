import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

const description =
  "Generate custom folder designs for your favorite operating system. Free, open source, and no ads. Import your own icons, use Simple Icons, or use Lucide icons.";

const title = "Flared Folders";
const url = "https://flaredfolders.vercel.app/";

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
    title,
    description,
    images: [
      {
        url: "/meta/banner.png",
        alt: "Flared Folders Banner",
        width: 1200,
        height: 628,
      },
      {
        url: "/favicon/96.png",
        width: 96,
        height: 96,
        alt: "Flared Folders",
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
      {
        url: "/favicon/96.png",
        width: 96,
        height: 96,
        alt: "Flared Folders",
      },
    ],
  },
  appleMobileWebAppTitle: title,
  url,
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const cookiesInstance = await cookies();
  const theme = cookiesInstance.get("theme")?.value || "light";

  return (
    <html lang={locale}>
      <body className={theme === "dark" ? "dark" : ""}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
