import React from "react";
import ReactDOMServer from "react-dom/server";

import { folderConfigStore } from "@/stores/folder-config";

const lucideIconCache = {};
const loadingPromises = {}; // Track in-flight requests

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

  // Return cached image if available
  if (lucideIconCache[cacheKey]) {
    return lucideIconCache[cacheKey];
  }

  // Return existing promise if already loading
  if (loadingPromises[cacheKey]) {
    return loadingPromises[cacheKey];
  }

  // Create new loading promise
  loadingPromises[cacheKey] = (async () => {
    try {
      const module = await import(`lucide-react`);
      const IconComponent = module[slug];

      if (!IconComponent) {
        throw new Error(`Icon "${slug}" not found in lucide-react`);
      }

      // Render the icon to a string
      const svgString = ReactDOMServer.renderToString(
        React.createElement(IconComponent, {
          style: { color: color, strokeWidth: strokeWidth },
        }),
      );

      // Wait for image to load before returning
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () =>
          reject(new Error(`Failed to load SVG for ${slug}`));
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          svgString,
        )}`;
      });

      // Cache the loaded image
      lucideIconCache[cacheKey] = img;

      return img;
    } catch (error) {
      console.error("Error loading Lucide icon:", error);
      throw error;
    } finally {
      // Clean up loading promise
      delete loadingPromises[cacheKey];
    }
  })();

  return loadingPromises[cacheKey];
};
