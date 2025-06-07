"use client";

import Dropdown from "../inputs/dropdown";
import Checkbox from "../inputs/checkbox";

export default function FolderIconConfig() {
  const iconType = folderConfigStore((state) => state.iconType || "none");
  const iconShadow = folderConfigStore((state) => state.iconShadow || false);
  const setIconShadow = folderConfigStore((state) => state.setIconShadow);
  const iconMasked = folderConfigStore((state) => state.iconMasked || false);
  const setIconMasked = folderConfigStore((state) => state.setIconMasked);

  const t = useTranslations("panelTitles");
  const tcc = useTranslations("iconConfig");
  return (
    <>
      {iconType !== "none" && (
        <Dropdown name={t("config")} icon="Settings">
          <Checkbox
            name="icon-shadow"
            label={tcc("shadow")}
            id="icon-shadow"
            onChange={() => setIconShadow(!iconShadow)}
            checked={iconShadow}
          />
          <Checkbox
            name="icon-mask"
            label={tcc("mask")}
            id="icon-mask"
            onChange={() => setIconMasked(!iconMasked)}
            checked={iconMasked}
          />
        </Dropdown>
      )}
    </>
  );
}
