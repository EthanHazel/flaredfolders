import { hueShiftHex } from "../utils";

const backgroundCache = new Map();
const gradientColorCache = new Map();
const duoColorCache = new Map();

export default function drawBackground(
  ctx,
  baseImg,
  defaultImg,
  highlightImg,
  colorMaskImg,
  maskImg,
  shadowImg,
  size,
  configState,
) {
  const {
    folderType,
    colorType,
    colorOne,
    colorTwo,
    colorContrast,
    folderSmallType,
    solidHueShift,
  } = configState;

  const cacheKey = `${colorOne}-${colorTwo}-${size}-${folderType}-${colorContrast}-${folderSmallType}-${colorType}-${solidHueShift}`;

  // Return early if cached
  if (backgroundCache.has(cacheKey)) {
    ctx.drawImage(backgroundCache.get(cacheKey), 0, 0);
    return;
  }

  // Handle original color type
  if (colorType === "original") {
    ctx.drawImage(defaultImg, 0, 0, size, size);
    backgroundCache.set(cacheKey, defaultImg);
    return;
  }

  // Create off-screen canvas
  const backgroundCanvas = document.createElement("canvas");
  backgroundCanvas.width = size;
  backgroundCanvas.height = size;
  const backgroundCtx = backgroundCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  // Apply contrast and base image
  if (colorContrast !== 1) {
    backgroundCtx.filter = `contrast(${colorContrast})`;
  }
  backgroundCtx.drawImage(baseImg, 0, 0, size, size);
  backgroundCtx.filter = "none";

  // Apply color based on type
  const colors = [colorOne, colorTwo];

  switch (colorType) {
    case "solid":
      applyGradientColor(
        backgroundCtx,
        [hueShiftHex(colorOne, solidHueShift), colorOne],
        size,
        colorMaskImg,
        folderType,
        folderSmallType,
      );
      break;
    case "gradient":
      applyGradientColor(
        backgroundCtx,
        colors,
        size,
        colorMaskImg,
        folderType,
        folderSmallType,
      );
      break;
    case "duo":
      applyDuoColor(
        backgroundCtx,
        colors,
        size,
        colorMaskImg,
        folderType,
        folderSmallType,
      );
      break;
  }

  // Apply effects
  drawHighlight(backgroundCtx, highlightImg, size);
  applyMask(backgroundCtx, maskImg, size);
  drawShadow(backgroundCtx, folderType, shadowImg, size);

  // Draw and cache
  ctx.drawImage(backgroundCanvas, 0, 0);
  backgroundCache.set(cacheKey, backgroundCanvas);
}

function applyGradientColor(
  ctx,
  colors,
  size,
  colorMaskImg,
  folderType,
  folderSmallType,
) {
  const gradientKey = `${colors[0]}-${colors[1]}-${size}-${folderType}-${folderSmallType}`;

  if (gradientColorCache.has(gradientKey)) {
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(gradientColorCache.get(gradientKey), 0, 0);
    ctx.globalCompositeOperation = "source-over";
    return;
  }

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cctx = colorCanvas.getContext("2d");

  cctx.drawImage(colorMaskImg, 0, 0, size, size);
  cctx.globalCompositeOperation = "source-in";

  // First gradient
  const gradient = cctx.createLinearGradient(
    0,
    size / 2,
    size / (folderType === "win11" ? 5 : 2),
    size,
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  cctx.fillStyle = gradient;
  cctx.fillRect(0, 0, size, size);

  // Second gradient
  cctx.globalCompositeOperation = "destination-atop";
  const gradient2 = cctx.createLinearGradient(0, size / 8, 0, size);
  gradient2.addColorStop(0, colors[0]);
  gradient2.addColorStop(folderType === "win11" ? 0.3 : 1, colors[1]);
  cctx.fillStyle = gradient2;
  cctx.fillRect(0, 0, size, size);

  // Apply to main context
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(colorCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  gradientColorCache.set(gradientKey, colorCanvas);
}

function applyDuoColor(
  ctx,
  colors,
  size,
  colorMaskImg,
  folderType,
  folderSmallType,
) {
  const duoKey = `${colors[0]}-${colors[1]}-${size}-${folderType}-${folderSmallType}`;

  if (duoColorCache.has(duoKey)) {
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(duoColorCache.get(duoKey), 0, 0);
    ctx.globalCompositeOperation = "source-over";
    return;
  }

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cctx = colorCanvas.getContext("2d");

  cctx.drawImage(colorMaskImg, 0, 0, size, size);
  cctx.globalCompositeOperation = "source-in";
  cctx.fillStyle = colors[0];
  cctx.fillRect(0, 0, size, size);

  cctx.globalCompositeOperation = "destination-atop";
  cctx.fillStyle = colors[1];
  cctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(colorCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  duoColorCache.set(duoKey, colorCanvas);
}

function applyMask(ctx, maskImg, size) {
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(maskImg, 0, 0, size, size);
  ctx.globalCompositeOperation = "source-over";
}

function drawHighlight(ctx, highlightImg, size) {
  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(highlightImg, 0, 0, size, size);
  ctx.globalCompositeOperation = "source-over";
}

function drawShadow(ctx, folderType, shadowImg, size) {
  if (folderType === "win10" && size > 24) {
    ctx.globalCompositeOperation = "darken";
    ctx.drawImage(shadowImg, 0, 0, size, size);
    ctx.globalCompositeOperation = "source-over";
  }
}
