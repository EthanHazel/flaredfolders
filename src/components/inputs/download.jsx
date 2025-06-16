"use client";

import DownloadCounter from "../download-count";

import { useState, useEffect } from "react";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { FolderGenerate } from "@/functions/folder-generate";

export default function Download() {
  const folderType = folderConfigStore((state) => state.folderType);
  const [fileType, setFileType] = useState(
    folderType === "bigsur" ? "icns" : "ico"
  );
  const [iconSize, setIconSize] = useState("all");
  const [sessionDownload, setSessionDownload] = useState(false);

  const iconType = folderConfigStore((state) => state.iconType);
  const lucideSlug = folderConfigStore((state) => state.lucideSlug);
  const simpleSlug = folderConfigStore((state) => state.simpleSlug);
  const customFileName = folderConfigStore((state) => state.customFileName);

  const t = useTranslations("download");

  useEffect(() => {
    if (folderType === "bigsur") {
      setFileType("icns");
    } else {
      setFileType("ico");
    }
  }, [folderType]);

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

  const handleDownload = async () => {
    FolderGenerate(fileType, iconSize, getName());

    if (sessionDownload) return;
    try {
      const response = await fetch("/api/downloads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderType }), // This is correct
      });

      if (!response.ok) {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          throw new Error(
            "Failed to increment download count",
            response.status
          );
        } else {
          console.log("Download increment triggered");
        }
      } else {
        setSessionDownload(true);
      }
    } catch (error) {
      console.error("Download count error:", error);
    }
  };

  return (
    <div id="download-container">
      <DownloadCounter />
      <select
        name="file-type"
        id="file-type"
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
      >
        {folderType !== "bigsur" && <option value="ico">{t("ico")}</option>}
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
          {folderType === "bigsur" && <option value="1024">{t("1024")}</option>}
          <option value="512">{t("512")}</option>
          <option value="256">{t("256")}</option>
          <option value="128">{t("128")}</option>
          {folderType !== "bigsur" && <option value="96">{t("96")}</option>}
          {folderType !== "bigsur" && folderType !== "mint-l" && (
            <option value="72">{t("72")}</option>
          )}
          <option value="64">{t("64")}</option>
          {folderType !== "bigsur" && <option value="48">{t("48")}</option>}
          <option value="32">{t("32")}</option>
          {folderType !== "bigsur" && <option value="24">{t("24")}</option>}
          <option value="16">{t("16")}</option>
        </select>
      )}

      <input
        type="button"
        value={t("download")}
        id="download-button"
        onClick={handleDownload}
      />
    </div>
  );
}
