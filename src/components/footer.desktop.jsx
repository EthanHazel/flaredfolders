import IconButton from "./inputs/icon-button";

import { downloadIcoDesktop, desktopIcoPassthru } from "@/lib/folder-generate";

import { FolderInput, Save } from "lucide-react";

import "@/styles/footer.css";

export default function FooterDesktop() {
  return (
    <div id="footer-desktop">
      <IconButton
        onClick={downloadIcoDesktop}
        label="Save as .ICO"
        className="footer-button"
        icon={<Save />}
      />
      <IconButton
        onClick={() => desktopIcoPassthru()}
        label="Apply to folder"
        className="footer-button"
        icon={<FolderInput />}
      />
    </div>
  );
}
