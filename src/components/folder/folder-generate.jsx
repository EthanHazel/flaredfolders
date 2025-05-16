"use client";

import JSZip from "jszip";

const downloadIco = async (name = "folder") => {
  try {
    const canvasIds = [512, 256, 128, 96, 72, 64, 48, 32, 24, 16];
    const canvases = canvasIds
      .map((id) => document.getElementById(`folder-${id}`))
      .filter((canvas) => !!canvas);

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

    const headerSize = 6;
    const directoryEntrySize = 16;
    const directoriesSize = images.length * directoryEntrySize;
    const totalImageSize = images.reduce(
      (sum, img) => sum + img.data.length,
      0
    );
    const totalSize = headerSize + directoriesSize + totalImageSize;

    const finalBuffer = new Uint8Array(totalSize);

    const header = new DataView(new ArrayBuffer(headerSize));
    header.setUint16(0, 0, true);
    header.setUint16(2, 1, true);
    header.setUint16(4, images.length, true);
    finalBuffer.set(new Uint8Array(header.buffer), 0);

    let dataOffset = headerSize + directoriesSize;
    const dataOffsets = [];

    images.forEach((img, index) => {
      const entry = new DataView(new ArrayBuffer(directoryEntrySize));
      entry.setUint8(0, img.width === 256 ? 0 : img.width);
      entry.setUint8(1, img.height === 256 ? 0 : img.height);
      entry.setUint8(2, 0);
      entry.setUint8(3, 0);
      entry.setUint16(4, 1, true);
      entry.setUint16(6, 32, true);
      entry.setUint32(8, img.data.length, true);
      entry.setUint32(12, dataOffset, true);

      finalBuffer.set(
        new Uint8Array(entry.buffer),
        headerSize + index * directoryEntrySize
      );

      dataOffsets.push(dataOffset);
      dataOffset += img.data.length;
    });

    images.forEach((img, index) => {
      finalBuffer.set(img.data, dataOffsets[index]);
    });

    const blob = new Blob([finalBuffer], { type: "image/x-icon" });
    const link = document.createElement("a");
    link.download = `${name}.ico`;
    link.href = URL.createObjectURL(blob);
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

const downloadIcns = async (name = "folder") => {
  try {
    const sizeToType = {
      16: "icp3", // 16x16
      32: "icp4", // 32x32
      64: "icp6", // 64x64
      128: "ic07", // 128x128
      256: "ic08", // 256x256
      512: "ic09", // 512x512
      1024: "ic10", // 1024x1024
    };

    const canvasIds = [1024, 512, 256, 128, 64, 32, 16];
    const canvases = canvasIds
      .map((id) => document.getElementById(`folder-${id}`))
      .filter((canvas) => !!canvas && sizeToType[canvas.width]);

    const images = await Promise.all(
      canvases.map(async (canvas) => {
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        const buffer = await blob.arrayBuffer();
        return {
          data: new Uint8Array(buffer),
          size: canvas.width,
          type: sizeToType[canvas.width],
        };
      })
    );

    const chunks = images.map((img) => {
      const typeBytes = new TextEncoder().encode(img.type);
      const dataLength = img.data.byteLength;
      const chunkLength = dataLength + 8;

      const chunk = new Uint8Array(chunkLength);
      const lengthView = new DataView(chunk.buffer, 4, 4);

      chunk.set(typeBytes, 0);
      lengthView.setUint32(0, chunkLength, false);
      chunk.set(img.data, 8);

      return chunk;
    });

    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.length, 8);
    const header = new Uint8Array(8);
    const headerView = new DataView(header.buffer);

    header.set(new TextEncoder().encode("icns"), 0);
    headerView.setUint32(4, totalSize, false);

    const finalBuffer = new Uint8Array(totalSize);
    finalBuffer.set(header, 0);

    let offset = 8;
    chunks.forEach((chunk) => {
      finalBuffer.set(chunk, offset);
      offset += chunk.length;
    });

    const blob = new Blob([finalBuffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.download = `${name}.icns`;
    link.href = URL.createObjectURL(blob);
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
  } catch (error) {
    console.error("ICNS creation failed:", error);
    alert("Error generating ICNS file - check console for details");
  }
};

const downloadIconSize = (size, name = "folder") => {
  const canvas = document.getElementById(`folder-${size}`);
  const link = document.createElement("a");
  link.download = `${name}-${size}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};

const downloadIconsZip = async (name = "folder") => {
  const zip = new JSZip();
  const canvasIds = [512, 256, 128, 96, 72, 64, 48, 32, 24, 16];

  await Promise.all(
    canvasIds.map(async (size) => {
      const canvas = document.getElementById(`folder-${size}`);
      if (!canvas) return;

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      zip.file(`${name}-${size}.png`, blob, { compression: "STORE" });
    })
  );

  zip.generateAsync({ type: "blob" }).then((blob) => {
    const link = document.createElement("a");
    link.download = "folder.zip";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  });
};

export function FolderGenerate(fileType, iconSize, name) {
  if (fileType === "ico") downloadIco(name);
  if (fileType === "icns") downloadIcns(name);
  if (fileType === "png") {
    if (iconSize === "all") downloadIconsZip(name);
    else downloadIconSize(iconSize, name);
  }
}
