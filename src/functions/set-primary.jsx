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

  const mixedColor = rgbToHex(r, g, b);
  return mixedColor;
}

export function setPrimary(colors = ["#6aff81", "#4788b8"]) {
  const mixedColor = mixColors(colors[0], colors[1]);
  const root = document.documentElement;
  root.style.setProperty("--primary", mixedColor);
}
