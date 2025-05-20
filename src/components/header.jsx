import Logo from "./logo";
import HeaderButtons from "./header-buttons";

import "@/styles/header.css";

export default function Header() {
  return (
    <>
      <header id="header">
        <Logo />
        <HeaderButtons />
      </header>
    </>
  );
}
