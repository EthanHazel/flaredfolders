import { cookies } from "next/headers";

export const metadata = {
  title: "Flared Folders",
  description:
    "Generate custom folders for Windows 11 and Windows 10. Free, open source, and no ads. Import your own icons, use Simple Icons, or use Lucide icons.",
};

export default async function RootLayout({ children }) {
  const cookiesInstance = await cookies();
  const theme = cookiesInstance.get("theme")?.value || "light";

  return (
    <html lang="en">
      <body className={theme === "dark" ? "dark" : ""}>{children}</body>
    </html>
  );
}
