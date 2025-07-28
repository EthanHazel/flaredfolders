import HeaderButton from "./header-button";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";
import { swapTheme } from "@/lib/theme-swap";
import { Sun, Moon, Bug } from "lucide-react";

import "@/styles/footer.css";

export default function FooterButtons() {
  const t = useTranslations("buttons");
  return (
    <div id="footer-buttons">
      <LocaleSwitcher />
      <HeaderButton
        label={t("theme")}
        className="header-button"
        onClick={() => swapTheme(document.body.classList.value)}
        icon={
          <>
            <Sun className="header-button-svg" id="sun" />
            <Moon className="header-button-svg" id="moon" />
          </>
        }
      />
      <HeaderButton
        label={t("bug")}
        href="https://github.com/EthanHazel/flaredfolders/issues/new?labels=bug"
        target="_blank"
        className="header-button"
        icon={<Bug className="header-button-svg" />}
      />
    </div>
  );
}
