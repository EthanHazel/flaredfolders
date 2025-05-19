import Link from "next/link";

import "@/styles/globals.css";
import "@/styles/not-found.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <body className="dark">
        <div className="not-found">
          <div className="not-found-text">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Not sure how you got here lol.</p>
          </div>
          <div>
            <Link href="/">Go back to Home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
