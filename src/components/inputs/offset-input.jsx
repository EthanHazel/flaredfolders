import Dropdown from "./dropdown";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";

export default function OffsetInput() {
  const setOffset = folderConfigStore((state) => state.setIconOffset);
  const setIconScale = folderConfigStore((state) => state.setIconScale);

  const handleOffsetChange = (event) => {
    const offsetX = document.getElementById("offset-x").value;
    const offsetY = document.getElementById("offset-y").value;
    setOffset([offsetX, offsetY]);
  };

  const t = useTranslations("panelTitles");

  return (
    <Dropdown name={t("offset")}>
      <input
        type="range"
        name="offset-x"
        id="offset-x"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={handleOffsetChange}
      />
      <input
        type="range"
        name="offset-y"
        id="offset-y"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={handleOffsetChange}
      />
      <input
        type="range"
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
