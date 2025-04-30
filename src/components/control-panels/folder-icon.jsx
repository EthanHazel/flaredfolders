"use client";

import Dropdown from "../inputs/dropdown";
import Checkbox from "../inputs/checkbox";
import Radio from "../inputs/radio";
import Color from "../inputs/color";
import SlugInput from "../inputs/slug-input";
import OffsetInput from "../inputs/offset-input";

import { folderConfigStore } from "@/stores/folder-config";
import { loadCustom } from "@/functions/fetch-custom";

export default function FolderIcon() {
  const iconType = folderConfigStore((state) => state.iconType);
  const iconColor = folderConfigStore((state) => state.iconColor);
  const setIconType = folderConfigStore((state) => state.setIconType);
  const setIconColor = folderConfigStore((state) => state.setIconColor);
  const setIconOpacity = folderConfigStore((state) => state.setIconOpacity);
  const iconShadow = folderConfigStore((state) => state.iconShadow);
  const setIconShadow = folderConfigStore((state) => state.setIconShadow);
  const iconMasked = folderConfigStore((state) => state.iconMasked);
  const setIconMasked = folderConfigStore((state) => state.setIconMasked);
  const setLucideStrokeWidth = folderConfigStore(
    (state) => state.setLucideStrokeWidth
  );
  const types = ["lucide", "simple", "custom", "none"];
  const typeNames = [
    "Lucide (General Icons)",
    "SimpleIcons (Brand Logos)",
    "Upload (PNG, SVG, or JPEG)",
    "None",
  ];

  return (
    <Dropdown name="Folder Icon">
      <div id="icon-type" className="radio-list">
        {types.map((type) => (
          <Radio
            type="radio"
            name="icon-type"
            id={`icon-type-${type}`}
            onChange={() => setIconType(type)}
            defaultChecked={type === iconType}
            key={type}
            label={typeNames[types.indexOf(type)]}
          />
        ))}
      </div>
      {iconType !== "none" && (
        <Dropdown name="Icon Image">
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
            <input
              type="range"
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
            <input
              type="range"
              name="icon-opacity"
              id="icon-opacity"
              onChange={(e) => setIconOpacity(e.target.value)}
              defaultValue="1"
              min="0"
              max="1"
              step="0.01"
            />
          )}
          {iconType !== "none" && (
            <Color
              defaultColor={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              label="Icon Color"
            />
          )}
        </Dropdown>
      )}
      {iconType !== "none" && (
        <>
          <OffsetInput />
          <Dropdown name="Icon Config">
            <Checkbox
              name="icon-shadow"
              label="Give icon shadow"
              id="icon-shadow"
              onChange={() => setIconShadow(!iconShadow)}
              defaultChecked={iconShadow}
            />
            <Checkbox
              name="icon-mask"
              label="Mask icon within folder"
              id="icon-mask"
              onChange={() => setIconMasked(!iconMasked)}
              defaultChecked={iconMasked}
            />
          </Dropdown>
        </>
      )}
    </Dropdown>
  );
}
