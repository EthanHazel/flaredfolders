"use client";

import FooterButtons from "../inputs/footer-buttons";
import Download from "../inputs/download";
import FooterDesktop from "../desktop/footer.desktop";

import { fetchClient } from "@/lib/client";

import "@/styles/layout/footer.css";

export default function Footer() {
  if (fetchClient() === "desktop") return <FooterDesktop />;
  return (
    <div id="footer">
      <FooterButtons />
      <Download />
    </div>
  );
}
