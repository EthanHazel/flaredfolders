"use client";

import FooterButtons from "./inputs/footer-buttons";
import Download from "./inputs/download";
import FooterDesktop from "./footer.desktop";

import fetchClient from "@/lib/fetch-client";

import "@/styles/footer.css";

export default function Footer() {
  if (fetchClient() === "desktop") return <FooterDesktop />;
  return (
    <div id="footer">
      <FooterButtons />
      <Download />
    </div>
  );
}
