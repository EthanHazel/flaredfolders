import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Credit from "@/credits.json";

import "@/styles/credits.css";

export default function Credits() {
  const t = useTranslations("credits");
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        let allContributors = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/repos/EthanHazel/flaredfolders/contributors?per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );

          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();
          allContributors = [...allContributors, ...data];
          hasMore = data.length === 100;
          page++;
        }

        setContributors(allContributors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  return (
    <>
      <div className="credit">
        <div className="credit-header">{t("created")}</div>
        <div className="credit-content">
          <a
            href={Credit.createdBy[1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {Credit.createdBy[0]}
          </a>
        </div>
      </div>
      <div className="credit">
        <div className="credit-header">{t("icons")}</div>
        <div className="credit-content">
          <a
            href={Credit.iconsFrom.simple[1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {Credit.iconsFrom.simple[0]}
          </a>
          <a
            href={Credit.iconsFrom.lucide[1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {Credit.iconsFrom.lucide[0]}
          </a>
        </div>
      </div>
      <div className="credit">
        <div className="credit-header">{t("fonts")}</div>
        <div className="credit-content">
          <a
            href="https://fonts.google.com/specimen/Syne?query=Syne"
            target="_blank"
            rel="noopener noreferrer"
          >
            Syne
          </a>
          <a
            href="https://fonts.google.com/specimen/Inter?query=Inter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inter
          </a>
        </div>
      </div>
      <div className="credit">
        <div className="credit-header">{t("constributors")}</div>
        <div className="credit-content">
          {loading && <div>Loading contributors...</div>}
          {error && <div>Error loading contributors: {error}</div>}
          {!loading && !error && contributors.length > 0
            ? contributors.map((contributor) => (
                <div key={contributor.id}>
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contributor-link"
                  >
                    {contributor.login}
                  </a>
                </div>
              ))
            : !loading && !error && <div>No contributors found</div>}
        </div>
      </div>
      <div className="credit">
        <div className="credit-header">{t("donators")}</div>
        <div className="credit-content">
          {Credit.kofi.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      <div className="credit">
        <div className="credit-header">{t("special")}</div>
        <div className="credit-content">
          {Credit.specialThanks.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </>
  );
}
