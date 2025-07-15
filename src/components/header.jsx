"use client";

import Logo from "./logo";
import HeaderButtons from "./header-buttons";
import fetchClient from "@/lib/fetch-client";
import HeaderDesktop from "./header.desktop";

import "@/styles/header.css";

export default function Header() {
  if (fetchClient() === "desktop") return <HeaderDesktop />;
  return (
    <header id="header">
      <Logo />
      <HeaderButtons />
    </header>
  );
}
