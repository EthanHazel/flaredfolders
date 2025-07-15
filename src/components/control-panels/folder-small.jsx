"use client";

import { useEffect } from "react";
import Dropdown from "../inputs/dropdown";
import Radio from "../inputs/radio";
import ImgRadio from "../inputs/img-radio";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";

export default function FolderSmall() {
  const folderType = folderConfigStore((state) => state.folderType);

  const folderSmallType = folderConfigStore((state) => state.folderSmallType);
  const setFolderSmallType = folderConfigStore(
    (state) => state.setFolderSmallType
  );

  useEffect(() => {
    if (folderType === "win11") {
      setFolderSmallType("squareAndIcon");
    }
  }, []); // Ducktape hack to fix a bug I'm not sure how to fix cause I can't find the origin.

  const t = useTranslations("panelTitles");
  const tc = useTranslations("smallFolderConfig");

  if (folderType !== "icon-only")
    return (
      <Dropdown name={t("smallConfig")} icon="FolderTree">
        <div id="lod-config" className="radio-list">
          {folderType === "win11" && (
            <ImgRadio
              name="lod-config"
              id="lod-square"
              onChange={() => setFolderSmallType("squareAndIcon")}
              img="small/win11-box"
              label={tc("squareAndIcon")}
              checked={folderSmallType === "squareAndIcon"}
            />
          )}
          <ImgRadio
            name="lod-config"
            id="lod-show"
            onChange={() => setFolderSmallType("folderAndIcon")}
            img={`small/${folderType}-icon`}
            label={tc("folderAndIcon")}
            checked={folderSmallType === "folderAndIcon"}
          />
          <ImgRadio
            name="lod-config"
            id="lod-hide"
            onChange={() => setFolderSmallType("folderOnly")}
            img={`normal/${folderType}`}
            label={tc("folderOnly")}
            checked={folderSmallType === "folderOnly"}
          />
          <ImgRadio
            name="lod-config"
            id="lod-icon"
            onChange={() => setFolderSmallType("iconOnly")}
            img="small/icon-only"
            label={tc("iconOnly")}
            checked={folderSmallType === "iconOnly"}
          />
        </div>
      </Dropdown>
    );
}
