"use client";

import { useState } from "react";
import Image from "next/image";

import "@/styles/header.css";

export default function PanelToggleDesktop() {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    document.body.classList.toggle("panel-closed");
    setIsOpen(!isOpen);
  };

  return (
    <a className="header-desktop-button" onClick={handleClick}>
      <Image
        src={isOpen ? "/nav/max-right.png" : "/nav/min-right.png"}
        width={10}
        height={10}
        alt={isOpen ? "Minimize Panel" : "Maximize Panel"}
      />
    </a>
  );
}
