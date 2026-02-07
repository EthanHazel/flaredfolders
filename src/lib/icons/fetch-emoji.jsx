// fetch-emoji

const emojiCache = {};
const emojiLoadingPromises = {};

export const loadEmoji = (emoji) => {
  // Return cached image if available
  if (emojiCache[emoji]) {
    return emojiCache[emoji];
  }

  // Return existing promise if already loading
  if (emojiLoadingPromises[emoji]) {
    return emojiLoadingPromises[emoji];
  }

  // Create new loading promise
  emojiLoadingPromises[emoji] = (async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.font = "210px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const metrics = ctx.measureText(emoji);
      const x = 128;
      const y =
        128 +
        (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) /
          2;
      ctx.fillText(emoji, x, y);

      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () =>
          reject(new Error(`Failed to load emoji: ${emoji}`));
        image.crossOrigin = "anonymous";
        image.src = canvas.toDataURL();
      });

      emojiCache[emoji] = img;
      return img;
    } finally {
      delete emojiLoadingPromises[emoji];
    }
  })();

  return emojiLoadingPromises[emoji];
};
