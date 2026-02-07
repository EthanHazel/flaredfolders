"use client";

import Dropdown from "@/components/inputs/dropdown";
import Radio from "@/components/inputs/radio";
import Range from "@/components/inputs/range";
import ColorStyles from "@/components/inputs/color-styles";

import { useTranslations } from "next-intl";
import { folderConfigStore } from "@/stores/folder-config";
import { setPrimary } from "@/lib/set-primary";

export default function FolderColor() {
  const colorType = folderConfigStore((state) => state.colorType);
  const folderType = folderConfigStore((state) => state.folderType);
  const setColorContrast = folderConfigStore((state) => state.setColorContrast);

  const changeType = (newType) => () => {
    folderConfigStore.getState().setColorType(newType);
    if (newType === "gradient" || newType === "duo") {
      setPrimary([
        folderConfigStore.getState().colorOne,
        folderConfigStore.getState().colorTwo,
      ]);
    } else if (newType === "solid") {
      setPrimary([
        folderConfigStore.getState().colorOne,
        folderConfigStore.getState().colorOne,
      ]);
    } else {
      setPrimary(["#fee394", "#dfa52e"]);
    }
  };

  const t = useTranslations("panelTitles");
  const tc = useTranslations("folderConfig");

  if (folderType === "icon-only") return null;
  return (
    <Dropdown name={t("color")} icon="Palette">
      <div id="color-type" className="radio-list">
        <Radio
          name="color-type"
          id="color-type-gradient"
          label={tc("gradient")}
          onChange={changeType("gradient")}
          checked={colorType === "gradient"}
        />
        <Radio
          name="color-type"
          id="color-type-gradient"
          label={tc("duo")}
          onChange={changeType("duo")}
          checked={colorType === "duo"}
        />
        <Radio
          name="color-type"
          id="color-type-solid"
          label={tc("solid")}
          onChange={changeType("solid")}
          checked={colorType === "solid"}
        />
        <Radio
          name="color-type"
          id="color-type-original"
          label={tc("original")}
          onChange={changeType("original")}
          checked={colorType === "original"}
        />
      </div>
      {(colorType === "gradient" || colorType === "duo") && (
        <>
          <ColorStyles colorId={0} />
          <ColorStyles colorId={1} />
        </>
      )}
      {colorType === "solid" && (
        <div id="color-solid">
          <ColorStyles colorId={0} />
        </div>
      )}
      {colorType !== "original" && (
        <Range
          label={tc("colorContrast")}
          min="0.25"
          max="1.5"
          step="0.05"
          onChange={(e) => setColorContrast(e.target.value)}
          defaultValue="1"
        />
      )}
    </Dropdown>
  );
}
