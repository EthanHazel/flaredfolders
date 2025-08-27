import IconButton from "./icon-button";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";
import { swapTheme } from "@/lib/theme/theme-swap";
import { Sun, Moon, Bug } from "lucide-react";

import "@/styles/layout/footer.css";

export default function FooterButtons() {
  const t = useTranslations("buttons");
  return (
    <div id="footer-buttons">
      <IconButton
        label={t("theme")}
        className="header-button"
        onClick={() => swapTheme(document.body.classList.value)}
        icon={
          <>
            <Sun className="header-button-svg sun" />
            <Moon className="header-button-svg moon" />
          </>
        }
      />
      <IconButton
        label={t("bug")}
        href="https://github.com/EthanHazel/flaredfolders/issues/new?labels=bug"
        target="_blank"
        className="header-button"
        icon={<Bug className="header-button-svg" />}
      />
      <LocaleSwitcher />
    </div>
  );
}
