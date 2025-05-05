import React from "react";
import ReactDOMServer from "react-dom/server";
import * as icons from "simple-icons";

import { folderConfigStore } from "../stores/folder-config";

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
  const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
  return icons[iconKey] ? true : false;
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
  try {
    const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
    const iconData = icons[iconKey];

    const svgString = ReactDOMServer.renderToString(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        viewBox="-2 -2 28 28"
      >
        <path d={iconData.path} />
      </svg>
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
    console.error("Error loading Simple icon:", error);
    throw error;
  }
};
