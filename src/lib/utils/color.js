/** @param {string} hex */
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/** @param {number} r @param {number} g @param {number} b */
function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

/** @param {number} r @param {number} g @param {number} b */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
}

/** @param {number} h @param {number} s @param {number} l */
function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  h /= 360;

  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h) * 255,
    b: hue2rgb(p, q, h - 1 / 3) * 255,
  };
}

/**
 * Lightens (positive amount) or darkens (negative amount) a hex color.
 * @param {string} hex
 * @param {number} amount - fraction of lightness to add/subtract, e.g. 0.25
 */
export function adjustLightness(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newL = Math.max(0, Math.min(1, l + amount));
  const rgb = hslToRgb(h, s, newL);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Shifts a hex color's hue by the given number of degrees.
 * @param {string} hex
 * @param {number} degrees
 */
export function shiftHue(hex, degrees) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const rgb = hslToRgb(h + degrees, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Averages an array of hex colors together (component-wise RGB mean).
 * @param {string[]} hexColors
 * @returns {string}
 */
export function averageColors(hexColors) {
  const valid = (hexColors || []).filter(Boolean);
  if (valid.length === 0) return "#000000";

  let totalR = 0,
    totalG = 0,
    totalB = 0;

  for (const hex of valid) {
    const { r, g, b } = hexToRgb(hex);
    totalR += r;
    totalG += g;
    totalB += b;
  }

  const count = valid.length;
  return rgbToHex(totalR / count, totalG / count, totalB / count);
}

/**
 * Converts a hex color to HSL and clamps its lightness into a safe range,
 * so the color never gets so dark or so bright that text on top of it
 * becomes unreadable.
 * @param {string} hex
 * @param {number} [min=0.2] - minimum lightness, 0-1
 * @param {number} [max=0.8] - maximum lightness, 0-1
 */
export function clampLightness(hex, min = 0.2, max = 0.8) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const clampedL = Math.max(min, Math.min(max, l));
  const rgb = hslToRgb(h, s, clampedL);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}
