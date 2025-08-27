import React from "react";
import ReactDOMServer from "react-dom/server";

import { folderConfigStore } from "@/stores/folder-config";

const lucideIconCache = {};

export const convertLucideSlug = (slug) => {
  if (slug.includes("-")) {
    // Convert kebab-case to PascalCase
    return slug
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  } else {
    return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  }
};

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
  const cacheKey = `${slug}_${color}_${strokeWidth}`;
  if (lucideIconCache[cacheKey]) {
    return lucideIconCache[cacheKey];
  }

  try {
    const module = await import(`lucide-react`);
    const IconComponent = module[slug];

    // Render the icon to a string
    const svgString = ReactDOMServer.renderToString(
      React.createElement(IconComponent, {
        style: { color: color, strokeWidth: strokeWidth },
      })
    );

    const img = new Image();
    img.onload = () => {
      lucideIconCache[cacheKey] = img;
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgString
    )}`;
    return img;
  } catch (error) {
    console.error("Error loading Lucide icon:", error);
    throw error;
  }
};
