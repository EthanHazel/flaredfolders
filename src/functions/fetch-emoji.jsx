const emojiCache = {};

export const loadEmoji = (emoji) => {
  if (!emojiCache[emoji]) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.font = "480px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(emoji);

    const x = 256;
    const y =
      256 +
      (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;

    ctx.fillText(emoji, x, y);

    emojiCache[emoji] = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.crossOrigin = "anonymous";
      img.src = canvas.toDataURL();
    });
  }

  return emojiCache[emoji];
};
