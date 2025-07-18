import SaveIcon from "./inputs/save-icon";

import { downloadIcoDesktop } from "@/lib/folder-generate";

import "@/styles/footer.css";

export default function FooterDesktop() {
  return (
    <div id="footer-desktop">
      <button className="secondary" onClick={downloadIcoDesktop}>
        Save .ICO
      </button>
      <SaveIcon />
    </div>
  );
}
