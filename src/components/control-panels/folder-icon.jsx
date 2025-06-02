"use client";

import Dropdown from "../inputs/dropdown";
import Checkbox from "../inputs/checkbox";
import Radio from "../inputs/radio";
import Color from "../inputs/color";
import Range from "../inputs/range";
import SlugInput from "../inputs/slug-input";
import OffsetInput from "../inputs/offset-input";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { loadCustom } from "@/functions/fetch-custom";
import { useEffect } from "react";

export default function FolderIcon() {
  const folderType = folderConfigStore((state) => state.folderType);
  const iconType = folderConfigStore((state) => state.iconType || "none"); // Ensure defined value
  const iconColor = folderConfigStore((state) => state.iconColor);
  const setIconType = folderConfigStore((state) => state.setIconType);
  const setIconColor = folderConfigStore((state) => state.setIconColor);
  const setIconOpacity = folderConfigStore((state) => state.setIconOpacity);
  const iconShadow = folderConfigStore((state) => state.iconShadow || false); // Ensure defined value
  const setIconShadow = folderConfigStore((state) => state.setIconShadow);
  const iconMasked = folderConfigStore((state) => state.iconMasked || false); // Ensure defined value
  const setIconMasked = folderConfigStore((state) => state.setIconMasked);
  const setLucideStrokeWidth = folderConfigStore(
    (state) => state.setLucideStrokeWidth
  );

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
      {iconType !== "none" && (
        <Dropdown name={t("image")} icon="Image">
          {iconType !== "custom" && <SlugInput />}
          <div className={iconType !== "custom" ? "hidden" : ""}>
            <input
              type="file"
              name="custom-icon"
              id="custom-icon"
              onChange={() => loadCustom()}
              accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif, image/bmp"
            />
          </div>
          {iconType === "lucide" && (
            <Range
              label={tcc("stroke")}
              name="icon-stroke"
              id="icon-stroke"
              onChange={(e) => setLucideStrokeWidth(e.target.value)}
              defaultValue="1.5"
              min="0.1"
              max="3"
              step="0.1"
            />
          )}
          {iconType !== "none" && (
            <Range
              label={tcc("opacity")}
              name="icon-opacity"
              id="icon-opacity"
              onChange={(e) => setIconOpacity(e.target.value)}
              defaultValue="1"
              min="0"
              max="1"
              step="0.01"
            />
          )}
          {iconType !== "none" && iconType !== "custom" && (
            <>
              <div className="dropdown-break"></div>
              <Color
                defaultColor={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                label={tcc("color")}
              />
            </>
          )}
        </Dropdown>
      )}
      {iconType !== "none" && (
        <>
          <OffsetInput />
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
        </>
      )}
    </Dropdown>
  );
}
