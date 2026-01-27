import checker from "license-checker";
import fs from "fs/promises";
import path from "path";

import Navbar from "@/components/home/navbar";

import "@/styles/licenses.css";
import "@/styles/home/home.css";

async function getPackageJsonDeps() {
  const pkgPath = path.join(process.cwd(), "package.json");
  const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));

  return new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
  ]);
}

async function getLicensesWithText() {
  const allowedDeps = await getPackageJsonDeps();

  return new Promise((resolve, reject) => {
    checker.init(
      {
        start: process.cwd(),
        production: true,
        json: true,
      },
      async (err, packages) => {
        if (err) return reject(err);

        const result = {};

        for (const [fullName, info] of Object.entries(packages)) {
          const pkgName = fullName.split("@")[0];

          if (!allowedDeps.has(pkgName)) continue;

          let licenseText = null;

          if (
            info.licenseFile &&
            path.basename(info.licenseFile).toLowerCase() !== "readme.md"
          ) {
            try {
              licenseText = await fs.readFile(
                path.resolve(info.licenseFile),
                "utf8",
              );
            } catch {
              licenseText = null;
            }
          }

          result[fullName] = {
            ...info,
            licenseText,
          };
        }

        resolve(result);
      },
    );
  });
}

export default async function LicensesPage() {
  const licenses = await getLicensesWithText();

  return (
    <div id="licenses">
      <Navbar />
      <div className="header">
        <h1 className="header-title">Open Source Licenses</h1>
      </div>

      <div id="licenses-list">
        {Object.entries(licenses).map(([name, info]) => (
          <section key={name}>
            <h2>{name}</h2>
            <div>License: {info.licenses || "Unknown"}</div>

            {info.repository && (
              <div>
                <a href={info.repository} target="_blank" rel="noreferrer">
                  Repository
                </a>
              </div>
            )}

            {info.licenseText ? (
              <pre className="license-text">{info.licenseText}</pre>
            ) : (
              <p className="license-unavailable">License text not available.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
