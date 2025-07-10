"use client";

// Icor was born here!
import icor from "icor";
import JSZip from "jszip";
import { Buffer } from "buffer";
import { save } from "@tauri-apps/plugin-dialog";
import { create } from "@tauri-apps/plugin-fs";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

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
          width: canvas.width,
          height: canvas.height,
          data: Buffer.from(buffer),
        };
      })
    );

    const icoBuffer = icor.compileIco(images);
    const blob = new Blob([icoBuffer], { type: "image/x-icon" });
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

export const downloadIcoDesktop = async (name = "folder") => {
  try {
    const canvasIds = [512, 256, 128, 96, 72, 64, 48, 32, 24, 16];
    const canvases = canvasIds
      .map((id) => document.getElementById(`folder-${id}`))
      .filter(Boolean);

    const images = await Promise.all(
      canvases.map(async (canvas) => {
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        return {
          width: canvas.width,
          height: canvas.height,
          data: Buffer.from(await blob.arrayBuffer()),
        };
      })
    );

    const icoBuffer = icor.compileIco(images);

    const icoData = new Uint8Array(icoBuffer);

    const filePath = await save({
      filters: [
        {
          name: "ICO File",
          extensions: ["ico"],
        },
      ],
      defaultPath: `${name}.ico`,
    });

    if (filePath) {
      const file = await create(filePath, { baseDir: undefined });
      await file.write(icoData);
      await file.close();
      return true;
    }
    return false;
  } catch (error) {
    console.error("ICO creation failed:", error);
    alert("Error saving ICO file - check console for details");
    throw error;
  }
};

const downloadIcns = async (name = "folder") => {
  try {
    const canvasIds = [1024, 512, 256, 128, 64, 32, 16];
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
          size: canvas.width,
          data: Buffer.from(buffer),
        };
      })
    );

    const icnsBuffer = icor.compileIcns(images);
    const blob = new Blob([icnsBuffer], { type: "application/octet-stream" });
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
