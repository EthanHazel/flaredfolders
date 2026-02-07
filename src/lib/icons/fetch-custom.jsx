// fetch-custom

import { folderConfigStore } from "@/stores/folder-config";

const customLoadingPromises = {};

export function loadCustom(customFileName) {
  // Return existing promise if already loading this file
  if (customLoadingPromises[customFileName]) {
    return customLoadingPromises[customFileName];
  }

  customLoadingPromises[customFileName] = (async () => {
    try {
      const currentState = folderConfigStore.getState();
      const customIconInput = document.getElementById("custom-icon");

      const loadImageFromData = (data) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = data;
        });
      };

      // Handle case when no file is selected
      if (!customIconInput?.files?.[0]) {
        if (customFileName === "placeholder" && currentState.customData) {
          return currentState.customData;
        }

        // Load temp-icon
        const tempIconPath = "/images/folder-assets/temp-icon.svg";
        const response = await fetch(tempIconPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch temp icon: ${response.statusText}`);
        }

        const blob = await response.blob();
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read blob"));
          reader.readAsDataURL(blob);
        });

        const img = await loadImageFromData(data);

        folderConfigStore.setState({
          customData: img,
          customFileName: "placeholder",
        });

        return img;
      }

      // Handle case when file is selected
      if (
        customIconInput.files[0].name === customFileName &&
        currentState.customData
      ) {
        return currentState.customData;
      }

      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(customIconInput.files[0]);
      });

      const img = await loadImageFromData(data);

      folderConfigStore.setState({
        customData: img,
        customFileName: customIconInput.files[0].name,
      });

      return img;
    } catch (error) {
      console.error("Error loading custom icon:", error);
      throw error;
    } finally {
      delete customLoadingPromises[customFileName];
    }
  })();

  return customLoadingPromises[customFileName];
}
