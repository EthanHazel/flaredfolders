"use client";

import { useEffect } from "react";

import Dropdown from "../inputs/dropdown";
import Radio from "../inputs/radio";

import { folderConfigStore } from "@/stores/folder-config";

export default function FolderSmall() {
  const folderSmallType = folderConfigStore((state) => state.folderSmallType);
  const setFolderSmallType = folderConfigStore(
    (state) => state.setFolderSmallType
  );

  const folderType = folderConfigStore((state) => state.folderType);

  if (folderSmallType === "folderAndIcon" && folderType === "win10") {
    setFolderSmallType("folderOnly");
    document.getElementById("lod-hide").checked = true;
  }

  useEffect(() => {
    // Hacky fix to a bug that I'm unsure the cause of. I'm pretty sure it's a race condition
    setFolderSmallType("squareAndIcon");
  }, []);

  return (
    <Dropdown name="Small Folder Config">
      <div id="lod-config" className="radio-list">
        <Radio
          name="lod-config"
          id="lod-square"
          onChange={() => setFolderSmallType("squareAndIcon")}
          label="Show icon with box background"
          defaultChecked
        />
        {folderType === "win11" && (
          <Radio
            name="lod-config"
            id="lod-show"
            onChange={() => setFolderSmallType("folderAndIcon")}
            label="Show icon with folder"
          />
        )}
        <Radio
          name="lod-config"
          id="lod-hide"
          onChange={() => setFolderSmallType("folderOnly")}
          label="Show folder only"
        />
      </div>
    </Dropdown>
  );
}
