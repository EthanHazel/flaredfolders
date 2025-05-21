import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { redirect } from "next/navigation";

const description =
  "Generate custom folder designs for your favorite operating system. Free, open source, and no ads. Import your own icons, use Simple Icons, or use Lucide icons.";

const title = "Flared Folders";
const url = "https://www.flaredfolders.com/";

const getLocales = () => {
  const context = require.context("../../locales", false, /\.json$/);
  const locales = context
    .keys()
    .map((key) => key.replace("./", "").replace(".json", ""));
  return locales;
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata = {
  metadataBase: new URL(url),
  alternates: {
    canonical: "/",
    languages: {
      ...getLocales().reduce((obj, locale) => {
        obj[locale] = `/${locale}`;
        return obj;
      }, {}),
    },
  },
  title,
  description,
  links: [{ rel: "manifest", href: "../favicon/site.webmanifest" }],
  icons: {
    icon: "/favicon/favicon.svg",
    apple: "/favicon/apple.png",
    shortcut: "/favicon/favicon.ico",
  },
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
    ],
    type: "website",
    authors: ["Ethan Hazel"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    creator: "@EthanHazelGD",
    description,
    images: [
      {
        url: "/meta/banner.png",
        alt: "Flared Folders Banner",
        width: 1200,
        height: 628,
      },
    ],
    app: {
      name: "flared_folders",
      url,
    },
  },
  appleMobileWebAppTitle: title,
  url,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
