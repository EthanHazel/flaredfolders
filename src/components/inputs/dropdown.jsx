"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import "@/styles/inputs/dropdown.css";

export default function Dropdown({ children, open = false, name }) {
  const [isOpen, setOpen] = useState(open);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-icon">
          <ChevronRight
            className={`chevron ${isOpen ? "open" : ""}`}
            size={20}
          />
        </span>
        <span className="dropdown-name">{name}</span>
        <hr className="dropdown-divider" />
      </div>
      <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}
