"use client";

import Dropdown from "../inputs/dropdown";
import Color from "../inputs/color";
import Range from "../inputs/range";
import SlugInput from "../inputs/slug-input";
import EmojiPicker from "../inputs/emoji-picker";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { loadCustom } from "@/lib/icons/fetch-custom";
import { loadSimpleColor } from "@/lib/icons/fetch-simple";
import { useEffect, useState } from "react";

export default function FolderIconInput() {
  const folderType = folderConfigStore((state) => state.folderType);
  const colorType = folderConfigStore((state) => state.colorType);
  const iconType = folderConfigStore((state) => state.iconType || "none");
  const iconColor = folderConfigStore((state) => state.iconColor);
  const setIconType = folderConfigStore((state) => state.setIconType);
  const setIconColor = folderConfigStore((state) => state.setIconColor);
  const setIconOpacity = folderConfigStore((state) => state.setIconOpacity);
  const setLucideStrokeWidth = folderConfigStore(
    (state) => state.setLucideStrokeWidth,
  );
  const setColorOne = folderConfigStore((state) => state.setColorOne);
  const setColorTwo = folderConfigStore((state) => state.setColorTwo);
  const simpleSlug = folderConfigStore((state) => state.simpleSlug);

  const [brandColor, setBrandColor] = useState("");

  useEffect(() => {
    if (folderType === "icon-only" && iconType === "none") {
      setIconType("lucide");
    }
  }, [folderType, iconType, setIconType]);

  useEffect(() => {
    if (iconType === "simple") {
      loadSimpleColor(simpleSlug).then((color) => setBrandColor(color));
    }
  }, [iconType, simpleSlug, setBrandColor]);

  const t = useTranslations("panelTitles");
  const tcc = useTranslations("iconConfig");

  return (
    <>
      {iconType !== "none" && (
        <Dropdown name={t("image")} icon="Image">
          {iconType !== "custom" && iconType !== "emoji" && <SlugInput />}
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
          {iconType === "simple" && (
            <div>
              <p>Brand color: {brandColor}</p>
              <button onClick={() => setIconColor(brandColor)}>
                Set to icon color
              </button>
              {folderType !== "icon-only" &&
              colorType !== "original" &&
              (colorType === "gradient" || colorType === "duo") ? (
                <>
                  <button onClick={() => setColorOne(brandColor)}>
                    Set to folder color 1
                  </button>
                  <button onClick={() => setColorTwo(brandColor)}>
                    Set to folder color 2
                  </button>
                </>
              ) : (
                <button onClick={() => setColorOne(brandColor)}>
                  Set to folder color
                </button>
              )}
            </div>
          )}
          {iconType === "emoji" && <EmojiPicker />}
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
          {iconType !== "none" &&
            iconType !== "custom" &&
            iconType !== "emoji" && (
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
    </>
  );
}
