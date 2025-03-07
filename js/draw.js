const C512 = document.getElementById("512");
const C256 = document.getElementById("256");
const C128 = document.getElementById("128");
const C96 = document.getElementById("96");
const C72 = document.getElementById("72");
const C64 = document.getElementById("64");
const C32 = document.getElementById("32");
const C24 = document.getElementById("24");
const C16 = document.getElementById("16");

const COLOR_1 = document.getElementById("folder-color-1");
const COLOR_2 = document.getElementById("folder-color-2");

const ICON_SRC = document.getElementById("real-icon");
const ICON_SIZE = document.getElementById("icon-size");
const ICON_X_OFFSET = document.getElementById("icon-x-offset");
const ICON_Y_OFFSET = document.getElementById("icon-y-offset");
const ICON_MASK = document.getElementById("icon-mask");
const ICON_SHADOW = document.getElementById("icon-shadow");
const ICON_SMALL = document.getElementById("icon-small");
const ICON_COLOR = document.getElementById("icon-color");
const ICON_OPACITY = document.getElementById("icon-opacity");

const DOWNLOAD_NAME = document.getElementById("download-name");
const DOWNLOAD_PNG = document.getElementById("download-png");
const DOWNLOAD_ICO = document.getElementById("download-ico");

// Helper function to load images with Promises
function loadImage(src, signal) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Add CORS attribute
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;

    // Abort handling
    if (signal) {
      signal.addEventListener("abort", () => {
        img.src = ""; // Cancel the image load
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}

const disabledHandler = () => {
  ICON_COLOR.disabled = currentMode == UPLOAD_ICON || currentMode == NO_ICON;
  ICON_OPACITY.disabled = currentMode == NO_ICON;
  ICON_SIZE.disabled = currentMode == NO_ICON;
  ICON_X_OFFSET.disabled = currentMode == NO_ICON;
  ICON_Y_OFFSET.disabled = currentMode == NO_ICON;
  ICON_MASK.disabled = currentMode == NO_ICON;
  ICON_SHADOW.disabled = currentMode == NO_ICON;
  ICON_SMALL.disabled = currentMode == NO_ICON;
  document.getElementById("settings").disabled = currentMode == NO_ICON;
};

const drawIcon = async (ctx, iconUrl, size, xOffset, yOffset, signal) => {
  try {
    const icon = await loadImage(iconUrl, signal).catch((error) => {
      throw new Error(`Failed to load icon: ${error.message}`);
    });

    const iconSize = Math.ceil(512 * (ICON_SIZE.value / 50));
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 512;
    tempCanvas.height = 512;
    const tempCtx = tempCanvas.getContext("2d");
    const iconAspectRatio = icon.width / icon.height;

    // Determine the correct dimensions for the icon
    let width;
    let height;
    if (currentMode === UPLOAD_ICON && iconAspectRatio > 1) {
      width = iconSize;
      height = iconSize / iconAspectRatio;
    } else {
      width = iconSize;
      height = iconSize;
    }

    // Draw original icon onto temp canvas
    const centerX = tempCanvas.width / 2 - width / 2 + xOffset;
    const centerY = tempCanvas.height / 2 - height / 2 + yOffset;
    tempCtx.drawImage(icon, centerX, centerY, width, height);

    // Apply color if needed
    if (
      (currentMode === SIMPLE_ICON || currentMode === LUCIDE_ICON) &&
      ICON_COLOR.value
    ) {
      tempCtx.globalCompositeOperation = "source-in";
      tempCtx.fillStyle = `${ICON_COLOR.value}`;
      tempCtx.fillRect(0, 0, 512, 512);
      tempCtx.globalCompositeOperation = "source-over";
    }

    // Apply icon opacity
    if (ICON_OPACITY.value !== "100") {
      ctx.globalAlpha = parseInt(ICON_OPACITY.value, 10) / 100;
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(tempCanvas, 0, 0, size, size);

    // Draw shadow as separate layer if enabled
    if (ICON_SHADOW.checked) {
      // Save current context state
      const prevShadowColor = ctx.shadowColor;
      const prevShadowBlur = ctx.shadowBlur;

      // Apply shadow settings
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 3 * (size / 100);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw shadow layer
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(tempCanvas, 0, 0, size, size);

      // Restore original context state
      ctx.shadowColor = prevShadowColor;
      ctx.shadowBlur = prevShadowBlur;
    }

    // Restore original alpha value
    if (ICON_OPACITY.value !== "100") {
      ctx.globalAlpha = 1;
    }
  } catch (error) {
    if (
      error.name !== "AbortError" &&
      error.message !== "Aborted" &&
      error.message !== "Failed to load icon: Aborted"
    ) {
      console.error("Icon drawing failed:", error);
      // Fallback to default icon
      const fallbackIcon = await loadImage("default-icon.png", signal);
      ctx.drawImage(fallbackIcon, 0, 0, size, size);
    }
  }
};

const drawHighlight = async (ctx, size, signal) => {
  try {
    // Draw highlight image
    const highlightImage = await loadImage(`png/${size}/highlight.png`, signal);
    ctx.globalCompositeOperation = "lighten";
    ctx.globalAlpha = 0.3;
    ctx.drawImage(highlightImage, 0, 0, size, size);
    ctx.globalAlpha = 1;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Highlight drawing failed:", error);
    }
  }
};

let abortController = new AbortController();

const generateFolders = async () => {
  // Abort any ongoing execution
  abortController.abort();
  abortController = new AbortController(); // Create a new AbortController for the current execution

  const color = [COLOR_1.value, COLOR_2.value];

  const drawImageOnCanvas = async (canvas, size) => {
    canvas.classList.remove("fade-in");
    canvas.classList.add("no-opacity");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, size, size);

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, color[0]);
    gradient.addColorStop(1, color[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Apply mask
    const mask = await loadImage(
      `png/${size}/mask.png`,
      abortController.signal
    );
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(mask, 0, 0, size, size);
    ctx.globalCompositeOperation = "source-over";

    // Draw base image
    const baseImage = await loadImage(
      `png/${size}/base.png`,
      abortController.signal
    );
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(baseImage, 0, 0, size, size);

    // Draw icon if present
    if (
      ((currentMode === UPLOAD_ICON && ICON_SRC.files[0]) ||
        (currentMode === SIMPLE_ICON && currentSimpleImage) ||
        (currentMode === LUCIDE_ICON && currentLucideImage)) &&
      (ICON_SMALL.checked || size >= 48)
    ) {
      let iconUrl;
      if (currentMode === UPLOAD_ICON) {
        iconUrl = URL.createObjectURL(ICON_SRC.files[0]);
      } else if (currentMode === SIMPLE_ICON) {
        iconUrl = await currentSimpleImage;
      } else if (currentMode === LUCIDE_ICON) {
        iconUrl = await currentLucideImage;
      }
      await drawIcon(
        ctx,
        iconUrl,
        size,
        parseInt(ICON_X_OFFSET.value),
        parseInt(ICON_Y_OFFSET.value),
        abortController.signal
      );
    }
    if (ICON_MASK.checked) {
      const mask = await loadImage(
        `png/${size}/mask.png`,
        abortController.signal
      );
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, size, size);
    }
    // Draw highlight image
    await drawHighlight(ctx, size, abortController.signal);

    // Give fade in animation to the canvas
    canvas.classList.add("fade-in");
    canvas.classList.remove("no-opacity");
  };

  try {
    // Draw all canvases in parallel
    await Promise.all([
      [512, 256, 128, 96, 72, 64, 32, 24, 16].map((size) =>
        drawImageOnCanvas(eval(`C${size}`), size)
      ),
    ]);
  } catch (error) {
    if (error.name === "AbortError" && error.message === "Aborted") {
      console.log("Folder generation was aborted.");
    } else {
      console.error("Error generating folders:", error);
    }
  }
};

const downloadPng = async () => {
  const pngs = [C512, C256, C128, C96, C72, C64, C32, C24, C16];
  const zip = new JSZip();
  const zipFilename = `${DOWNLOAD_NAME.value}.zip`;

  // Add all PNGs to the ZIP
  pngs.forEach((canvas) => {
    const dataURL = canvas.toDataURL("image/png");
    const base64Data = dataURL.split(",")[1];
    zip.file(`${DOWNLOAD_NAME.value}-${canvas.id}.png`, base64Data, {
      base64: true,
    });
  });

  // Generate ZIP and trigger download
  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.download = zipFilename;
  link.href = URL.createObjectURL(content);
  link.click();
  URL.revokeObjectURL(link.href); // Clean up
};

const downloadIco = async () => {
  try {
    const canvases = [C512, C256, C128, C96, C72, C64, C32, C24, C16];

    // Convert all canvases to PNG buffers
    const images = await Promise.all(
      canvases.map(async (canvas) => {
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        const buffer = await blob.arrayBuffer();
        return {
          data: new Uint8Array(buffer),
          width: canvas.width,
          height: canvas.height,
        };
      })
    );

    // Calculate buffer sizes
    const headerSize = 6;
    const directoryEntrySize = 16;
    const directoriesSize = images.length * directoryEntrySize;
    const totalImageSize = images.reduce(
      (sum, img) => sum + img.data.length,
      0
    );
    const totalSize = headerSize + directoriesSize + totalImageSize;

    // Create final buffer
    const finalBuffer = new Uint8Array(totalSize);

    // Write ICO header
    const header = new DataView(new ArrayBuffer(headerSize));
    header.setUint16(0, 0, true); // Reserved
    header.setUint16(2, 1, true); // Image type (ICO)
    header.setUint16(4, images.length, true); // Number of images
    finalBuffer.set(new Uint8Array(header.buffer), 0);

    // Write directory entries and calculate offsets
    let dataOffset = headerSize + directoriesSize;
    const dataOffsets = [];
    images.forEach((img, index) => {
      const entry = new DataView(new ArrayBuffer(directoryEntrySize));
      entry.setUint8(0, img.width); // Width
      entry.setUint8(1, img.height); // Height
      entry.setUint8(2, 0); // Color palette
      entry.setUint8(3, 0); // Reserved
      entry.setUint16(4, 1, true); // Color planes
      entry.setUint16(6, 32, true); // Bits per pixel
      entry.setUint32(8, img.data.length, true); // Data size
      entry.setUint32(12, dataOffset, true); // Data offset

      // Write directory entry to final buffer
      finalBuffer.set(
        new Uint8Array(entry.buffer),
        headerSize + index * directoryEntrySize
      );

      dataOffsets.push(dataOffset);
      dataOffset += img.data.length;
    });

    // Write image data and clear references
    images.forEach((img, index) => {
      finalBuffer.set(img.data, dataOffsets[index]);
      img.data = null; // Release reference to image data
    });

    // Create and cleanup download link
    const blob = new Blob([finalBuffer], { type: "image/x-icon" });
    const link = document.createElement("a");
    link.download = DOWNLOAD_NAME.value + ".ico";
    link.href = URL.createObjectURL(blob);

    // Use hidden link and proper cleanup
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
  } catch (error) {
    console.error("ICO creation failed:", error);
    alert("Error generating ICO file - check console for details");
  }
};

DOWNLOAD_ICO.addEventListener("click", downloadIco);
DOWNLOAD_PNG.addEventListener("click", downloadPng);

// Attach event listeners
const inputs = [
  ICON_SIZE,
  ICON_X_OFFSET,
  ICON_Y_OFFSET,
  ICON_MASK,
  ICON_SHADOW,
  ICON_SMALL,
  ICON_COLOR,
  ICON_OPACITY,
  COLOR_1,
  COLOR_2,
];
inputs.forEach((input) => input.addEventListener("change", generateFolders));
inputs.forEach((input) => input.addEventListener("change", disabledHandler));

// Initial generation
generateFolders();
disabledHandler();
