import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./locale-switcher-select";

const getLocales = () => {
  const context = require.context("../../locales", false, /\.json$/);
  return context
    .keys()
    .map((key) => key.replace("./", "").replace(".json", ""));
};

const getLocaleName = (locale) => {
  const context = require.context("../../locales", false, /\.json$/);
  return context(`./${locale}.json`).language;
};

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {[
        { locale: "en", name: getLocaleName("en") },
        ...getLocales()
          .filter((locale) => locale !== "en")
          .map((locale) => ({ locale, name: getLocaleName(locale) })),
      ].map(({ locale, name }) => (
        <option key={locale} value={locale}>
          {name}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
