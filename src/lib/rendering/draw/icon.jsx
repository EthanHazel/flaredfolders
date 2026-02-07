import {
  getIconMultiplier,
  getIconAnchor,
  getIconShadowColor,
} from "@/lib/rendering/get-info";
import { setupCanvasRendering } from "@/lib/rendering/utils";

const iconCache = new Map();
const pendingIconRenders = new Map();
const MAX_CACHE_SIZE = 100;

// Optimization 1: Use LRU cache instead of FIFO
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    // Remove if exists (to reinsert at end)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }
}

const lruIconCache = new LRUCache(MAX_CACHE_SIZE);

// Optimization 2: Memoize expensive calculations
const anchorCache = new Map();
function getCachedAnchor(folderType, folderSmallType, size) {
  if (
    (folderSmallType === "squareAndIcon" || folderSmallType === "iconOnly") &&
    size <= 32
  ) {
    return [0, 0];
  }

  const key = `${folderType}|${size}`;
  if (!anchorCache.has(key)) {
    anchorCache.set(key, getIconAnchor(folderType, size));
  }
  return anchorCache.get(key);
}

// Optimization 3: Pre-calculate common values to avoid repeated computation
function precalculateValues(icon, size, configState) {
  const { iconScale, iconOffset, folderType, folderSmallType } = configState;

  const iconMultiplier = getIconMultiplier(folderType, folderSmallType, size);
  const aspectRatio = icon.width / icon.height || 1;
  const actualIconWidth = size * iconScale * iconMultiplier;
  const actualIconHeight = (size / aspectRatio) * iconScale * iconMultiplier;
  const scaleFactor = size / 256;

  return {
    iconMultiplier,
    aspectRatio,
    actualIconWidth,
    actualIconHeight,
    scaleFactor,
  };
}

export default async function drawIcon(
  ctx,
  icon,
  iconMaskImg,
  size,
  configState,
) {
  if (!icon) return;

  const {
    iconScale,
    iconOffset,
    iconOpacity,
    iconShadow,
    shadowOffset,
    shadowBlur,
    shadowColor,
    shadowOpacity,
    iconMasked,
    folderType,
    folderSmallType,
  } = configState;

  const iconKey = `${icon.src}|${iconScale}|${folderType}|${folderSmallType}|${size}|${iconMasked}|${iconOpacity}|${iconShadow}|${shadowBlur}|${shadowOffset[0]},${shadowOffset[1]}|${shadowColor}|${shadowOpacity}|${iconOffset[0]},${iconOffset[1]}`;

  // Check LRU cache first
  const cached = lruIconCache.get(iconKey);
  if (cached) {
    ctx.drawImage(cached.canvas, 0, 0);
    return;
  }

  // Check if this render is already in progress
  if (pendingIconRenders.has(iconKey)) {
    const resultCanvas = await pendingIconRenders.get(iconKey);
    ctx.drawImage(resultCanvas, 0, 0);
    return;
  }

  // Start new render and track it
  const renderPromise = (async () => {
    try {
      // Pre-calculate all values
      const calculatedValues = precalculateValues(icon, size, configState);

      // Draw and cache
      const resultCanvas = await drawIconImage(
        size,
        icon,
        calculatedValues.actualIconWidth,
        calculatedValues.actualIconHeight,
        iconMasked ? iconMaskImg : null,
        configState,
        calculatedValues,
      );

      lruIconCache.set(iconKey, { canvas: resultCanvas });
      return resultCanvas;
    } finally {
      pendingIconRenders.delete(iconKey);
    }
  })();

  pendingIconRenders.set(iconKey, renderPromise);
  const resultCanvas = await renderPromise;
  ctx.drawImage(resultCanvas, 0, 0);
}

function drawIconCentered(
  ctx,
  icon,
  iconWidth,
  iconHeight,
  size,
  anchor,
  configState,
) {
  const { iconOffset } = configState;

  const scaleFactor = size / 256;
  let x = anchor[0] + iconOffset[0] * scaleFactor;
  let y = anchor[1] + iconOffset[1] * scaleFactor;

  let newWidth = Math.round(iconWidth);
  let newHeight = Math.round(iconHeight);

  let remainingWidth = size - newWidth;
  let remainingHeight = size - newHeight;

  // If remaining space is odd, add 1px to the icon dimension to center it properly
  if (remainingWidth & 1) {
    // Bitwise AND is faster than modulo
    newWidth += 1;
  }
  if (remainingHeight & 1) {
    newHeight += 1;
  }

  // Recalculate position after adjusting dimensions to ensure perfect centering
  const newX = Math.round(x + (size - newWidth) / 2);
  const newY = Math.round(y + (size - newHeight) / 2);

  ctx.drawImage(icon, newX, newY, newWidth, newHeight);
}

async function drawIconImage(
  size,
  icon,
  iconWidth,
  iconHeight,
  iconMaskImg,
  configState,
  calculatedValues,
) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", {
    willReadFrequently: false,
    // Optimization 7: Disable alpha if not needed (check your use case)
    // alpha: false, // Uncomment if transparency not needed
  });

  const { folderType, folderSmallType } = configState;

  const anchor = getCachedAnchor(folderType, folderSmallType, size);

  setupCanvasRendering(ctx);

  // Draw shadow first (if enabled)
  if (configState.iconShadow) {
    applyShadowEffects(ctx, configState, calculatedValues.scaleFactor);
    drawIconCentered(
      ctx,
      icon,
      iconWidth,
      iconHeight,
      size,
      anchor,
      configState,
    );
    resetShadowEffects(ctx);
  }

  // Draw the actual icon (without shadow)
  ctx.globalAlpha = configState.iconOpacity;
  drawIconCentered(ctx, icon, iconWidth, iconHeight, size, anchor, configState);

  // Apply mask if needed
  if (iconMaskImg) {
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(iconMaskImg, 0, 0, size, size);
  }

  return canvas;
}

function applyShadowEffects(ctx, configState, scaleFactor) {
  const { shadowBlur, shadowOffset, shadowColor, shadowOpacity } = configState;

  ctx.globalAlpha = shadowOpacity;
  ctx.shadowColor = getIconShadowColor(shadowColor, shadowOpacity);
  ctx.shadowBlur = shadowBlur * scaleFactor;
  ctx.shadowOffsetX = Math.floor(shadowOffset[0] * scaleFactor);
  ctx.shadowOffsetY = Math.floor(shadowOffset[1] * scaleFactor);
}

function resetShadowEffects(ctx) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
