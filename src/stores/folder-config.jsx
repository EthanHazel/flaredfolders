import { create } from "zustand";

export const folderConfigStore = create((set) => ({
  // "linear-gradient", "solid", "original"
  colorType: "linear-gradient",
  setColorType: (colorType) => set({ colorType }),
  gradientStartColor: "#6acbff",
  setGradientStartColor: (color) => set({ gradientStartColor: color }),
  gradientEndColor: "#1026ef",
  setGradientEndColor: (color) => set({ gradientEndColor: color }),
  solidColor: "#eb898b",
  setSolidColor: (color) => set({ solidColor: color }),

  // "sqaureAndIcon", "folderAndIcon", "folderOnly"
  folderSmallType: "sqaureAndIcon",
  setFolderSmallType: (folderSmallType) => set({ folderSmallType }),
  // "win10", "win11"
  folderType: "win11",
  setFolderType: (folderType) => set({ folderType }),

  // "lucide", "simple", "custom", "none"
  iconType: "lucide",
  setIconType: (type) => set({ iconType: type }),

  lucideSlug: "Image",
  setLucideSlug: (slug) => set({ lucideSlug: slug }),
  lucideStrokeWidth: 1.5,
  setLucideStrokeWidth: (width) => set({ lucideStrokeWidth: width }),

  simpleSlug: "simpleicons",
  setSimpleSlug: (slug) => set({ simpleSlug: slug }),

  customData: null,
  setCustomData: (data) => set({ customIconData: data }),
  customFileName: null,
  setCustomFileName: (name) => set({ customFileName: name }),

  iconOffset: [0, 0],
  setIconOffset: (offset) => set({ iconOffset: offset }),
  iconScale: 0.5,
  setIconScale: (scale) => set({ iconScale: scale }),
  iconColor: "#ffffff",
  setIconColor: (color) => set({ iconColor: color }),
  iconOpacity: 1,
  setIconOpacity: (opacity) => set({ iconOpacity: opacity }),
  iconShadow: true,
  setIconShadow: (shadow) => set({ iconShadow: shadow }),
  iconMasked: true,
  setIconMasked: (contained) => set({ iconMasked: contained }),
}));

export function getIconAnchor(folderType, folderSize) {
  if (folderType == "win11") {
    switch (folderSize) {
      case 512:
        return [0, 26];
      case 256:
        return [0, 13];
      case 128:
        return [0, 6.5];
      case 96:
        return [0, 4];
      case 72:
        return [0, 3];
      case 64:
        return [0, 3];
      case 48:
        return [0, 1.5];
      case 32:
        return [0, 1];
      case 24:
        return [0, 1];
      case 16:
        return [0, 1];
      default:
        return [0, 0];
    }
  } else if (folderType == "win10") {
    switch (folderSize) {
      case 512:
        return [0, 0];
      case 256:
        return [0, 0];
      case 128:
        return [0, 0];
      case 96:
        return [0, 0];
      case 72:
        return [0, 0];
      case 64:
        return [0, 0];
      case 48:
        return [0, 0];
      case 32:
        return [0, 0];
      case 24:
        return [0, 0];
      case 16:
        return [0, 0];
      default:
        return [0, 0];
    }
  } else {
    return [0, 0];
  }
}

export const getStyleSizes = (style) => {
  switch (style) {
    case "bigsur":
      return {
        1024: "main",
        512: "hidden",
        256: "hidden",
        64: "small",
        32: "small",
      };
    case "catalina":
      return {
        1024: "main",
        512: "hidden",
        256: "hidden",
        128: "hidden",
        64: "small",
        32: "small",
        16: "small",
      };
    default:
      return {
        512: "main",
        256: "hidden",
        128: "hidden",
        96: "hidden",
        72: "hidden",
        64: "small",
        48: "small",
        32: "small",
        24: "small",
        16: "small",
      };
  }
};
