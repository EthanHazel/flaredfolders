"use client";

import FooterButtons from "../inputs/footer-buttons";
import Download from "../inputs/download";

import "@/styles/layout/footer.css";

export default function Footer() {
  return (
    <div id="footer">
      <FooterButtons />
      <Download />
    </div>
  );
}
