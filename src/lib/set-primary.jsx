import "@/styles/globals.css";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((r << 16) | (g << 8) | b).toString(16);
}

function mixColors(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = Math.floor((rgb1.r + rgb2.r) / 2);
  const g = Math.floor((rgb1.g + rgb2.g) / 2);
  const b = Math.floor((rgb1.b + rgb2.b) / 2);

  if (r === 0 && g === 0 && b === 0) return "#555555";

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  let clampedBrightness =
    brightness < 85 ? 85 : brightness > 221 ? 221 : brightness;

  const ratio = clampedBrightness / (brightness || 1);

  let finalR = Math.round(r * ratio);
  let finalG = Math.round(g * ratio);
  let finalB = Math.round(b * ratio);

  finalR = Math.min(255, Math.max(0, finalR));
  finalG = Math.min(255, Math.max(0, finalG));
  finalB = Math.min(255, Math.max(0, finalB));

  const actualBrightness = (finalR * 299 + finalG * 587 + finalB * 114) / 1000;
  if (actualBrightness < clampedBrightness && clampedBrightness === 85) {
    const needed = (85 - actualBrightness) * 1000;
    const totalWeight = 299 + 587 + 114;
    finalR = Math.min(
      255,
      finalR + Math.ceil(((299 / totalWeight) * needed) / 299)
    );
    finalG = Math.min(
      255,
      finalG + Math.ceil(((587 / totalWeight) * needed) / 587)
    );
    finalB = Math.min(
      255,
      finalB + Math.ceil(((114 / totalWeight) * needed) / 114)
    );
  } else if (
    actualBrightness > clampedBrightness &&
    clampedBrightness === 221
  ) {
    const excess = (actualBrightness - 221) * 1000;
    const totalWeight = 299 + 587 + 114;
    finalR = Math.max(
      0,
      finalR - Math.ceil(((299 / totalWeight) * excess) / 299)
    );
    finalG = Math.max(
      0,
      finalG - Math.ceil(((587 / totalWeight) * excess) / 587)
    );
    finalB = Math.max(
      0,
      finalB - Math.ceil(((114 / totalWeight) * excess) / 114)
    );
  }

  const finalMixedColor = rgbToHex(finalR, finalG, finalB);
  return finalMixedColor === "#000000" ? "#555555" : finalMixedColor;
}

export function setPrimary(colors = ["#6aff81", "#4788b8"]) {
  const mixedColor = mixColors(colors[0], colors[1]);
  const root = document.documentElement;
  root.style.setProperty("--primary", mixedColor);
}
