"use client";

import downscale from "downscale";

const imageCache = new Map();

async function isVectorImage(img) {
  const src = img.currentSrc || img.src || "";
  if (!src) return false;

  if (src.startsWith("data:")) {
    const afterData = src.substring(5); // remove "data:"
    const sepIndex = Math.min(
      afterData.indexOf(";") === -1 ? Infinity : afterData.indexOf(";"),
      afterData.indexOf(",") === -1 ? Infinity : afterData.indexOf(",")
    );
    const mime =
      sepIndex === Infinity ? afterData : afterData.substring(0, sepIndex);
    if (mime.includes("svg")) return true;
  }

  if (/\.(svg)(?:[\?#]|$)/i.test(src)) return true;

  try {
    const resp = await fetch(src, { method: "HEAD", cache: "no-store" });
    if (resp.ok) {
      const ct = resp.headers.get("content-type") || "";
      if (ct.includes("svg")) return true;
    }
  } catch (e) {
    // ignore fetch errors (likely CORS or network related issue) and we've already done extension/data-url checks above
  }

  return false;
}

/**
 * Downscale an image to the desired size, but skip vector images (SVG).
 * @param {HTMLImageElement} img - The source image.
 * @param {number} width - Target width.
 * @param {number} height - Target height.
 * @returns {Promise<HTMLImageElement>} A new image with the downscaled image, or the original img if skipped.
 */
export default async function downscaleIcon(img, width, height) {
  // Check if we've already downscaled this image
  const key = `${img.src}-${width}-${height}`;
  if (imageCache.has(key)) {
    console.info(`downscaleIcon: using cached image for ${key}`);
    return imageCache.get(key);
  }

  // If this looks like a vector (SVG), skip downscaling and return original image.
  try {
    if (await isVectorImage(img)) {
      console.info("downscaleIcon: skipping vector image (SVG).");
      return img;
    }
  } catch (err) {
    // If detection throws for any reason, log and continue to attempt downscale.
    console.warn(
      "downscaleIcon: vector-detection failed, attempting downscale anyway.",
      err
    );
  }

  try {
    // Use downscale to get a data URL
    const dataUrl = await downscale(img, width, height, {
      imageType: "image/png",
      quality: 0.9,
    });

    // Create an image from the data URL
    const newImg = new Image();
    newImg.src = dataUrl;

    await new Promise((resolve, reject) => {
      newImg.onload = resolve;
      newImg.onerror = reject;
    });

    // Cache the downscaled image
    imageCache.set(key, newImg);

    return newImg;
  } catch (err) {
    console.error("Downscale failed:", err);
    throw err;
  }
}
