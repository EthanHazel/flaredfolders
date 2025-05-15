"use client";

import FolderSmall from "./folder-small";
import Dropdown from "../inputs/dropdown";
import ImgRadio from "../inputs/img-radio";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";

export default function FolderStyle() {
  const folderType = folderConfigStore((state) => state.folderType);
  const folderSmallType = folderConfigStore((state) => state.folderSmallType);
  const setFolderSmallType = folderConfigStore(
    (state) => state.setFolderSmallType
  );

  const changeType = (newType) => () => {
    if (folderType === newType) return;
    folderConfigStore.getState().setFolderType(newType);
    // Immediate update instead of setTimeout
    setFolderSmallType(newType === "win11" ? "squareAndIcon" : "folderAndIcon");
  };

  const t = useTranslations("panelTitles");

  return (
    <Dropdown name={t("style")} open>
      <div id="style-input" className="radio-list">
        <ImgRadio
          name="style-input"
          id="win11-style"
          checked={folderType === "win11"}
          defaultChecked
          img="win11"
          onChange={changeType("win11")}
        />
        <ImgRadio
          name="style-input"
          id="win10-style"
          checked={folderType === "win10"}
          img="win10"
          onChange={changeType("win10")}
        />
        <ImgRadio
          name="style-input"
          id="bigsur-style"
          checked={folderType === "bigsur"}
          img="bigsur"
          onChange={changeType("bigsur")}
        />
        <ImgRadio
          name="style-input"
          id="mint-l-style"
          checked={folderType === "mint-l"}
          img="mint-l"
          onChange={changeType("mint-l")}
        />
      </div>
      <FolderSmall />
    </Dropdown>
  );
}
