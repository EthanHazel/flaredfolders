"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";

import Loading from "../loading";
import { getIconAnchor } from "@/stores/folder-config";

import { loadLucide } from "@/lib/icons/fetch-lucide";
import { loadSimple } from "@/lib/icons/fetch-simple";
import { loadCustom } from "@/lib/icons/fetch-custom";
import { loadEmoji } from "@/lib/icons/fetch-emoji";
import downscaleIcon from "@/lib/icons/downscale-icon";

import { folderConfigStore } from "@/stores/folder-config";

import "@/styles/folder.css";

export default function FolderRender({ folderSize, id }) {
  const {
    colorType,
    gradientStartColor,
    gradientEndColor,
    solidColor,
    folderType,
    folderSmallType,
    iconType,
    iconScale,
    iconColor,
    iconOffset,
    iconOpacity,
    iconShadow,
    shadowOffset,
    shadowBlur,
    shadowColor,
    shadowOpacity,
    iconMasked,
    lucideSlug,
    lucideStrokeWidth,
    simpleSlug,
    emojiSlug,
    customFileName,
  } = useFolderConfigState();

  const colors = [gradientStartColor, gradientEndColor, solidColor];
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Precomputed values
  const isIconOnly =
    folderType === "icon-only" ||
    (folderSmallType === "iconOnly" && folderSize <= 32);
  const type = getFolderType(folderType, folderSmallType, folderSize);
  const iconMultiplier = getIconMultiplier(
    folderType,
    folderSmallType,
    folderSize
  );
  const iconMask = getIconMaskType(folderType, folderSize);
  const iconShadowType = getIconShadowType(folderType, folderSize);
  const iconAnchor =
    (folderSmallType === "squareAndIcon" || folderSmallType === "iconOnly") &&
    folderSize <= 32
      ? [0, 0]
      : getIconAnchor(folderType, folderSize);

  // Main effect for loading and drawing
  useEffect(() => {
    const loadAndDraw = async () => {
      try {
        const images = await loadRequiredImages();
        drawCanvas(images, colors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadAndDraw();
  }, [colors]);

  // Helper function to get all configuration state
  function useFolderConfigState() {
    return {
      colorType: folderConfigStore((state) => state.colorType),
      gradientStartColor: folderConfigStore(
        (state) => state.gradientStartColor
      ),
      gradientEndColor: folderConfigStore((state) => state.gradientEndColor),
      solidColor: folderConfigStore((state) => state.solidColor),
      folderType: folderConfigStore((state) => state.folderType),
      folderSmallType: folderConfigStore((state) => state.folderSmallType),
      iconType: folderConfigStore((state) => state.iconType),
      iconScale: folderConfigStore((state) => state.iconScale),
      iconColor: folderConfigStore((state) => state.iconColor),
      iconOffset: folderConfigStore((state) => state.iconOffset),
      iconOpacity: folderConfigStore((state) => state.iconOpacity),
      iconShadow: folderConfigStore((state) => state.iconShadow),
      shadowOffset: folderConfigStore((state) => state.shadowOffset),
      shadowBlur: folderConfigStore((state) => state.shadowBlur),
      shadowColor: folderConfigStore((state) => state.shadowColor),
      shadowOpacity: folderConfigStore((state) => state.shadowOpacity),
      iconMasked: folderConfigStore((state) => state.iconMasked),
      lucideSlug: folderConfigStore((state) => state.lucideSlug),
      lucideStrokeWidth: folderConfigStore((state) => state.lucideStrokeWidth),
      simpleSlug: folderConfigStore((state) => state.simpleSlug),
      emojiSlug: folderConfigStore((state) => state.emojiSlug),
      customFileName: folderConfigStore((state) => state.customFileName),
    };
  }

  // Determine folder type based on size and settings
  function getFolderType(folderType, folderSmallType, folderSize) {
    if (
      folderSmallType === "squareAndIcon" &&
      folderSize <= 32 &&
      folderType === "win11"
    ) {
      return folderType + "-box";
    }
    return folderType;
  }

  // Calculate icon multiplier based on folder settings
  function getIconMultiplier(folderType, folderSmallType, folderSize) {
    if (folderSmallType === "squareAndIcon" && folderSize <= 32) {
      return 1.5;
    }
    if (
      folderType === "icon-only" ||
      (folderSmallType === "iconOnly" && folderSize <= 32)
    ) {
      return 1.75;
    }
    return 1;
  }

  // Determine icon mask type
  function getIconMaskType(folderType, folderSize) {
    if (folderType === "win10" && folderSize !== 16) {
      return "icon-mask";
    }
    return "mask";
  }

  // Determine icon shadow type
  function getIconShadowType(folderType, folderSize) {
    if (folderType === "win10" && folderSize > 24) {
      return "shadow";
    }
    return "base";
  }

  // Convert hex to RGBA with opacity
  function getIconShadowColor(shadowColor, shadowOpacity) {
    const hex = shadowColor.replace(/^#/, "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${shadowOpacity / 100})`;
  }

  // Load required images based on configuration
  async function loadRequiredImages() {
    const imagePaths = {
      base: isIconOnly
        ? null
        : `/images/folder-assets/${type}/${folderSize}/base.png`,
      highlight: isIconOnly
        ? null
        : `/images/folder-assets/${type}/${folderSize}/highlight.png`,
      iconMask: isIconOnly
        ? null
        : `/images/folder-assets/${type}/${folderSize}/${iconMask}.png`,
      mask: isIconOnly
        ? null
        : `/images/folder-assets/${type}/${folderSize}/mask.png`,
      default: isIconOnly
        ? null
        : `/images/folder-assets/${type}/${folderSize}/default.png`,
      shadow: isIconOnly
        ? null
        : `/images/folder-assets/${type}/${folderSize}/${iconShadowType}.png`,
      icon: await loadIcon(),
    };

    return {
      baseImg: imagePaths.base ? await loadImage(imagePaths.base) : null,
      icon: imagePaths.icon,
      highlightImg: imagePaths.highlight
        ? await loadImage(imagePaths.highlight)
        : null,
      iconMaskImg: imagePaths.iconMask
        ? await loadImage(imagePaths.iconMask)
        : null,
      maskImg: imagePaths.mask ? await loadImage(imagePaths.mask) : null,
      defaultImg: imagePaths.default
        ? await loadImage(imagePaths.default)
        : null,
      shadowImg: imagePaths.shadow ? await loadImage(imagePaths.shadow) : null,
    };
  }

  // Load icon based on type
  async function loadIcon() {
    if (iconType === "simple") {
      return await loadSimple(simpleSlug, iconColor);
    }
    if (iconType === "lucide") {
      return await loadLucide(lucideSlug, iconColor, lucideStrokeWidth);
    }
    if (iconType === "custom") {
      return await loadCustom(customFileName);
    }
    if (iconType === "emoji") {
      return await loadEmoji(emojiSlug);
    }
    return null;
  }

  // Generic image loader with cache
  const imageCache = {};
  async function loadImage(src) {
    if (imageCache[src]) {
      return imageCache[src];
    }
    const imgPromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        imageCache[src] = img;
        resolve(img);
      };
      img.onerror = reject;
    });
    imageCache[src] = imgPromise;
    return imgPromise;
  }

  // Main canvas drawing function
  function drawCanvas(images, colors) {
    const {
      baseImg,
      icon,
      highlightImg,
      iconMaskImg,
      maskImg,
      defaultImg,
      shadowImg,
    } = images;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    setupCanvasRendering(ctx);
    clearCanvas(ctx, width, height);

    if (shouldDrawBackground()) {
      ctx.globalCompositeOperation = "source-over";
      drawBackground(
        ctx,
        folderType,
        baseImg,
        highlightImg,
        maskImg,
        shadowImg,
        colors,
        width,
        height
      );
    } else if (!isIconOnly) {
      drawDefaultImage(ctx, defaultImg, width, height);
    }

    if (shouldDrawIcon()) {
      drawIcon(ctx, icon, iconMaskImg, width, height);
    }
  }

  // Set up canvas rendering quality
  function setupCanvasRendering(ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }

  // Clear the canvas
  function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
  }

  // Determine if we should draw the background
  function shouldDrawBackground() {
    return !isIconOnly && colorType !== "original";
  }

  // Cache for background elements
  const backgroundCache = new Map();

  // Draw background elements
  function drawBackground(
    ctx,
    folderType,
    baseImg,
    highlightImg,
    maskImg,
    shadowImg,
    colors,
    width,
    height
  ) {
    const cacheKey = `${colors[0]}-${colors[1]}-${width}-${height}`;

    if (backgroundCache.has(cacheKey)) {
      const cachedBackground = backgroundCache.get(cacheKey);
      ctx.drawImage(cachedBackground, 0, 0);
    } else {
      const backgroundCanvas = document.createElement("canvas");
      backgroundCanvas.width = width;
      backgroundCanvas.height = height;
      const backgroundCtx = backgroundCanvas.getContext("2d");
      backgroundCtx.drawImage(baseImg, 0, 0, width, height);

      if (colorType === "solid") {
        applySolidColor(backgroundCtx, colors[2], width, height);
      } else if (colorType === "linear-gradient") {
        applyGradientColor(backgroundCtx, colors, width, height);
      }

      drawHighlight(backgroundCtx, highlightImg, width, height);
      applyMask(backgroundCtx, maskImg, width, height);
      drawShadow(backgroundCtx, shadowImg, width, height);

      ctx.drawImage(backgroundCanvas, 0, 0);
      backgroundCache.set(cacheKey, backgroundCanvas);
    }
  }

  // Apply solid color effect
  function applySolidColor(ctx, color, width, height) {
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }

  // Apply gradient color effect
  const gradientColorCache = new Map();
  function applyGradientColor(ctx, colors, width, height) {
    const gradientKey = `${colors[0]}-${colors[1]}`;

    if (gradientColorCache.has(gradientKey)) {
      const gradient = gradientColorCache.get(gradientKey);
      ctx.fillStyle = gradient;
    } else {
      const gradient = ctx.createLinearGradient(width, height, 0, 0);
      gradient.addColorStop(0, colors[1]);
      gradient.addColorStop(1, colors[0]);

      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = gradient;
      gradientColorCache.set(gradientKey, gradient);
    }

    ctx.fillRect(0, 0, width, height);
  }

  // Apply mask to canvas
  function applyMask(ctx, maskImg, width, height) {
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(maskImg, 0, 0, width, height);
  }

  // Draw highlight effect
  function drawHighlight(ctx, highlightImg, width, height) {
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(highlightImg, 0, 0, width, height);
  }

  // Draw shadow effect
  function drawShadow(ctx, shadowImg, width, height) {
    if (folderType === "win10" && folderSize > 24) {
      ctx.globalCompositeOperation = "darken";
      ctx.drawImage(shadowImg, 0, 0, width, height);
    }
  }

  // Draw default folder image
  function drawDefaultImage(ctx, defaultImg, width, height) {
    ctx.drawImage(defaultImg, 0, 0, width, height);
  }

  // Determine if we should draw the icon
  function shouldDrawIcon() {
    return (
      iconType !== "none" &&
      !(
        folderType === "win10" &&
        folderSize === 16 &&
        folderSmallType !== "iconOnly"
      ) &&
      (folderSmallType === "folderAndIcon" ||
        folderSmallType === "squareAndIcon" ||
        folderSize > 32 ||
        isIconOnly)
    );
  }

  // Draw icon on canvas
  const iconCache = new Map();
  function drawIcon(ctx, icon, iconMaskImg, width, height) {
    if (!icon) return;

    const iconKey = `${icon.src}-${iconScale}-${iconMultiplier}-${iconMasked}-${iconOpacity}-${iconShadow}-${shadowBlur}-${shadowOffset}-${shadowColor}-${shadowOpacity}-${iconAnchor[0]}-${iconAnchor[1]}-${iconOffset[0]}-${iconOffset[1]}`;

    if (iconCache.has(iconKey)) {
      const cachedIcon = iconCache.get(iconKey);
      drawUnmaskedIcon(
        ctx,
        cachedIcon,
        cachedIcon.drawX,
        cachedIcon.drawY,
        cachedIcon.actualIconWidth,
        cachedIcon.actualIconHeight
      );
    } else {
      const aspectRatio = icon.width / icon.height || 1;
      const scaledWidth = width;
      const scaledHeight = scaledWidth / aspectRatio;

      const actualIconWidth = scaledWidth * iconScale * iconMultiplier;
      const actualIconHeight = scaledHeight * iconScale * iconMultiplier;

      const iconOffsetX = Math.floor((iconOffset[0] / 100) * width);
      const iconOffsetY = Math.floor((iconOffset[1] / 100) * height);

      const iconX = (width - actualIconWidth) / 2;
      const iconY = (height - actualIconHeight) / 2;

      const drawX = iconX + iconAnchor[0] + iconOffsetX;
      const drawY = iconY + iconAnchor[1] + iconOffsetY;

      if (iconMasked) {
        drawMaskedIcon(
          ctx,
          icon,
          iconMaskImg,
          width,
          height,
          drawX,
          drawY,
          actualIconWidth,
          actualIconHeight
        );
      } else {
        drawUnmaskedIcon(
          ctx,
          icon,
          drawX,
          drawY,
          actualIconWidth,
          actualIconHeight
        );
      }

      // Cache the icon for future use
      iconCache.set(iconKey, {
        src: icon.src,
        drawX,
        drawY,
        actualIconWidth,
        actualIconHeight,
      });
    }
  }

  async function drawMaskedIcon(
    ctx,
    icon,
    iconMaskImg,
    width,
    height,
    x,
    y,
    iconWidth,
    iconHeight
  ) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");

    setupCanvasRendering(tempCtx);

    applyIconEffects(
      tempCtx,
      iconOpacity,
      iconShadow,
      shadowBlur,
      shadowOffset,
      shadowColor,
      shadowOpacity
    );

    await drawIconImage(tempCtx, icon, x, y, iconWidth, iconHeight);
    resetIconEffects(tempCtx);

    if (shouldApplyIconMask()) {
      tempCtx.globalCompositeOperation = "destination-in";
      tempCtx.drawImage(iconMaskImg, 0, 0, width, height);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(tempCanvas, 0, 0);
  }

  function drawUnmaskedIcon(ctx, icon, x, y, iconWidth, iconHeight) {
    ctx.globalCompositeOperation = "source-over";

    setupCanvasRendering(ctx);

    applyIconEffects(
      ctx,
      iconOpacity,
      iconShadow,
      shadowBlur,
      shadowOffset,
      shadowColor,
      shadowOpacity
    );

    drawIconImage(ctx, icon, x, y, iconWidth, iconHeight);
    resetIconEffects(ctx);
  }

  function applyIconEffects(
    ctx,
    opacity,
    shadow,
    shadowBlur,
    shadowOffset,
    shadowColor,
    shadowOpacity
  ) {
    ctx.globalAlpha = opacity;
    if (shadow) {
      ctx.shadowColor = getIconShadowColor(shadowColor, shadowOpacity);
      ctx.shadowBlur = (shadowBlur * folderSize) / 512;
      ctx.shadowOffsetX = Math.floor((shadowOffset[0] * folderSize) / 512);
      ctx.shadowOffsetY = Math.floor((shadowOffset[1] * folderSize) / 512);
    }
  }

  function resetIconEffects(ctx) {
    ctx.globalAlpha = 1;
    ctx.shadowColor = "transparent";
  }

  async function drawIconImage(ctx, icon, x, y, width, height) {
    const scaledIcon = await downscaleIcon(icon, width, height);
    ctx.drawImage(scaledIcon, x, y, width, height);
  }

  function shouldApplyIconMask() {
    return !isIconOnly;
  }

  return (
    <div
      className="folder-icon-container"
      id={id}
      style={{
        width: `calc(${folderSize}px + 2rem)`,
        height: `calc(${folderSize}px + 2rem)`,
      }}
    >
      {isLoading ? (
        <Loading size={folderSize} />
      ) : (
        <canvas
          ref={canvasRef}
          width={folderSize}
          height={folderSize}
          id={`folder-${folderSize}`}
        />
      )}
      <span className="folder-size">
        {folderSize} x {folderSize}
      </span>
    </div>
  );
}
