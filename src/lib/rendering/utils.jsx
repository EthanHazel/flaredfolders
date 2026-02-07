import convert from "color-convert";

// Set up canvas rendering quality
export function setupCanvasRendering(ctx) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
}

// Hue shift a hex color
export function hueShiftHex(hex, amount) {
  amount /= 180;
  const hsl = convert.hex.hsl(hex);
  let newHue = hsl[0];
  newHue += amount * 180;
  newHue = (newHue + 360) % 360;
  hsl[0] = newHue;
  const result = "#" + convert.hsl.hex(hsl);
  return result;
}
