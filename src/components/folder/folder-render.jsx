"use client";

import { useState, useEffect, useRef } from "react";
import { getIconAnchor } from "@/stores/folder-config";
import React from "react";

import { loadLucide } from "@/functions/fetch-lucide";
import { loadSimple } from "@/functions/fetch-simple";
import { loadCustom } from "@/functions/fetch-custom";

import { folderConfigStore } from "@/stores/folder-config";

import "@/styles/folder.css";

export default function FolderRender({ folderSize }) {
  const colorType = folderConfigStore((state) => state.colorType);

  const colors = [
    folderConfigStore((state) => state.gradientStartColor),
    folderConfigStore((state) => state.gradientEndColor),
    folderConfigStore((state) => state.solidColor),
  ];

  const folderType = folderConfigStore((state) => state.folderType);
  const folderSmallType = folderConfigStore((state) => state.folderSmallType);

  const iconType = folderConfigStore((state) => state.iconType);
  const iconScale = folderConfigStore((state) => state.iconScale);
  const iconColor = folderConfigStore((state) => state.iconColor);
  const iconOffset = folderConfigStore((state) => state.iconOffset);
  const iconOpacity = folderConfigStore((state) => state.iconOpacity);
  const iconShadow = folderConfigStore((state) => state.iconShadow);
  const iconMasked = folderConfigStore((state) => state.iconMasked);

  const lucideSlug = folderConfigStore((state) => state.lucideSlug);
  const lucideStrokeWidth = folderConfigStore(
    (state) => state.lucideStrokeWidth
  );

  const simpleSlug = folderConfigStore((state) => state.simpleSlug);

  const customFileName = folderConfigStore((state) => state.customFileName);

  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadIcon = async () => {
    if (iconType === "simple") {
      return await loadSimple(simpleSlug, iconColor);
    } else if (iconType === "lucide") {
      return await loadLucide(lucideSlug, iconColor, lucideStrokeWidth);
    } else if (iconType === "custom") {
      return await loadCustom(customFileName);
    }
  };

  const getType = () => {
    if (
      folderSmallType === "squareAndIcon" &&
      folderSize <= 32 &&
      folderType === "win11"
    ) {
      return folderType + "-box";
    } else {
      return folderType;
    }
  };

  const getIconMultiplier = () => {
    if (folderSmallType === "squareAndIcon" && folderSize <= 32) {
      return 1.5;
    } else {
      return 1;
    }
  };

  const getIconMask = () => {
    if ((folderType === "win10") & (folderSize !== 16)) {
      return `icon-mask`;
    } else {
      return `mask`;
    }
  };

  useEffect(() => {
    if (
      folderType === "bigsur" &&
      (folderSize === 24 ||
        folderSize === 48 ||
        folderSize === 72 ||
        folderSize === 96)
    )
      return;
    if (
      (folderType === "win11" ||
        folderType === "win10" ||
        folderType === "mint-l") &&
      folderSize === 1024
    )
      return;

    if (folderType === "mint-l" && folderSize === 72) return;

    const loadImages = async () => {
      try {
        const [baseImg, icon, highlightImg, iconMaskImg, maskImg, defaultImg] =
          await Promise.all([
            loadImage(`/folder-assets/${getType()}/${folderSize}/base.png`),
            loadIcon(),
            loadImage(
              `/folder-assets/${getType()}/${folderSize}/highlight.png`
            ),
            loadImage(
              `/folder-assets/${getType()}/${folderSize}/${getIconMask()}.png`
            ),
            loadImage(`/folder-assets/${getType()}/${folderSize}/mask.png`),
            loadImage(`/folder-assets/${getType()}/${folderSize}/default.png`),
          ]);

        drawCanvas(
          baseImg,
          icon,
          defaultImg,
          highlightImg,
          iconMaskImg,
          maskImg,
          colors
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, [colors]);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const drawCanvas = (
    baseImg,
    icon,
    defaultImg,
    highlightImg,
    iconMaskImg,
    maskImg,
    colors
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    // Enable smooth scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (colorType !== "original") {
      // Draw base image
      ctx.drawImage(baseImg, 0, 0, width, height);

      if (colorType === "solid") {
        // Draw solid color
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = colors[2];
        ctx.fillRect(0, 0, width, height);
      } else if (colorType === "linear-gradient") {
        // Create gradient
        const gradient = ctx.createLinearGradient(
          width,
          height, // Start point (bottom left)
          0,
          0 // End point (top right) - creates 45deg angle
        );
        gradient.addColorStop(0, colors[1]);
        gradient.addColorStop(1, colors[0]);

        // Draw gradient clipped by mask
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      // Draw default image
      ctx.drawImage(defaultImg, 0, 0, width, height);
    }

    // Apply mask (using alpha channel)
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(maskImg, 0, 0, width, height);

    // Draw highlight
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(highlightImg, 0, 0, width, height);

    if (
      iconType !== "none" &&
      (folderSmallType === "folderAndIcon" ||
        folderSmallType === "squareAndIcon" ||
        folderSize > 32)
    ) {
      const aspectRatio = icon.width / icon.height || 1; // Default to 1 if aspect ratio is undefined, to avoid NaN on Firefox
      console.log(aspectRatio);
      const scaledWidth = width;
      const scaledHeight = scaledWidth / aspectRatio;

      const iconOffsetX = (iconOffset[0] / 100) * scaledWidth;
      const iconOffsetY =
        (iconOffset[1] / 100) * scaledHeight + (height - scaledHeight) / 4;

      const iconX = (width - width * iconScale * getIconMultiplier()) / 2;
      const iconY = (height - height * iconScale * getIconMultiplier()) / 2;

      const iconAnchor =
        folderSmallType === "squareAndIcon" && folderSize <= 32
          ? [0, 0]
          : getIconAnchor(folderType, folderSize);

      if (iconMasked) {
        // Create temporary canvas for icon and mask
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d");

        // Draw icon onto temp canvas
        tempCtx.globalAlpha = iconOpacity;
        if (iconShadow) {
          tempCtx.shadowColor = "rgba(0, 0, 0, 0.15)";
          tempCtx.shadowBlur = (10 * folderSize) / 512;
          tempCtx.shadowOffsetX = 0;
          tempCtx.shadowOffsetY = 0;
        }

        tempCtx.drawImage(
          icon,
          iconX + iconAnchor[0] + iconOffsetX,
          iconY + iconAnchor[1] + iconOffsetY,
          scaledWidth * iconScale * getIconMultiplier(),
          scaledHeight * iconScale * getIconMultiplier()
        );
        tempCtx.globalAlpha = 1;
        tempCtx.shadowColor = "transparent";

        // Apply mask to temp canvas
        tempCtx.globalCompositeOperation = "destination-in";
        tempCtx.drawImage(iconMaskImg, 0, 0, width, height);

        // Draw temp canvas onto main context
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(tempCanvas, 0, 0);
      } else {
        // Draw icon directly without mask
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = iconOpacity;
        if (iconShadow) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
          ctx.shadowBlur = (10 * folderSize) / 512;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        ctx.drawImage(
          icon,
          iconX + iconAnchor[0] + iconOffsetX,
          iconY + iconAnchor[1] + iconOffsetY,
          width * iconScale * getIconMultiplier(),
          height * iconScale * getIconMultiplier()
        );
        ctx.globalAlpha = 1;
        ctx.shadowColor = "transparent";
      }
    }
  };

  if (
    folderType === "bigsur" &&
    (folderSize === 24 ||
      folderSize === 48 ||
      folderSize === 72 ||
      folderSize === 96)
  )
    return null;
  if ((folderType === "win11" || folderType === "win10") && folderSize === 1024)
    return null;

  return (
    <div
      className="folder-icon-container"
      key={folderSize}
      style={{
        width: "calc(" + folderSize + "px + 2rem)",
        height: "calc(" + folderSize + "px + 2rem)",
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <canvas
          ref={canvasRef}
          width={folderSize}
          height={folderSize}
          id={"folder-" + folderSize}
        />
      )}
      <span className="folder-size">
        {folderSize} x {folderSize}
      </span>
    </div>
  );
}
