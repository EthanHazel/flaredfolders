"use client";

import FolderSmall from "./folder-small";
import Dropdown from "../inputs/dropdown";
import Radio from "../inputs/radio";
import ImgRadio from "../inputs/img-radio";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";

export default function FolderStyle() {
  const folderType = folderConfigStore((state) => state.folderType);

  const changeType = (newType) => () => {
    folderConfigStore.getState().setFolderType(newType);
  };

  const t = useTranslations("panelTitles");
  const tc = useTranslations("folderTypes");

  return (
    <Dropdown name={t("style")} open>
      <div id="style-input" className="radio-list">
        <ImgRadio
          name="style-input"
          id="win11-style"
          defaultChecked
          img="win11"
          onChange={changeType("win11")}
        />
        <ImgRadio
          name="style-input"
          id="win10-style"
          img="win10"
          onChange={changeType("win10")}
        />
        <ImgRadio
          name="style-input"
          id="bigsur-style"
          img="bigsur"
          onChange={changeType("bigsur")}
        />
        <ImgRadio
          name="style-input"
          id="mint-l-style"
          img="mint-l"
          onChange={changeType("mint-l")}
        />
      </div>
      <FolderSmall />
    </Dropdown>
  );
}
