import HeaderButton from "./header-button";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";
import { swapTheme } from "@/lib/theme-swap";
import { Sun, Moon, Bug, HandHeart } from "lucide-react";

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
      <HeaderButton
        label={t("donate")}
        href="https://ko-fi.com/ethanhazel/tip"
        target="_blank"
        className="header-button"
        icon={<HandHeart className="header-button-svg" />}
      />
    </div>
  );
}
