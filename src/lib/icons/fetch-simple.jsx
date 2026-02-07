// fetch-simple

import React from "react";
import ReactDOMServer from "react-dom/server";
import * as icons from "simple-icons";
import { folderConfigStore } from "@/stores/folder-config";

const simpleIconCache = {};
const simpleLoadingPromises = {};

export const convertSimpleSlug = (slug) => {
  return slug
    .replace(/-/g, "")
    .replace(/^\S|\S$/g, function (s) {
      return s.toUpperCase();
    })
    .replace(/\B\w/g, function (s) {
      return s.toLowerCase();
    });
};

export const checkSimple = (slug) => {
  const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`.replace(
    ".",
    "dot",
  );
  return !!icons[iconKey];
};

export const setSimpleSlug = (slug) => {
  const setSimpleSlugStore = folderConfigStore.getState().setSimpleSlug;
  if (checkSimple(slug)) {
    setSimpleSlugStore(slug);
    return true;
  } else {
    return false;
  }
};

export const loadSimple = async (slug, color) => {
  const cacheKey = `${slug}_${color}`;

  // Return cached image if available
  if (simpleIconCache[cacheKey]) {
    return simpleIconCache[cacheKey];
  }

  // Return existing promise if already loading
  if (simpleLoadingPromises[cacheKey]) {
    return simpleLoadingPromises[cacheKey];
  }

  // Create new loading promise
  simpleLoadingPromises[cacheKey] = (async () => {
    try {
      const iconKey =
        `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`.replace(".", "dot");
      const iconData = icons[iconKey];

      if (!iconData) {
        throw new Error(`Simple icon "${slug}" not found`);
      }

      const svgString = ReactDOMServer.renderToString(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          viewBox="-2 -2 28 28"
        >
          <path d={iconData.path} />
        </svg>,
      );

      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () =>
          reject(new Error(`Failed to load Simple icon SVG for ${slug}`));
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          svgString,
        )}`;
      });

      simpleIconCache[cacheKey] = img;
      return img;
    } catch (error) {
      console.error("Error loading Simple icon:", error);
      throw error;
    } finally {
      delete simpleLoadingPromises[cacheKey];
    }
  })();

  return simpleLoadingPromises[cacheKey];
};

export const loadSimpleColor = async (slug) => {
  try {
    const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
    const color = "#" + icons[iconKey].hex;
    return color;
  } catch (error) {
    console.error("Error loading Simple icon color:", error);
    throw error;
  }
};
