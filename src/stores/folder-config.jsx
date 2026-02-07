import { create } from "zustand";

export const folderConfigStore = create((set) => ({
  // "gradient", "solid", "duo", "original"
  colorType: "gradient",
  setColorType: (colorType) => set({ colorType }),
  colorOne: "#c23936",
  setColorOne: (color) => set({ colorOne: color }),
  colorTwo: "#a400ea",
  setColorTwo: (color) => set({ colorTwo: color }),
  swapColors: () =>
    set((state) => ({ colorOne: state.colorTwo, colorTwo: state.colorOne })),

  // 0 - 360
  solidHueShift: 10,
  setSolidHueShift: (shift) => set({ solidHueShift: shift }),

  // 0 - 10
  colorContrast: 1,
  setColorContrast: (contrast) => set({ colorContrast: contrast }),

  // "sqaureAndIcon", "folderAndIcon", "folderOnly", "iconOnly"
  folderSmallType: "sqaureAndIcon",
  setFolderSmallType: (folderSmallType) => set({ folderSmallType }),

  // "win10", "win11", "win95", "icon-only"
  folderType: "win11",
  setFolderType: (folderType) => set({ folderType }),

  // "lucide", "simple", "custom", "emoji", "none"
  iconType: "lucide",
  setIconType: (type) => set({ iconType: type }),

  lucideSlug: "Sticker",
  setLucideSlug: (slug) => set({ lucideSlug: slug }),
  lucideStrokeWidth: 1.5,
  setLucideStrokeWidth: (width) => set({ lucideStrokeWidth: width }),

  simpleSlug: "simpleicons",
  setSimpleSlug: (slug) => set({ simpleSlug: slug }),

  emojiSlug: "📁",
  setEmojiSlug: (slug) => set({ emojiSlug: slug }),

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

  shadowColor: "#000000",
  setShadowColor: (color) => set({ shadowColor: color }),
  shadowOpacity: 15,
  setShadowOpacity: (opacity) => set({ shadowOpacity: opacity }),
  shadowBlur: 10,
  setShadowBlur: (blur) => set({ shadowBlur: blur }),
  shadowOffset: [0, 10],
  setShadowOffset: (offset) => set({ shadowOffset: offset }),
}));

// Helper function to get all configuration state
export function useFolderConfigState() {
  return {
    colorType: folderConfigStore((state) => state.colorType),
    colorOne: folderConfigStore((state) => state.colorOne),
    colorTwo: folderConfigStore((state) => state.colorTwo),
    colorContrast: folderConfigStore((state) => state.colorContrast),
    solidHueShift: folderConfigStore((state) => state.solidHueShift),
    folderType: folderConfigStore((state) => state.folderType),
    folderSmallType: folderConfigStore((state) => state.folderSmallType),
    iconType: folderConfigStore((state) => state.iconType),
    iconScale: folderConfigStore((state) => state.iconScale),
    iconColor: folderConfigStore((state) => state.iconColor),
    iconOffset: folderConfigStore((state) => state.iconOffset),
    iconOpacity: folderConfigStore((state) => state.iconOpacity),
    iconShadow: folderConfigStore((state) => state.iconShadow),
    shadowOffset: folderConfigStore((state) => state.shadowOffset),
    shadowBlur: folderConfigStore((state) => state.shadowBlur),
    shadowColor: folderConfigStore((state) => state.shadowColor),
    shadowOpacity: folderConfigStore((state) => state.shadowOpacity),
    iconMasked: folderConfigStore((state) => state.iconMasked),
    lucideSlug: folderConfigStore((state) => state.lucideSlug),
    lucideStrokeWidth: folderConfigStore((state) => state.lucideStrokeWidth),
    simpleSlug: folderConfigStore((state) => state.simpleSlug),
    emojiSlug: folderConfigStore((state) => state.emojiSlug),
    customFileName: folderConfigStore((state) => state.customFileName),
  };
}
