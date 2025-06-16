import Logo from "./logo";
import HeaderButtons from "./header-buttons";

import "@/styles/header.css";

export default function Header() {
  return (
    <>
      <header id="header" data-tauri-drag-region>
        <Logo />
        <HeaderButtons />
      </header>
    </>
  );
}
