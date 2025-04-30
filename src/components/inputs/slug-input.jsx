import { createRef } from "react";

import FolderIconPreview from "@/components/folder/folder-icon-preview";
import { folderConfigStore } from "@/stores/folder-config";
import { setLucideSlug } from "@/functions/fetch-lucide";
import { setSimpleSlug } from "@/functions/fetch-simple";

import "@/styles/slug-input.css";

export default function SlugInput() {
  const iconType = folderConfigStore((state) => state.iconType);

  const lucideSlug = folderConfigStore((state) => state.lucideSlug);
  const simpleSlug = folderConfigStore((state) => state.simpleSlug);

  const inputRef = createRef();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const slugValue = inputRef.current.value;
      if (iconType === "simple") {
        setSimpleSlug(slugValue);
      } else {
        setLucideSlug(slugValue);
      }
    }
  };

  const handleClick = () => {
    const slugValue = inputRef.current.value;
    if (iconType === "simple") {
      setSimpleSlug(slugValue);
    } else {
      setLucideSlug(slugValue);
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
            Current Icon: {iconType === "lucide" ? lucideSlug : simpleSlug}
            <a
              href={
                iconType === "lucide"
                  ? "https://lucide.dev"
                  : "https://simpleicons.org"
              }
              target="_blank"
            >
              Browse
            </a>
          </span>
          <span id="slug-input-right-container">
            <input
              type="text"
              name="lucide-icon"
              placeholder="Slug"
              ref={inputRef}
              className="slug"
              onKeyUp={handleKeyPress}
            />
            <button type="button" onClick={handleClick}>
              Set Icon
            </button>
          </span>
        </span>
      </span>
    </div>
  );
}
