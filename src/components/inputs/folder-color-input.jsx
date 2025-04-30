"use client";

import Color from "./color";

import { setPrimary } from "@/functions/set-primary";
import { folderConfigStore } from "@/stores/folder-config";
import { useState } from "react";

export default function FolderColorInput({ colorId = 0 }) {
  const colors = [
    folderConfigStore((state) => state.gradientStartColor),
    folderConfigStore((state) => state.gradientEndColor),
    folderConfigStore((state) => state.solidColor),
  ];

  const colorNames = [
    "Gradient Start Color",
    "Gradient End Color",
    "Solid Color",
  ];

  const [color, setColor] = useState(colors[colorId]);

  const updateColor = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    switch (colorId) {
      case 0:
        folderConfigStore.getState().setGradientStartColor(newColor);
        setPrimary([
          folderConfigStore.getState().gradientStartColor,
          folderConfigStore.getState().gradientEndColor,
        ]);
        break;
      case 1:
        folderConfigStore.getState().setGradientEndColor(newColor);
        setPrimary([
          folderConfigStore.getState().gradientStartColor,
          folderConfigStore.getState().gradientEndColor,
        ]);
        break;
      case 2:
        folderConfigStore.getState().setSolidColor(newColor);
        setPrimary([
          folderConfigStore.getState().solidColor,
          folderConfigStore.getState().solidColor,
        ]);
        break;
      default:
        break;
    }
  };

  return (
    <Color
      defaultColor={color}
      onChange={updateColor}
      label={colorNames[colorId]}
    />
  );
}
