"use client";

import FolderSmall from "./folder-small";
import Dropdown from "../inputs/dropdown";
import ImgRadio from "../inputs/img-radio";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { setPrimary } from "@/lib/set-primary";

export default function FolderStyle() {
  const folderType = folderConfigStore((state) => state.folderType);
  const colorType = folderConfigStore((state) => state.colorType);
  const setFolderSmallType = folderConfigStore(
    (state) => state.setFolderSmallType
  );

  const changeType = (newType) => () => {
    if (colorType === "original") {
      if (folderType === "win11" || folderType === "win10") {
        setPrimary(["#fee394", "#dfa52e"]);
      } else if (folderType === "bigsur") {
        setPrimary(["#82d0f8", "#0089cf"]);
      } else {
        setPrimary(["#8bb158", "#8bb158"]);
      }
    }
    if (folderType === newType) return;
    folderConfigStore.getState().setFolderType(newType);
    // Immediate update instead of setTimeout
    setFolderSmallType(newType === "win11" ? "squareAndIcon" : "folderAndIcon");
  };

  const t = useTranslations("panelTitles");

  return (
    <Dropdown name={t("style")} icon="Folder" open>
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
          id="icon-only-style"
          checked={folderType === "icon-only"}
          img="icon-only"
          onChange={changeType("icon-only")}
        />
      </div>
      <FolderSmall />
    </Dropdown>
  );
}
