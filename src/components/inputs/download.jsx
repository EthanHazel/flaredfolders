"use client";

import { useState } from "react";

import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { FolderGenerate } from "@/components/folder/folder-generate";

export default function Download() {
  const [fileType, setFileType] = useState("ico");
  const [iconSize, setIconSize] = useState("all");

  const iconType = folderConfigStore((state) => state.iconType);
  const lucideSlug = folderConfigStore((state) => state.lucideSlug);
  const simpleSlug = folderConfigStore((state) => state.simpleSlug);
  const customFileName = folderConfigStore((state) => state.customFileName);

  const t = useTranslations("download");

  const getName = () => {
    let name = "";
    if (iconType === "simple") {
      name = simpleSlug;
    } else if (iconType === "lucide") {
      name = lucideSlug;
    } else if (iconType === "custom") {
      name = customFileName.replace(/\.[^.]+$/, "");
    }
    if (name === "") name = "folder";
    return name;
  };

  return (
    <div id="download-container">
      <select
        name="file-type"
        id="file-type"
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
      >
        <option value="ico">{t("ico")}</option>
        <option value="icns">{t("icns")}</option>
        <option value="png">{t("png")}</option>
      </select>
      {fileType === "png" && (
        <select
          name="icon-size"
          id="icon-size"
          value={iconSize}
          onChange={(e) => setIconSize(e.target.value)}
        >
          <option value="all">{t("allSizes")}</option>
          <option value="512">{t("512")}</option>
          <option value="256">{t("256")}</option>
          <option value="128">{t("128")}</option>
          <option value="96">{t("96")}</option>
          <option value="72">{t("72")}</option>
          <option value="64">{t("64")}</option>
          <option value="48">{t("48")}</option>
          <option value="32">{t("32")}</option>
          <option value="24">{t("24")}</option>
          <option value="16">{t("16")}</option>
        </select>
      )}
      <input
        type="button"
        value={t("download")}
        id="download-button"
        onClick={() => FolderGenerate(fileType, iconSize, getName())}
      />
    </div>
  );
}
