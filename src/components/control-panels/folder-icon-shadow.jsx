"use client";

import Dropdown from "../inputs/dropdown";
import Range from "../inputs/range";
import Color from "../inputs/color";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";

export default function FolderIconOffset() {
  const setShadowColor = folderConfigStore((state) => state.setShadowColor);
  const setShadowBlur = folderConfigStore((state) => state.setShadowBlur);
  const setShadowOffset = folderConfigStore((state) => state.setShadowOffset);
  const setShadowOpacity = folderConfigStore((state) => state.setShadowOpacity);

  const handleXChange = (event) => {
    const offsetX = event.target.value;
    const offsetY = document.getElementById("shadow-offset-y").value;
    setShadowOffset([offsetX, offsetY]);
  };

  const handleYChange = (event) => {
    const offsetX = document.getElementById("shadow-offset-x").value;
    const offsetY = event.target.value;
    setShadowOffset([offsetX, offsetY]);
  };

  const t = useTranslations("panelTitles");
  const tc = useTranslations("iconShadow");

  if (!folderConfigStore((state) => state.iconShadow)) return null;

  return (
    <Dropdown name={t("shadow")} icon="Blend">
      <Color
        label={tc("color")}
        name="shadow-color"
        defaultColor={"#000000"}
        onChange={(e) => setShadowColor(e.target.value)}
      />
      <Range
        label={tc("opacity")}
        name="shadow-opacity"
        id="shadow-opacity"
        defaultValue={15}
        min={0}
        max={100}
        onChange={(e) => setShadowOpacity(e.target.value)}
      />
      <Range
        label={tc("blur")}
        name="shadow-blur"
        id="shadow-blur"
        defaultValue={10}
        min={0}
        max={50}
        onChange={(e) => setShadowBlur(e.target.value)}
      />
      <Range
        label={tc("x")}
        name="shadow-offset-x"
        id="shadow-offset-x"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={handleXChange}
      />
      <Range
        label={tc("y")}
        name="shadow-offset-y"
        id="shadow-offset-y"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={handleYChange}
      />
    </Dropdown>
  );
}
