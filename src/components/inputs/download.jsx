"use client";

import { useState } from "react";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { FolderGenerate } from "@/lib/folder-generate";
import { Download as DownloadIcon } from "lucide-react";

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
        body: JSON.stringify({ folderType }),
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
      <select
        name="file-type"
        id="file-type"
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
      >
        <option value="ico">{t("ico")}</option>
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
          {[512, 256, 128, 96, 72, 64, 48, 32, 24, 16].map((size) => (
            <option key={size} value={size}>
              {t(size.toString())}
            </option>
          ))}
        </select>
      )}

      <a type="button" className="icon-button" onClick={handleDownload}>
        <DownloadIcon />
        <span className="icon-button-label">{t("download")}</span>
      </a>
    </div>
  );
}
