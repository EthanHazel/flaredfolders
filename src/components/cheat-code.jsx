// I can have fun sometimes

import { useEffect } from "react";

import { folderConfigStore } from "@/stores/folder-config";

export default function CheatCode() {
  const setFolderType = folderConfigStore((state) => state.setFolderType);
  const setSmallType = folderConfigStore((state) => state.setFolderSmallType);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    let inputBuffer = [];
    let timer;

    const playSound = () => {
      const audio = new Audio("/cheat/cheat-code.mp3");
      audio.play();
    };

    const handleKeyDown = (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        inputBuffer = [];
      }, 2000);

      inputBuffer.push(e.key);

      if (inputBuffer.length > konamiCode.length) {
        inputBuffer.shift();
      }

      if (inputBuffer.join("") === konamiCode.join("")) {
        setSmallType("folderOnly");
        setFolderType("win95");
        playSound();
        inputBuffer = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
