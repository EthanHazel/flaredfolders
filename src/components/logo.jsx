"use client";

import { useEffect } from "react";
import { folderConfigStore } from "@/stores/folder-config";
import packageJson from "../../package.json";

export default function Logo() {
  const colorType = folderConfigStore((state) => state.colorType);
  const gradientStartColor = folderConfigStore(
    (state) => state.gradientStartColor
  );
  const gradientEndColor = folderConfigStore((state) => state.gradientEndColor);
  const solidColor = folderConfigStore((state) => state.solidColor);

  const getFill = () => {
    if (colorType === "linear-gradient") {
      return [gradientStartColor, gradientEndColor];
    } else if (colorType === "solid") {
      return [solidColor, solidColor];
    } else {
      return ["#fee394", "#dfa52e"];
    }
  };

  const version = packageJson.version;

  useEffect(() => {
    const updateFavicon = () => {
      const svgElement = document.querySelector("#a");
      let svgData = new XMLSerializer().serializeToString(svgElement);
      // give white background only for the favicon
      svgData = svgData.replace(`fill="var(--text)"`, `fill="#1f2937"`);
      svgData = svgData.replace(
        `viewBox="0 0 149.74 124.78"`,
        `viewBox="-15 -27.5 180 180"> <rect
            x="-15"
            y="-27.5"
            width="180"
            height="180"
            rx="35"
            fill="white"
          />`
      );
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = url;
      document.head.appendChild(link);

      return () => {
        URL.revokeObjectURL(url);
        document.head.removeChild(link);
      };
    };

    const unsubscribe = folderConfigStore.subscribe(updateFavicon, (state) => [
      state.colorType,
      state.gradientStartColor,
      state.gradientEndColor,
      state.solidColor,
    ]);

    updateFavicon();

    return () => unsubscribe();
  }, []);

  return (
    <div className="header-container">
      <span className="header-logo">
        <svg id="a" viewBox="0 0 149.74 124.78">
          <defs>
            <linearGradient
              id="b"
              x1="74.87"
              y1="0"
              x2="149.74"
              y2="124.78"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor={getFill()[0]} />
              <stop offset="1" stopColor={getFill()[1]} />
            </linearGradient>
          </defs>
          <path
            d="M74.87,24.96v24.96h46.91c1.66,0,3,1.34,3,3v18.96c0,1.66-1.34,3-3,3h-46.91v21.96c0,1.66,1.34,3,3,3h43.91c1.66,0,3,1.34,3,3v21.96h14.96c5.52,0,10-4.48,10-10V34.96c0-5.52-4.48-10-10-10H74.87Z"
            fill="url(#b)"
          />
          <path
            d="M24.96,46.91V27.96c0-1.66,1.34-3,3-3h46.91L52.84,2.93c-1.88-1.88-4.42-2.93-7.07-2.93H10C4.48,0,0,4.48,0,10V114.78c0,5.52,4.48,10,10,10h14.96v-46.91c0-1.66,1.34-3,3-3h46.91v-24.96H27.96c-1.66,0-3-1.34-3-3Z"
            fill="var(--text)"
          />
        </svg>
      </span>
      <h1 className="header-title">FlaredFolders</h1>
      <span className="header-version">{version}</span>
    </div>
  );
}
