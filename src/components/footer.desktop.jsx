import { downloadIcoDesktop } from "@/functions/folder-generate";

import "@/styles/footer.css";

export default function FooterDesktop() {
  return (
    <div id="footer-desktop">
      <button className="secondary" onClick={downloadIcoDesktop}>
        Save .ICO
      </button>
      <button>Apply</button>
    </div>
  );
}
