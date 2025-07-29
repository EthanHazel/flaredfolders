"use client";

import Dropdown from "@/components/inputs/dropdown";
import Radio from "@/components/inputs/radio";
import ColorStyles from "@/components/inputs/color-styles";

import { useTranslations } from "next-intl";
import { folderConfigStore } from "@/stores/folder-config";
import { setPrimary } from "@/lib/set-primary";

export default function FolderColor() {
  const colorType = folderConfigStore((state) => state.colorType);
  const folderType = folderConfigStore((state) => state.folderType);

  const changeType = (newType) => () => {
    folderConfigStore.getState().setColorType(newType);
    if (newType === "linear-gradient") {
      setPrimary([
        folderConfigStore.getState().gradientStartColor,
        folderConfigStore.getState().gradientEndColor,
      ]);
    } else if (newType === "solid") {
      setPrimary([
        folderConfigStore.getState().solidColor,
        folderConfigStore.getState().solidColor,
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
          onChange={changeType("linear-gradient")}
          checked={colorType === "linear-gradient"}
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
      {colorType === "linear-gradient" && (
        <>
          <ColorStyles colorId={0} />
          <ColorStyles colorId={1} />
        </>
      )}
      {colorType === "solid" && (
        <div id="color-solid">
          <ColorStyles colorId={2} />
        </div>
      )}
    </Dropdown>
  );
}
