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
      setPrimary(["#fee394", "#dfa52e"]);
    }
    if (folderType === newType) return;
    folderConfigStore.getState().setFolderType(newType);
    // Immediate update instead of setTimeout
    setFolderSmallType(newType === "win11" ? "squareAndIcon" : "folderAndIcon");
  };

  const t = useTranslations("panelTitles");
  const tc = useTranslations("smallFolderConfig");

  return (
    <Dropdown name={t("style")} icon="Folder" open>
      <div id="style-input" className="radio-list">
        <ImgRadio
          name="style-input"
          id="win95-style"
          checked={folderType === "win95"}
          img="normal/win95"
          label="Windows 95"
          visible={folderType === "win95"}
          onChange={changeType("win95")}
        />
        <ImgRadio
          name="style-input"
          id="win11-style"
          checked={folderType === "win11"}
          defaultChecked
          img="normal/win11"
          label="Windows 11"
          onChange={changeType("win11")}
        />
        <ImgRadio
          name="style-input"
          id="win10-style"
          checked={folderType === "win10"}
          img="normal/win10"
          label="Windows 10"
          onChange={changeType("win10")}
        />
        <ImgRadio
          name="style-input"
          id="icon-only-style"
          checked={folderType === "icon-only"}
          img="normal/icon-only"
          label={tc("iconOnly")}
          onChange={changeType("icon-only")}
        />
      </div>
      <FolderSmall />
    </Dropdown>
  );
}
