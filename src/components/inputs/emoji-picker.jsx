import * as emoji from "node-emoji";
import { useState } from "react";

import { emojiToCodePoint } from "@/functions/fetch-emoji";
import { folderConfigStore } from "@/stores/folder-config";

import "@/styles/emoji-picker.css";

export default function EmojiPicker() {
  const emojiSlug = folderConfigStore((state) => state.emojiSlug);
  const setEmojiSlug = folderConfigStore((state) => state.setEmojiSlug);
  const [search, setSearch] = useState("");
  return (
    <div id="emoji-picker">
      <input
        type="search"
        name="emoji-search"
        id="emoji-search"
        placeholder="Search emoji..."
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div id="emoji-list">
        {emoji.search(search).length > 0 ? (
          emoji.search(search).map((emoji) => (
            <span
              key={emoji.slug}
              className={emojiSlug === emoji.emoji ? "selected emoji" : "emoji"}
              onClick={() => setEmojiSlug(emoji.emoji)}
            >
              {emoji.emoji}
            </span>
          ))
        ) : (
          <span id="emoji-no-results">No results :/</span>
        )}
      </div>
    </div>
  );
}
