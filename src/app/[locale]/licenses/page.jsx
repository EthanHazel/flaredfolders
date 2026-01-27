import licenses from "@/stores/licenses.json";
import Navbar from "@/components/home/navbar";
import ReactMarkdown from "react-markdown"; // import
import "@/styles/licenses.css";
import "@/styles/home/home.css";

export default function LicensesPage() {
  return (
    <div id="licenses">
      <Navbar />
      <div className="header">
        <h1 className="header-title">Open Source Licenses</h1>
      </div>

      <div id="licenses-list">
        {Object.entries(licenses).map(([name, info]) => {
          return (
            <section key={name} className="license-section">
              <h2>{name}</h2>
              <div>License: {info.license || "Unknown"}</div>

              {info.licenseText ? (
                <div className="license-text">
                  <ReactMarkdown>{info.licenseText}</ReactMarkdown>
                </div>
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
