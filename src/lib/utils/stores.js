import { writable, get, derived } from "svelte/store";

import { adjustLightness, shiftHue, averageColors } from "./color.js";

import FOLDER_CONFIG from "../folders/config.json";

import { version } from "../../../package.json";

const DEFAULTS = {
  folderType: "win11",

  colorFrontOne: "#d4d4d4",
  colorFrontTwo: "#737373",
  colorBackOne: "#5c5c5c",
  colorBackTwo: "#454545",
  colorIcon: "#ffffff",
  colorType: "advanced",
  colorHueShift: 15,
  colorContrast: 0.15,

  iconType: "lucide",
  iconOffsetX: 0,
  iconOffsetY: 0,
  iconScale: 1,
  iconOpacity: 1,

  iconShadowEnabled: true,
  iconShadowOffsetX: 0,
  iconShadowOffsetY: 1,
  iconShadowColor: "#080808",
  iconShadowOpacity: 0.25,
  iconShadowBlur: 1,

  iconLucideSlug: "sticker",
  iconLucideDynamic: true, // TODO: Figure out ideal stroke width for different icon sizes (try to see if it can be dynamically generated)
  iconLucideStroke: 1.5,

  iconSimpleSlug: "simpleicons",

  iconCustomName: "untitled",
  iconCustomData: null,
};

export const SIZES = [256, 64, 48, 40, 32, 24, 20, 16];

const settings = JSON.parse(localStorage.getItem("settings")) ?? {};

export let /** @type {any} */ mainStore = writable({
    folderName: "Untitled",
    dirty: false,
    selectedSizes: SIZES,
    ...Object.fromEntries(SIZES.map((size) => [size, { ...DEFAULTS }])),
  });

export let /** @type {any} */ interfaceStore = writable({
    currentScreen: "home",
    currentModal: settings.returningUser ? null : "welcome",
  });

export const folderTypes = derived(
  mainStore,
  (($mainStore, set) => {
    let prev = {};
    return ($mainStore, set) => {
      const next = {};
      for (const size of SIZES) {
        next[size] = $mainStore[size]?.folderType;
      }
      const changed = Object.keys(next).some((k) => next[k] !== prev[k]);
      if (changed) {
        prev = next;
        set(next);
      }
    };
  })(),
  {},
);

// ---------------------------------------------------------------------------
// Undo / Redo history
// ---------------------------------------------------------------------------

const MAX_HISTORY = 100;

/** @type {any[]} */
let history = [];
let historyIndex = -1;
let isApplyingHistory = false;

/** @param {any} store */
function cloneStore(store) {
  return JSON.parse(JSON.stringify(store));
}

/** @param {any} snapshot */
function pushHistory(snapshot) {
  // Drop any "future" (redo) steps once a new step is recorded.
  history = history.slice(0, historyIndex + 1);
  history.push(snapshot);
  if (history.length > MAX_HISTORY) {
    history.shift();
  }
  historyIndex = history.length - 1;
}

// Seed history with the initial state so the very first undo has
// something to return to.
pushHistory(cloneStore(get(mainStore)));

/**
 * Manually record the current mainStore state as a new history step.
 * Useful after a batch of updateStoresSilently calls (e.g. while dragging
 * a slider), so you only save one step instead of one per tick.
 */
export function saveStep() {
  if (isApplyingHistory) return;
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.dirty = true;
    return s;
  });
  pushHistory(cloneStore(get(mainStore)));
}

/** Step back one point in history, if possible. */
export function undo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  applyHistory(history[historyIndex]);
}

/** Step forward one point in history, if possible. */
export function redo() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  applyHistory(history[historyIndex]);
}

/** @param {any} snapshot */
function applyHistory(snapshot) {
  isApplyingHistory = true;
  mainStore.set(cloneStore(snapshot));
  isApplyingHistory = false;
}

/** Clear the entire undo/redo history, keeping only the current state as the new baseline. */
export function clear() {
  history = [];
  historyIndex = -1;
  pushHistory(cloneStore(get(mainStore)));
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.dirty = false;
    return s;
  });
}

// ---------------------------------------------------------------------------
// Store updates
// ---------------------------------------------------------------------------

/**
 * @param {number} size
 * @param {string} key
 * @param {any} value
 */
export function updateStore(size, key, value) {
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    if (!s[size]) {
      s[size] = { ...DEFAULTS };
    }
    s[size][key] = value;
    return s;
  });
}

/**
 * Updates a key across all selected sizes AND saves a history step.
 * @param {string} key
 * @param {any} value
 */
export function updateStores(key, value) {
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    for (let i = 0; i < s.selectedSizes.length; i++) {
      const size = s.selectedSizes[i];
      if (!s[size]) {
        s[size] = { ...DEFAULTS };
      }
      s[size][key] = value;
    }
    return s;
  });
  saveStep();
}

/**
 * Updates a key across all selected sizes WITHOUT saving a history step.
 * Handy for continuous input (drag/slider) where you'll call saveStep()
 * once at the end instead.
 * @param {string} key
 * @param {any} value
 */
export function updateStoresSilently(key, value) {
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    for (let i = 0; i < s.selectedSizes.length; i++) {
      const size = s.selectedSizes[i];
      if (!s[size]) {
        s[size] = { ...DEFAULTS };
      }
      s[size][key] = value;
    }
    return s;
  });
}

/**
 * Loads JSON directly into the mainStore.
 * Useful for opening project files or loading templates.
 * @param {object} data
 */
export function loadDataToStore(data) {
  const cloned = JSON.parse(JSON.stringify(data));
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    for (let i = 0; i < SIZES.length; i++) {
      s[SIZES[i]] = cloned[SIZES[i]];
    }
    s.folderName = cloned.folderName;
    s.dirty = false;
    return s;
  });
  clear();
}

/**
 * Sets the current modal ID
 * useful for buttons that open modals.
 * @param {string} id
 */

export function openModal(id) {
  interfaceStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.currentModal = id;
    return s;
  });
}

/**
 * Sets the current screen ID
 * useful for buttons that open screens.
 * @param {string} id
 */

export function openScreen(id) {
  interfaceStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.currentScreen = id;
    return s;
  });
}

/**
 * Sets the current modal ID to null
 * useful for buttons that open modals.
 */
export function closeModal() {
  interfaceStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.currentModal = null;
    return s;
  });
}

/**
 * Brings the user to the home page but checks to see if there are unsaved changes first.
 */
export function goHome() {
  const currentScreen = get(interfaceStore).currentScreen;

  if (currentScreen === "home") {
    return;
  }

  const currentStore = get(mainStore);

  let settings = JSON.parse(localStorage.getItem("settings"));

  if (
    currentStore.dirty &&
    currentScreen === "editor" &&
    settings.unsavedWarning === true
  ) {
    const confirmed = confirm(
      "You have unsaved changes. Are you sure you want to leave?",
    );
    if (!confirmed) {
      return;
    }
  }

  interfaceStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.currentScreen = "home";
    return s;
  });
}

// ---------------------------------------------------------------------------
// Store fetching
// ---------------------------------------------------------------------------

export function getSelectedInfo() {
  const currentStore = get(mainStore);
  const selectedSizes = currentStore.selectedSizes;

  return selectedSizes.map((size) => {
    const folderStore = currentStore[size];
    return {
      size,
      folderStore,
    };
  });
}

// TODO: Make this more optimized
/**
 *
 * @param {any} folderSize
 * @param {string} folderType
 * @returns
 */
export function getColors(folderSize, folderType) {
  const currentStore = get(mainStore)[folderSize];
  const colorType = currentStore.colorType;
  const contrast = parseFloat(currentStore.colorContrast);
  const hueShift = parseInt(currentStore.colorHueShift);

  let colors = {
    frontOne: currentStore.colorFrontOne,
    frontTwo: currentStore.colorFrontTwo,
    backOne: currentStore.colorBackOne,
    backTwo: currentStore.colorBackTwo,
    icon: currentStore.colorIcon,
    shadow: currentStore.iconShadowColor,
  };

  if (colorType === "solid") {
    colors.frontTwo = colors.frontOne;
    colors.backOne = colors.frontOne;
    colors.backTwo = colors.frontOne;

    colors.backOne = adjustLightness(colors.backOne, -contrast);
    colors.backTwo = adjustLightness(colors.backTwo, -contrast);

    colors.frontOne = adjustLightness(colors.frontOne, contrast);
    colors.frontTwo = adjustLightness(colors.frontTwo, -contrast);

    colors.frontTwo = shiftHue(colors.frontTwo, hueShift);
    colors.backTwo = shiftHue(colors.backTwo, hueShift);
  }

  if (colorType === "gradient") {
    colors.backOne = colors.frontOne;
    colors.backTwo = colors.frontTwo;

    colors.backOne = adjustLightness(colors.backOne, -contrast);
    colors.backTwo = adjustLightness(colors.backTwo, -contrast);
  }

  if (colorType === "original") {
    colors.frontOne = FOLDER_CONFIG[folderType].originalColors.frontOne;
    colors.frontTwo = FOLDER_CONFIG[folderType].originalColors.frontTwo;
    colors.backOne = FOLDER_CONFIG[folderType].originalColors.backOne;
    colors.backTwo = FOLDER_CONFIG[folderType].originalColors.backTwo;
  }

  if (folderType === "icon-only") {
    colors.frontOne = colors.icon;
    colors.frontTwo = colors.icon;
    colors.backOne = colors.icon;
    colors.backTwo = colors.icon;
  }

  return colors;
}

/**
 * Combines the computed colors from every selected size into a single
 * set of 4 averaged colors (frontOne, frontTwo, backOne, backTwo).
 * Reuses getColors() per-size so colorType logic (solid/gradient/original)
 * is respected before averaging.
 * @returns {{frontOne: string, frontTwo: string, backOne: string, backTwo: string}}
 */
export function getColorsCombined() {
  const currentStore = get(mainStore);
  const selectedSizes = currentStore.selectedSizes;

  const collected = { frontOne: [], frontTwo: [], backOne: [], backTwo: [] };

  for (const size of selectedSizes) {
    const sizeStore = currentStore[size];
    if (!sizeStore) continue;
    const colors = getColors(size, sizeStore.folderType);
    collected.frontOne.push(colors.frontOne);
    collected.frontTwo.push(colors.frontTwo);
    collected.backOne.push(colors.backOne);
    collected.backTwo.push(colors.backTwo);
  }

  return {
    frontOne: averageColors(collected.frontOne),
    frontTwo: averageColors(collected.frontTwo),
    backOne: averageColors(collected.backOne),
    backTwo: averageColors(collected.backTwo),
  };
}

/**
 * Same as getColorsCombined(), but merges all 4 resulting colors down
 * into a single averaged color.
 * @returns {string}
 */
export function getColorsMerged() {
  const { frontOne, frontTwo, backOne, backTwo } = getColorsCombined();
  return averageColors([frontOne, frontTwo, backOne, backTwo]);
}

/**
 * Saves the project file to the user's device.
 */
export function saveProjectFile() {
  let data = get(mainStore);
  const filename = data.folderName + ".ffproj";
  data.editorVersion = version;
  var file = new Blob([JSON.stringify(data)], { type: "ffproj" });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  mainStore.update((store) => {
    const s = /** @type {any} */ (store);
    s.dirty = false;
    return s;
  });
}
