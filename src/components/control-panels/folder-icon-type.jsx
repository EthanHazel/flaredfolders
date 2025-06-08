"use client";

import Dropdown from "../inputs/dropdown";
import Radio from "../inputs/radio";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function FolderIconType() {
  const folderType = folderConfigStore((state) => state.folderType);
  const iconType = folderConfigStore((state) => state.iconType || "none");
  const setIconType = folderConfigStore((state) => state.setIconType);

  useEffect(() => {
    if (folderType === "icon-only" && iconType === "none") {
      setIconType("lucide");
    }
  }, [folderType, iconType, setIconType]);

  const types =
    folderType === "icon-only"
      ? ["lucide", "simple", "custom"]
      : ["lucide", "simple", "custom", "none"];

  const t = useTranslations("panelTitles");
  const tc = useTranslations("iconTypes");
  const tcc = useTranslations("iconConfig");

  return (
    <Dropdown name={t("icon")} icon="FolderPlus">
      <div id="icon-type" className="radio-list">
        {types.map((type) => (
          <Radio
            type="radio"
            name="icon-type"
            id={`icon-type-${type}`}
            onChange={() => setIconType(type)}
            checked={type === iconType}
            key={type}
            label={tc(type)}
          />
        ))}
      </div>
    </Dropdown>
  );
}
