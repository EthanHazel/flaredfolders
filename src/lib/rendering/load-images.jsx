import {
  getFolderType,
  getIconShadowType,
  getIconMaskType,
} from "@/lib/rendering/get-info";

import { loadLucide } from "@/lib/icons/fetch-lucide";
import { loadSimple } from "@/lib/icons/fetch-simple";
import { loadCustom } from "@/lib/icons/fetch-custom";
import { loadEmoji } from "@/lib/icons/fetch-emoji";

// Generic image loader with cache
const imageCache = {};

// Load required images based on configuration
export async function loadRequiredImages(folderSize, configState, isIconOnly) {
  const {
    iconType,
    lucideSlug,
    lucideStrokeWidth,
    simpleSlug,
    emojiSlug,
    customFileName,
    folderType,
    folderSmallType,
    iconColor,
  } = configState;

  const type = getFolderType(folderType, folderSmallType, folderSize);
  const iconMask = getIconMaskType(type, folderSize);

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

  const iconShadowType = getIconShadowType(type, folderSize);

  const imagePaths = {
    base: !isIconOnly && `/images/folder-assets/${type}/${folderSize}/base.png`,
    highlight:
      !isIconOnly &&
      `/images/folder-assets/${type}/${folderSize}/highlight.png`,
    iconMask:
      !isIconOnly &&
      `/images/folder-assets/${type}/${folderSize}/${iconMask}.png`,
    colorMask:
      !isIconOnly &&
      `/images/folder-assets/${type}/${folderSize}/${folderType === "win10" && folderSize > 16 ? "icon-mask" : "color-mask"}.png`,
    mask: !isIconOnly && `/images/folder-assets/${type}/${folderSize}/mask.png`,
    default:
      !isIconOnly && `/images/folder-assets/${type}/${folderSize}/default.png`,
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
    iconMaskImg: imagePaths.iconMask && (await loadImage(imagePaths.iconMask)),
    colorMaskImg:
      imagePaths.colorMask && (await loadImage(imagePaths.colorMask)),
    maskImg: imagePaths.mask && (await loadImage(imagePaths.mask)),
    defaultImg: imagePaths.default && (await loadImage(imagePaths.default)),
    shadowImg: imagePaths.shadow && (await loadImage(imagePaths.shadow)),
  };
}
