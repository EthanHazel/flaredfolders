import { folderConfigStore } from "@/stores/folder-config";

export function loadCustom(customFileName) {
  return new Promise((resolve) => {
    const currentState = folderConfigStore.getState();
    const customIconInput = document.getElementById("custom-icon");

    const loadImageFromData = (data) => {
      return new Promise((resolveImage) => {
        const img = new Image();
        img.onload = () => resolveImage(img);
        img.onerror = () => {
          console.error("Failed to load image");
          resolveImage(null);
        };
        img.src = data;
      });
    };

    // Handle case when no file is selected
    if (!customIconInput?.files?.[0]) {
      if (customFileName === "placeholder") {
        resolve(currentState.customData);
        return;
      }

      // Load temp-icon
      const tempIconPath = "/folder-assets/temp-icon.svg";
      fetch(tempIconPath)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = async () => {
            const data = reader.result;
            const img = await loadImageFromData(data);
            folderConfigStore.setState({
              customData: img, // Store the Image object
              customFileName: "placeholder",
            });
            resolve(img);
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          console.error("Failed to load temp icon:", error);
          resolve(null);
        });
      return;
    }

    // Handle case when file is selected
    if (customIconInput.files[0].name === customFileName) {
      resolve(currentState.customData);
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const data = reader.result;
        const img = await loadImageFromData(data);
        folderConfigStore.setState({
          customData: img, // Store the Image object
          customFileName: customIconInput.files[0].name,
        });
        resolve(img);
      };
      reader.readAsDataURL(customIconInput.files[0]);
    }
  });
}
