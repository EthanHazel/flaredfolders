"use client";

import { useState } from "react";

import { folderConfigStore } from "@/stores/folder-config";
import { FolderGenerate } from "@/components/folder/folder-generate";

export default function Download() {
  const [fileType, setFileType] = useState("ico");
  const [iconSize, setIconSize] = useState("all");

  const iconType = folderConfigStore((state) => state.iconType);
  const lucideSlug = folderConfigStore((state) => state.lucideSlug);
  const simpleSlug = folderConfigStore((state) => state.simpleSlug);
  const customFileName = folderConfigStore((state) => state.customFileName);

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
        <option value="ico">ICO (Windows & Linux)</option>
        <option value="icns">INCS (macOS)</option>
        <option value="png">PNG</option>
      </select>
      {fileType === "png" && (
        <select
          name="icon-size"
          id="icon-size"
          value={iconSize}
          onChange={(e) => setIconSize(e.target.value)}
        >
          <option value="all">All Sizes (Packaged ZIP)</option>
          <option value="512">512x512</option>
          <option value="256">256x256</option>
          <option value="128">128x128</option>
          <option value="96">96x96</option>
          <option value="72">72x72</option>
          <option value="64">64x64</option>
          <option value="48">48x48</option>
          <option value="32">32x32</option>
          <option value="24">24x24</option>
          <option value="16">16x16</option>
        </select>
      )}
      <input
        type="button"
        value="Download"
        id="download-button"
        onClick={() => FolderGenerate(fileType, iconSize, getName())}
      />
    </div>
  );
}
