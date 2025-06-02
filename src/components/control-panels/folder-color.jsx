"use client";

import Dropdown from "@/components/inputs/dropdown";
import Radio from "@/components/inputs/radio";
import FolderColorInput from "@/components/inputs/folder-color-input";

import { useTranslations } from "next-intl";
import { folderConfigStore } from "@/stores/folder-config";
import { setPrimary } from "@/functions/set-primary";

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
      if (folderType === "win11" || folderType === "win10")
        setPrimary(["#fee394", "#dfa52e"]);
      else if (folderType === "bigsur") setPrimary(["#82d0f8", "#0089cf"]);
      else setPrimary(["#8bb158", "#8bb158"]);
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
          defaultChecked
        />
        <Radio
          name="color-type"
          id="color-type-solid"
          label={tc("solid")}
          onChange={changeType("solid")}
        />
        <Radio
          name="color-type"
          id="color-type-original"
          label={tc("original")}
          onChange={changeType("original")}
        />
      </div>
      {colorType === "linear-gradient" && (
        <>
          <FolderColorInput colorId={0} />
          <FolderColorInput colorId={1} />
        </>
      )}
      {colorType === "solid" && (
        <div id="color-solid">
          <FolderColorInput colorId={2} />
        </div>
      )}
    </Dropdown>
  );
}
