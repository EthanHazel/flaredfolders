const MODAL_CONTAINER = document.querySelector(".icon-modal-container");
const MODAL = document.querySelector(".icon-modal");
const MODAL_LOADING = document.getElementById("icon-modal-loading");
const ICON_UPLOAD = document.getElementById("file-icon");
const REAL_ICON = document.getElementById("real-icon");

const LUCIDE_SLUG = document.getElementById("lucide-slug");
const SIMPLE_SLUG = document.getElementById("simple-slug");

const LUCIDE_LINK = document.getElementById("lucide-link");
const SIMPLE_LINK = document.getElementById("simple-link");

const ICON_RADIOS = document.querySelectorAll('input[name="icon"]');

const ICON_BUTTON = document.getElementById("icon-open");

const NO_ICON = 0;
const UPLOAD_ICON = 1;
const LUCIDE_ICON = 3;
const SIMPLE_ICON = 4;

let currentIcon = null;
let currentUrl = null;

let currentMode = NO_ICON;
let prevMode = NO_ICON;

let prevLucideSlug = null;
let prevSimpleSlug = null;

let currentLucideSlug = null;
let currentSimpleSlug = null;

let currentSimpleImage = null;
let currentLucideImage = null;

const fetchCache = async (url) => {
  if (url === currentUrl) {
    return currentIcon;
  }

  const response = await fetch(url);
  const blob = await response.blob();
  const image = new Image();
  const promise = new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, 512, 512);
      const dataURL = canvas.toDataURL("image/svg+xml");
      resolve(dataURL);
    };
  });
  image.src = URL.createObjectURL(blob);
  return promise;
};
const updateInputs = () => {
  const hidden = (el) => el.classList.add("hidden");
  const show = (el) => el.classList.remove("hidden");

  if (ICON_RADIOS[UPLOAD_ICON].checked) {
    [LUCIDE_SLUG, SIMPLE_SLUG, LUCIDE_LINK, SIMPLE_LINK].forEach(hidden);
    show(ICON_UPLOAD);
  } else if (ICON_RADIOS[LUCIDE_ICON].checked) {
    [SIMPLE_SLUG, SIMPLE_LINK, ICON_UPLOAD].forEach(hidden);
    [LUCIDE_SLUG, LUCIDE_LINK].forEach(show);
  } else if (ICON_RADIOS[SIMPLE_ICON].checked) {
    [LUCIDE_SLUG, LUCIDE_LINK, ICON_UPLOAD].forEach(hidden);
    [SIMPLE_SLUG, SIMPLE_LINK].forEach(show);
  } else {
    [LUCIDE_SLUG, SIMPLE_SLUG, LUCIDE_LINK, SIMPLE_LINK, ICON_UPLOAD].forEach(
      hidden
    );
  }
};

const updateIconButton = () => {
  ICON_BUTTON.firstChild.src = currentIcon;
  ICON_BUTTON.classList.remove("no-icon");
};

const fetchSimpleIcon = async (slug) => {
  return fetchCache(`https://simpleicons.org/icons/${slug}.svg`);
};

const checkValidSimpleSlug = async (slug) => {
  const url = `https://simpleicons.org/icons/${slug}.svg`;
  const response = await fetch(url);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const fetchLucideIcon = async (slug) => {
  return fetchCache(`https://unpkg.com/lucide-static@latest/icons/${slug}.svg`);
};

const checkValidLucideSlug = async (slug) => {
  const url = `https://unpkg.com/lucide-static@latest/icons/${slug}.svg`;
  const response = await fetch(url);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const openModal = () => {
  if (REAL_ICON.files) {
    ICON_UPLOAD.files = REAL_ICON.files;
  }
  prevMode = currentMode;
  prevLucideSlug = currentLucideSlug;
  prevSimpleSlug = currentSimpleSlug;
  MODAL_CONTAINER.classList.remove("hidden");
  return;
};

const closeModal = () => {
  MODAL_CONTAINER.classList.add("hidden");
  MODAL_LOADING.classList.add("hidden");
};

const cancelModal = () => {
  currentMode = prevMode;
  ICON_UPLOAD.files = REAL_ICON.files;
  ICON_RADIOS[prevMode].checked = true;
  closeModal();
  return;
};

const saveModal = async () => {
  MODAL_LOADING.classList.remove("hidden");
  currentMode = Array.from(ICON_RADIOS).findIndex((radio) => radio.checked);
  if (currentMode == UPLOAD_ICON) {
    REAL_ICON.files = ICON_UPLOAD.files;
  }
  if (currentMode == SIMPLE_ICON) {
    const slugCheck = await checkValidSimpleSlug(SIMPLE_SLUG.value);
    if (slugCheck == false) {
      alert("Invalid Simple slug!");
      SIMPLE_SLUG.value = prevSimpleSlug;
      MODAL_LOADING.classList.add("hidden");
      return;
    }
    currentSimpleSlug = SIMPLE_SLUG.value;
    currentSimpleImage = fetchSimpleIcon(currentSimpleSlug);
  }
  if (currentMode == LUCIDE_ICON) {
    const slugCheck = await checkValidLucideSlug(LUCIDE_SLUG.value);
    if (slugCheck == false) {
      alert("Invalid Lucide slug!");
      LUCIDE_SLUG.value = prevLucideSlug;
      MODAL_LOADING.classList.add("hidden");
      return;
    }
    currentLucideSlug = LUCIDE_SLUG.value;
    currentLucideImage = fetchLucideIcon(currentLucideSlug);
  }
  updateIconButton();
  closeModal();
  generateFolders();
  disabledHandler();
  return;
};

ICON_RADIOS.forEach((radio) => radio.addEventListener("change", updateInputs));

ICON_RADIOS[0].checked = true;
