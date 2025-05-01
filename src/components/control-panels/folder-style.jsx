"use client";

import FolderSmall from "./folder-small";
import Dropdown from "../inputs/dropdown";
import Radio from "../inputs/radio";

import { folderConfigStore } from "@/stores/folder-config";

export default function FolderStyle() {
  const folderType = folderConfigStore((state) => state.folderType);

  const changeType = (newType) => () => {
    folderConfigStore.getState().setFolderType(newType);
  };

  return (
    <Dropdown name="Folder Style" open>
      <div id="style-input" className="radio-list">
        <Radio
          name="style-input"
          id="win11-style"
          defaultChecked
          label="Windows 11"
          onChange={changeType("win11")}
        />
        <Radio
          name="style-input"
          id="win10-style"
          label="Windows 10"
          onChange={changeType("win10")}
        />
        <Radio
          name="style-input"
          id="bigsur-style"
          label="MacOS Big Sur"
          onChange={changeType("bigsur")}
        />
        <Radio
          name="style-input"
          id="catalina-style"
          label="MacOS Catalina"
          onChange={changeType("catalina")}
        />
        <Radio
          name="style-input"
          id="mint-l-style"
          label="Linux Mint L"
          onChange={changeType("mint-l")}
        />
      </div>
      <FolderSmall />
    </Dropdown>
  );
}
