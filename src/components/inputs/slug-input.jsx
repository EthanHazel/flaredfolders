import { createRef } from "react";

import FolderIconPreview from "@/components/folder/folder-icon-preview";
import { folderConfigStore } from "@/stores/folder-config";
import { useTranslations } from "next-intl";
import {
  setLucideSlug,
  checkLucide,
  convertLucideSlug,
} from "@/functions/fetch-lucide";
import {
  setSimpleSlug,
  checkSimple,
  convertSimpleSlug,
} from "@/functions/fetch-simple";

import { Download } from "lucide-react";

import "@/styles/inputs/slug-input.css";

export default function SlugInput() {
  const iconType = folderConfigStore((state) => state.iconType);
  const lucideSlug = folderConfigStore((state) => state.lucideSlug);
  const simpleSlug = folderConfigStore((state) => state.simpleSlug);
  const inputRef = createRef();
  const t = useTranslations("iconConfig");

  const handleInput = async (event) => {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.key === "Enter")
    ) {
      const slugValue = inputRef.current.value;
      if (iconType === "simple") {
        if (checkSimple(convertSimpleSlug(slugValue)) === false) {
          inputRef.current.style.animation = "invalid 0.5s ease-out";
          setTimeout(() => {
            inputRef.current.style.animation = "";
          }, 1000);
          return;
        } else {
          setSimpleSlug(convertSimpleSlug(slugValue));
          inputRef.current.value = "";
        }
      } else {
        const slugCheck = await checkLucide(convertLucideSlug(slugValue));
        if (slugCheck === false) {
          inputRef.current.style.animation = "invalid 0.5s ease-out";
          setTimeout(() => {
            inputRef.current.style.animation = "";
          }, 1000);
          return;
        } else {
          setLucideSlug(convertLucideSlug(slugValue));
          inputRef.current.value = "";
          return;
        }
      }
    }
  };

  return (
    <div id="slug-input">
      <span id="slug-input-container">
        <FolderIconPreview
          iconType={iconType}
          slug={
            iconType === "lucide"
              ? folderConfigStore.getState().lucideSlug
              : folderConfigStore.getState().simpleSlug
          }
        />
        <span className="slug-input-right">
          <span id="slug-input-label">
            {t("current")} {iconType === "lucide" ? lucideSlug : simpleSlug}
            <a
              href={
                iconType === "lucide"
                  ? "https://lucide.dev"
                  : "https://simpleicons.org"
              }
              target="_blank"
            >
              {t("browse")}
            </a>
          </span>
          <span id="slug-input-right-container">
            <input
              type="text"
              name="lucide-icon"
              placeholder="Slug"
              ref={inputRef}
              className="slug"
              onKeyUp={handleInput}
            />
            <button type="button" onClick={handleInput} className="slug-button">
              <Download />
            </button>
          </span>
        </span>
      </span>
    </div>
  );
}
