"use client";

import { useState } from "react";
import { Maximize, Minimize } from "lucide-react";

import "@/styles/inputs/panel-toggle.css";

export default function PanelToggle() {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    document.body.classList.toggle("panel-closed");
    setIsOpen(!isOpen);
  };

  return (
    <div id="panel-toggle" onClick={handleClick}>
      {isOpen ? <Maximize /> : <Minimize />}
    </div>
  );
}
