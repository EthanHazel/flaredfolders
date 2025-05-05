import React from "react";
import ReactDOMServer from "react-dom/server";

import { folderConfigStore } from "../stores/folder-config";

export const checkLucide = async (slug) => {
  try {
    const module = await import("lucide-react");
    const IconComponent = module.default?.[slug] ?? module[slug];
    return !!IconComponent;
  } catch (error) {
    return false;
  }
};

export const setLucideSlug = (slug) => {
  const setLucideSlug = folderConfigStore.getState().setLucideSlug;
  if (checkLucide(slug)) {
    setLucideSlug(slug);
    return true;
  } else {
    return false;
  }
};

export const loadLucide = async (slug, color, strokeWidth) => {
  try {
    // Dynamically import the Lucide icon component
    const module = await import(`lucide-react`);
    const IconComponent = module[slug];

    // Render the icon to a string
    const svgString = ReactDOMServer.renderToString(
      React.createElement(IconComponent, {
        style: { color: color, strokeWidth: strokeWidth },
      })
    );

    // Create an image from the SVG string
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgString
      )}`;
    });
  } catch (error) {
    console.error("Error loading Lucide icon:", error);
    throw error;
  }
};
