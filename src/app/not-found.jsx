import { cookies } from "next/headers";
import Link from "next/link";

import "@/styles/globals.css";
import "@/styles/not-found.css";

export default async function NotFound() {
  const cookiesInstance = await cookies();
  const theme = cookiesInstance.get("theme")?.value || "light";
  return (
    <body className={theme === "dark" ? "not-found dark" : "not-found"}>
      <div className="not-found-text">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Not sure how you got here lol.</p>
      </div>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </body>
  );
}
