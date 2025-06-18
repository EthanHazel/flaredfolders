import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware({
  ...routing,
  localeDetection: true,
});

export default function middleware(request) {
  // Extract user agent string
  const userAgent = request.headers.get("user-agent") || "";

  // Detect operating system
  let os = "Unknown";
  const osPatterns = [
    { pattern: /Windows/, name: "Windows" },
    { pattern: /Mac OS/, name: "Mac OS" },
    { pattern: /Linux/, name: "Linux" },
    { pattern: /Android/, name: "Android" },
    { pattern: /iPhone|iPad|iPod/, name: "iOS" },
  ];

  for (const { pattern, name } of osPatterns) {
    if (pattern.test(userAgent)) {
      os = name;
      break;
    }
  }

  // Clone headers and set new OS headers
  const headers = new Headers(request.headers);
  headers.set("x-os", os);
  headers.set("x-user-agent", userAgent);

  // Create new request with modified headers
  const newRequest = new NextRequest(request, {
    headers: headers,
  });

  return intlMiddleware(newRequest);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
