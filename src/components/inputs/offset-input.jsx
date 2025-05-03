import Dropdown from "./dropdown";
import Range from "./range";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";

export default function OffsetInput() {
  const setOffset = folderConfigStore((state) => state.setIconOffset);
  const setIconScale = folderConfigStore((state) => state.setIconScale);

  const handleXChange = (event) => {
    const offsetX = event.target.value;
    const offsetY = document.getElementById("offset-y").value;
    setOffset([offsetX, offsetY]);
  };

  const handleYChange = (event) => {
    const offsetX = document.getElementById("offset-x").value;
    const offsetY = event.target.value;
    setOffset([offsetX, offsetY]);
  };

  const t = useTranslations("panelTitles");
  const tc = useTranslations("iconConfig");

  return (
    <Dropdown name={t("offset")}>
      <Range
        label={tc("x")}
        name="offset-x"
        id="offset-x"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={handleXChange}
      />
      <Range
        label={tc("y")}
        name="offset-y"
        id="offset-y"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={handleYChange}
      />
      <Range
        label={tc("scale")}
        name="icon-scale"
        id="icon-scale"
        onChange={(e) => setIconScale(e.target.value)}
        defaultValue="0.5"
        min="0.1"
        max="1"
        step="0.01"
      />
    </Dropdown>
  );
}
