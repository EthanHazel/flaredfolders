"use client";

import Color from "./color";

import { setPrimary } from "@/lib/set-primary";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ColorStyles({ colorId = 0 }) {
  const colors = [
    folderConfigStore((state) => state.colorOne),
    folderConfigStore((state) => state.colorTwo),
  ];

  const t = useTranslations("folderConfig");

  const colorNames = [t("colorOne"), t("colorTwo"), t("color")];

  const [color, setColor] = useState(colors[colorId]);

  const updateColor = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    switch (colorId) {
      case 0:
        folderConfigStore.getState().setColorOne(newColor);
        setPrimary([
          folderConfigStore.getState().colorOne,
          folderConfigStore.getState().colorTwo,
        ]);
        break;
      case 1:
        folderConfigStore.getState().setColorTwo(newColor);
        setPrimary([
          folderConfigStore.getState().colorOne,
          folderConfigStore.getState().colorTwo,
        ]);
        break;
      case 2:
        folderConfigStore.getState().setColorOne(newColor);
        setPrimary([
          folderConfigStore.getState().colorOne,
          folderConfigStore.getState().colorOne,
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
