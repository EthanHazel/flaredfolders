// Helper function to convert emoji to Twemoji code point format
const emojiToCodePoint = (emoji) => {
  const codePoints = [];
  for (let i = 0; i < emoji.length; i++) {
    const code = emoji.codePointAt(i);
    if (code > 0xffff) {
      i++; // Skip next surrogate pair
    }
    codePoints.push(code.toString(16));
  }
  return codePoints.join("-");
};

export const loadEmoji = (emoji) => {
  if (typeof window === "undefined") {
    return Promise.resolve({
      src: "",
      width: 0,
      height: 0,
      onload: null,
    });
  }

  const codePoint = emojiToCodePoint(emoji);
  const url = `/emoji/${codePoint}.svg`;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.crossOrigin = "anonymous";
    img.src = url;
  });
};
