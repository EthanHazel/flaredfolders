"use client";

import React from "react";
import { default as NextImage } from "next/image";
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
    folderSize,
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
        (state) => state.gradientStartColor,
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
      base:
        !isIconOnly && `/images/folder-assets/${type}/${folderSize}/base.png`,
      highlight:
        !isIconOnly &&
        `/images/folder-assets/${type}/${folderSize}/highlight.png`,
      iconMask:
        !isIconOnly &&
        `/images/folder-assets/${type}/${folderSize}/${iconMask}.png`,
      satMask:
        !isIconOnly &&
        `/images/folder-assets/${type}/${folderSize}/saturation-mask.png`,
      mask:
        !isIconOnly && `/images/folder-assets/${type}/${folderSize}/mask.png`,
      default:
        !isIconOnly &&
        `/images/folder-assets/${type}/${folderSize}/default.png`,
      shadow:
        !isIconOnly &&
        `/images/folder-assets/${type}/${folderSize}/${iconShadowType}.png`,
      icon: await loadIcon(),
    };

    return {
      baseImg: imagePaths.base && (await loadImage(imagePaths.base)),
      icon: imagePaths.icon,
      highlightImg:
        imagePaths.highlight && (await loadImage(imagePaths.highlight)),
      iconMaskImg:
        imagePaths.iconMask && (await loadImage(imagePaths.iconMask)),
      satMaskImg: imagePaths.satMask && (await loadImage(imagePaths.satMask)),
      maskImg: imagePaths.mask && (await loadImage(imagePaths.mask)),
      defaultImg: imagePaths.default && (await loadImage(imagePaths.default)),
      shadowImg: imagePaths.shadow && (await loadImage(imagePaths.shadow)),
    };
  }

  // Load icon based on type
  async function loadIcon() {
    switch (iconType) {
      case "simple":
        return await loadSimple(simpleSlug, iconColor);
      case "lucide":
        return await loadLucide(lucideSlug, iconColor, lucideStrokeWidth);
      case "custom":
        return await loadCustom(customFileName);
      case "emoji":
        return await loadEmoji(emojiSlug);
      default:
        return null;
    }
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
      satMaskImg,
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
        satMaskImg,
        maskImg,
        shadowImg,
        colors,
        width,
        height,
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
    satMaskImg,
    maskImg,
    shadowImg,
    colors,
    width,
    height,
  ) {
    const cacheKey = `${colors[0]}-${colors[1]}-${width}-${height}-${folderType}`;

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
        applySolidColor(backgroundCtx, colors[2], width, height, satMaskImg);
      } else if (colorType === "linear-gradient") {
        applyGradientColor(backgroundCtx, colors, width, height, satMaskImg);
      }

      drawHighlight(backgroundCtx, highlightImg, width, height);
      applyMask(backgroundCtx, maskImg, width, height);
      drawShadow(backgroundCtx, shadowImg, width, height);

      ctx.drawImage(backgroundCanvas, 0, 0);
      backgroundCache.set(cacheKey, backgroundCanvas);
    }
  }

  // Apply solid color effect
  const solidColorCache = new Map();
  function applySolidColor(ctx, color, width, height, satMaskImg) {
    const solidKey = `${color}-${width}-${height}`;
    if (solidColorCache.has(solidKey)) {
      const solid = solidColorCache.get(solidKey);
      ctx.fillStyle = solid;
    } else {
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
      solidColorCache.set(solidKey, color);
    }
  }

  // Apply gradient color effect
  const gradientColorCache = new Map();
  function applyGradientColor(ctx, colors, width, height, satMaskImg) {
    const gradientKey = `${colors[0]}-${colors[1]}-${width}-${height}`;
    if (gradientColorCache.has(gradientKey)) {
      const cachedCanvas = gradientColorCache.get(gradientKey);
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(cachedCanvas, 0, 0);
    } else {
      // Create canvas for color 0
      const colorZeroCanvas = document.createElement("canvas");
      colorZeroCanvas.width = width;
      colorZeroCanvas.height = height;
      const zctx = colorZeroCanvas.getContext("2d");

      zctx.drawImage(satMaskImg, 0, 0, width, height);
      zctx.globalCompositeOperation = "source-in";

      // Draw color 0 and 1 gradient
      const gradient = zctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      zctx.fillStyle = gradient;
      zctx.fillRect(0, 0, width, height);

      // Draw color 1 to color 0
      zctx.globalCompositeOperation = "destination-atop";
      const gradient2 = zctx.createLinearGradient(0, 0, width, height);
      gradient2.addColorStop(0, colors[1]);
      gradient2.addColorStop(0.75, colors[0]);
      zctx.fillStyle = gradient2;
      zctx.fillRect(0, 0, width, height);

      // Draw the result to the main context
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(colorZeroCanvas, 0, 0);

      // Cache the canvas, not the gradient
      gradientColorCache.set(gradientKey, colorZeroCanvas);
    }
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
        cachedIcon.actualIconHeight,
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
          actualIconHeight,
        );
      } else {
        drawUnmaskedIcon(
          ctx,
          icon,
          drawX,
          drawY,
          actualIconWidth,
          actualIconHeight,
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
    iconHeight,
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
      shadowOpacity,
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
      shadowOpacity,
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
    shadowOpacity,
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
    <div className="folder-icon-container" id={id}>
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
      <NextImage
        src={
          "/images/folder-assets/" +
          type.replace("-box", "") +
          "/" +
          folderSize +
          "/default.png"
        }
        draggable={false}
        alt="folder"
        className="folder-default"
        width={folderSize}
        height={folderSize}
      />
    </div>
  );
}
