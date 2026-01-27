import licenses from "@/stores/licenses.json";
import Navbar from "@/components/home/navbar";
import fs from "fs";
import "@/styles/licenses.css";
import "@/styles/home/home.css";

export default async function LicensesPage() {
  return (
    <div id="licenses">
      <Navbar />
      <div className="header">
        <h1 className="header-title">Open Source Licenses</h1>
      </div>

      <div id="licenses-list">
        {Object.entries(licenses).map(([name, info]) => {
          if (info.licenseFile) {
            info.licenseText = fs.readFileSync(info.licenseFile, "utf8");
          }
          return (
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
                <p className="license-unavailable">
                  License text not available.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
