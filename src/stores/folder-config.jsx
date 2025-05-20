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
  if (folderType === "win11") {
    const offsets = {
      512: [0, 26],
      256: [0, 13],
      128: [0, 6.5],
      96: [0, 4],
      72: [0, 3],
      64: [0, 3],
      48: [0, 1.5],
      32: [0, 1],
      24: [0, 1],
      16: [0, 1],
    };
    return offsets[folderSize] || [0, 0];
  } else if (folderType === "win10") {
    const offsets = {
      512: [96, 72],
      256: [48, 36],
      128: [24, 18],
      96: [18, 12],
      72: [14, 12],
      64: [12, 9],
      48: [9, 6],
      32: [6, 6],
      24: [5, 4],
      16: [0, 0],
    };
    return offsets[folderSize] || [0, 0];
  } else if (folderType == "bigsur") {
    const offsets = {
      1024: [0, 64],
      512: [0, 32],
      256: [0, 16],
      128: [0, 8],
      64: [0, 4],
      32: [0, 2],
      16: [0, 1],
    };
    return offsets[folderSize] || [0, 0];
  } else if (folderType == "mint-l") {
    const offsets = {
      512: [0, 32],
      256: [0, 16],
      128: [0, 8],
      96: [0, 6],
      64: [0, 4],
      48: [0, 3],
      32: [0, 2],
      24: [0, 2],
      16: [0, 1],
    };
    return offsets[folderSize] || [0, 0];
  } else {
    return [0, 0];
  }
}
