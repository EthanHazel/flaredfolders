"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import "@/styles/inputs/dropdown.css";

export default function Dropdown({
  children,
  open = false,
  name,
  icon = "Image",
}) {
  const [isOpen, setOpen] = useState(open);
  const [IconComponent, setIconComponent] = useState(null);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const iconModule = await import(`lucide-react`);
        const DynamicIcon = iconModule[icon];
        if (DynamicIcon) {
          setIconComponent(() => DynamicIcon);
        } else {
          console.warn(`Icon "${icon}" not found in lucide-react`);
        }
      } catch (err) {
        console.error("Error loading icon:", err);
      }
    };

    loadIcon();
  }, [icon]);

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-symbol">
          {IconComponent ? <IconComponent size={20} /> : null}
        </span>
        <span className="dropdown-name">{name}</span>
        <hr className="dropdown-divider" />
        <span className="dropdown-icon">
          <ChevronRight
            className={`chevron ${isOpen ? "open" : ""}`}
            size={20}
          />
        </span>
      </div>
      <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}
