const MODAL_CONTAINER = document.querySelector(".icon-modal-container");
const MODAL = document.querySelector(".icon-modal");
const ICON_UPLOAD = document.getElementById("file-icon");
const REAL_ICON = document.getElementById("real-icon");

const LUCIDE_SLUG = document.getElementById("lucide-slug");
const SIMPLE_SLUG = document.getElementById("simple-slug");

const LUCIDE_LINK = document.getElementById("lucide-link");
const SIMPLE_LINK = document.getElementById("simple-link");

const ICON_RADIOS = document.querySelectorAll('input[name="icon"]');

const NO_ICON = 0;
const UPLOAD_ICON = 1;
const LUCIDE_ICON = 3;
const SIMPLE_ICON = 4;

let currentMode = NO_ICON;
let prevMode = NO_ICON;

let prevLucideSlug = null;
let prevSimpleSlug = null;

let currentLucideSlug = null;
let currentSimpleSlug = null;

let currentSimpleImage = null;
let currentLucideImage = null;

const updateInputs = () => {
  if (ICON_RADIOS[UPLOAD_ICON].checked) {
    LUCIDE_SLUG.classList.add("hidden");
    SIMPLE_SLUG.classList.add("hidden");
    LUCIDE_LINK.classList.add("hidden");
    SIMPLE_LINK.classList.add("hidden");
    ICON_UPLOAD.classList.remove("hidden");
  } else if (ICON_RADIOS[LUCIDE_ICON].checked) {
    LUCIDE_SLUG.classList.remove("hidden");
    SIMPLE_SLUG.classList.add("hidden");
    LUCIDE_LINK.classList.remove("hidden");
    SIMPLE_LINK.classList.add("hidden");
    ICON_UPLOAD.classList.add("hidden");
  } else if (ICON_RADIOS[SIMPLE_ICON].checked) {
    LUCIDE_SLUG.classList.add("hidden");
    SIMPLE_SLUG.classList.remove("hidden");
    LUCIDE_LINK.classList.add("hidden");
    SIMPLE_LINK.classList.remove("hidden");
    ICON_UPLOAD.classList.add("hidden");
  } else {
    LUCIDE_SLUG.classList.add("hidden");
    SIMPLE_SLUG.classList.add("hidden");
    LUCIDE_LINK.classList.add("hidden");
    SIMPLE_LINK.classList.add("hidden");
    ICON_UPLOAD.classList.add("hidden");
  }
};

const fetchSimpleIcon = async (slug) => {
  return `https://simpleicons.org/icons/${slug}.svg`;
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
  return `https://unpkg.com/lucide-static@latest/icons/${slug}.svg`;
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

const closeModal = () => MODAL_CONTAINER.classList.add("hidden");

const cancelModal = () => {
  currentMode = prevMode;
  ICON_UPLOAD.files = REAL_ICON.files;
  ICON_RADIOS[prevMode].checked = true;
  closeModal();
  return;
};

const saveModal = async () => {
  currentMode = Array.from(ICON_RADIOS).findIndex((radio) => radio.checked);
  if (currentMode == UPLOAD_ICON) {
    REAL_ICON.files = ICON_UPLOAD.files;
  }
  if (currentMode == SIMPLE_ICON) {
    const slugCheck = await checkValidSimpleSlug(SIMPLE_SLUG.value);
    if (slugCheck == false) {
      alert("Invalid Simple slug!");
      SIMPLE_SLUG.value = prevSimpleSlug;
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
      return;
    }
    currentLucideSlug = LUCIDE_SLUG.value;
    currentLucideImage = fetchLucideIcon(currentLucideSlug);
  }
  closeModal();
  generateFolders();
  disabledHandler();
  return;
};

ICON_RADIOS.forEach((radio) => radio.addEventListener("change", updateInputs));

ICON_RADIOS[0].checked = true;
