const MODAL_CONTAINER = document.querySelector(".icon-modal-container");
const MODAL = document.querySelector(".icon-modal");
const ICON_UPLOAD = document.getElementById("file-icon");
const REAL_ICON = document.getElementById("real-icon");

const LUCIDE_SLUG = document.getElementById("lucide-slug");
const SIMPLE_SLUG = document.getElementById("simple-slug");

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

const fetchSimpleIcon = async (slug) => {
  return `https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/${slug}.svg`;
};

const fetchLucideIcon = async (slug) => {
  return `https://unpkg.com/lucide-static@latest/icons/${slug}.svg`;
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

const saveModal = () => {
  currentMode = Array.from(ICON_RADIOS).findIndex((radio) => radio.checked);
  if (currentMode == UPLOAD_ICON) {
    REAL_ICON.files = ICON_UPLOAD.files;
  }
  if (currentMode == SIMPLE_ICON) {
    currentSimpleSlug = SIMPLE_SLUG.value;
    currentSimpleImage = fetchSimpleIcon(currentSimpleSlug);
  }
  if (currentMode == LUCIDE_ICON) {
    currentLucideSlug = LUCIDE_SLUG.value;
    currentLucideImage = fetchLucideIcon(currentLucideSlug);
  }
  closeModal();
  generateFolders();
  disabledHandler();
  return;
};
