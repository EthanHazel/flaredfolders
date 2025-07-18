"use client";

import { desktopIcoPassthru, testSaveFile } from "@/lib/folder-generate";

export default function SaveIcon(icon) {
  return (
    <>
      <button onClick={() => testSaveFile()}>Test save file</button>
      <button onClick={() => desktopIcoPassthru()}>Save Icon</button>
    </>
  );
}
