import PanelToggle from "./inputs/panel-toggle";
import Logo from "./logo";

import "@/styles/header.css";

export default function Header() {
  return (
    <header id="header">
      <Logo />
      <PanelToggle />
    </header>
  );
}
