"use client";

import React from "react";
import { default as NextImage } from "next/image";
import { useState, useEffect, useRef } from "react";

import Loading from "../loading";

import { loadRequiredImages } from "@/lib/rendering/load-images";
import { setupCanvasRendering } from "@/lib/rendering/utils";

import drawBackground from "@/lib/rendering/draw/background";
import drawIcon from "@/lib/rendering/draw/icon";

import { useFolderConfigState } from "@/stores/folder-config";

import "@/styles/folder.css";

export default function FolderRender({ folderSize, id }) {
  const { folderType, folderSmallType, iconType } = useFolderConfigState();

  const configState = useFolderConfigState();
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const isIconOnly =
    folderType === "icon-only" ||
    (folderSmallType === "iconOnly" && folderSize <= 32);

  // Main effect for loading and drawing
  useEffect(() => {
    const loadAndDraw = async () => {
      try {
        const images = await loadRequiredImages(
          folderSize,
          configState,
          isIconOnly,
        );
        drawCanvas(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadAndDraw();
  }, [configState]);

  // Main canvas drawing function
  function drawCanvas(images) {
    const {
      baseImg,
      icon,
      highlightImg,
      iconMaskImg,
      colorMaskImg,
      maskImg,
      defaultImg,
      shadowImg,
    } = images;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    setupCanvasRendering(ctx);
    clearCanvas(ctx, folderSize);

    if (shouldDrawBackground()) {
      ctx.globalCompositeOperation = "source-over";
      drawBackground(
        ctx,
        baseImg,
        defaultImg,
        highlightImg,
        colorMaskImg,
        maskImg,
        shadowImg,
        folderSize,
        configState,
      );
    }
    if (shouldDrawIcon()) {
      drawIcon(ctx, icon, iconMaskImg, folderSize, configState);
    }
  }

  // Clear the canvas
  function clearCanvas(ctx, size) {
    ctx.clearRect(0, 0, size, size);
  }

  // Determine if we should draw the background
  function shouldDrawBackground() {
    return !isIconOnly;
  }

  // Determine if we should draw the icon
  function shouldDrawIcon() {
    return (
      iconType !== "none" &&
      !(
        folderType === "win10" &&
        folderSize === 16 &&
        folderSmallType !== "iconOnly"
      ) &&
      (folderSmallType === "folderAndIcon" ||
        folderSmallType === "squareAndIcon" ||
        folderSize > 32 ||
        isIconOnly)
    );
  }

  return (
    <div className="folder-icon-container" id={id}>
      {isLoading ? (
        <Loading size={folderSize} />
      ) : (
        <canvas
          ref={canvasRef}
          width={folderSize}
          height={folderSize}
          id={`folder-${folderSize}`}
        />
      )}
      <NextImage
        src={
          "/images/folder-assets/" +
          folderType +
          "/" +
          folderSize +
          "/default.png"
        }
        draggable={false}
        alt="folder"
        className="folder-default"
        width={folderSize}
        height={folderSize}
      />
    </div>
  );
}
