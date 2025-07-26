import FooterButtons from "./inputs/footer-buttons";
import Download from "./inputs/download";
import DownloadCounter from "./download-count";

import "@/styles/footer.css";

export default function Footer() {
  return (
    <div id="footer">
      <FooterButtons />
      <Download />
    </div>
  );
}
