import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Credit from "@/credits.json";
import "@/styles/credits.css";

const getLocales = () => {
  const context = require.context("../locales", false, /\.json$/);
  return context
    .keys()
    .map((key) => key.replace("./", "").replace(".json", ""));
};

export default function Credits() {
  const t = useTranslations("credits");
  const [contributors, setContributors] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translationsLoading, setTranslationsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translationsError, setTranslationsError] = useState(null);

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
          allContributors = allContributors.filter(
            (contributor) => contributor.login !== "EthanHazelSchool"
          );
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

    const fetchTranslations = async () => {
      try {
        const locales = getLocales();
        const translationsData = await Promise.all(
          locales.map((lang) => {
            try {
              const data = require(`../locales/${lang}.json`);
              return {
                code: lang,
                language: data.language,
                author: data.translator,
              };
            } catch (err) {
              console.error(`Error loading ${lang} locale:`, err);
              return null;
            }
          })
        );

        const validTranslations = translationsData.filter(Boolean);
        setTranslations(validTranslations);
      } catch (err) {
        setTranslationsError(err.message);
      } finally {
        setTranslationsLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  const translationStart = t("help").split("%")[0];
  const translationEnd = t("help").split("%")[1];

  return (
    <div id="credits">
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
        <div className="credit-header">{t("contributors")}</div>
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
        <div className="credit-header">{t("translations")}</div>
        <div className="credit-content">
          {translationsLoading && <div>Loading translators...</div>}
          {translationsError && (
            <div>
              {t("error")}: {translationsError}
            </div>
          )}
          {!translationsLoading &&
            !translationsError &&
            translations.map((translation) => (
              <div className="credit-translation" key={translation.code}>
                <span className="credit-translation-name">
                  {translation.language} ({translation.code.toUpperCase()})
                </span>
                <span className="credit-translation-author">
                  {translation.author}
                </span>
              </div>
            ))}
          <span style={{ fontSize: "0.8em", marginTop: "1em" }}>
            {translationStart}
            <a
              href="https://github.com/EthanHazel/flaredfolders?tab=readme-ov-file#-community-translations"
              target="_blank"
            >
              {translationEnd}
            </a>
          </span>
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
    </div>
  );
}
