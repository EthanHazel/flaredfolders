"use client";

import FolderSmall from "./folder-small";
import Dropdown from "../inputs/dropdown";
import Radio from "../inputs/radio";

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
        <Radio
          name="style-input"
          id="win11-style"
          defaultChecked
          label={tc("win11")}
          onChange={changeType("win11")}
        />
        <Radio
          name="style-input"
          id="win10-style"
          label={tc("win10")}
          onChange={changeType("win10")}
        />
        <Radio
          name="style-input"
          id="bigsur-style"
          label={tc("bigsur")}
          onChange={changeType("bigsur")}
        />
        <Radio
          name="style-input"
          id="mint-l-style"
          label={tc("mint")}
          onChange={changeType("mint-l")}
        />
      </div>
      <FolderSmall />
    </Dropdown>
  );
}
