// Determine folder type based on size and settings
export function getFolderType(folderType, folderSmallType, folderSize) {
  if (
    folderSmallType === "squareAndIcon" &&
    folderSize <= 32 &&
    folderType === "win11"
  ) {
    return folderType + "-box";
  }
  return folderType;
}

export function getIconAnchor(folderType, folderSize) {
  if (folderType === "win11" || folderType === "win95") {
    const offsets = {
      256: [0, 12],
      128: [0, 6],
      96: [0, 4],
      72: [0, 3],
      64: [0, 3],
      48: folderType === "win95" ? [0, 3] : [0, 1],
      32: [0, 2],
      24: [0, 1],
      16: [0, 1],
    };
    return offsets[folderSize] || [0, 0];
  } else if (folderType === "win10") {
    const offsets = {
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
  } else {
    return [0, 0];
  }
}

// Calculate icon multiplier based on folder settings
export function getIconMultiplier(folderType, folderSmallType, folderSize) {
  if (folderSmallType === "squareAndIcon" && folderSize <= 32) {
    return 1.5;
  }
  if (
    folderType === "icon-only" ||
    (folderSmallType === "iconOnly" && folderSize <= 32)
  ) {
    return 1.75;
  }
  return 1;
}

// Determine icon mask type
export function getIconMaskType(folderType, folderSize) {
  if (folderType === "win10" && folderSize !== 16) {
    return "icon-mask";
  }
  return "mask";
}

// Determine icon shadow type
export function getIconShadowType(folderType, folderSize) {
  if (folderType === "win10" && folderSize > 24) {
    return "shadow";
  }
  return "base";
}

// Convert hex to RGBA with opacity
export function getIconShadowColor(shadowColor, shadowOpacity) {
  const hex = shadowColor.replace(/^#/, "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${shadowOpacity / 100})`;
}
