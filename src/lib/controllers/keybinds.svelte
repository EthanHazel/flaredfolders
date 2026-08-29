<script>
    import {
        openModal,
        interfaceStore,
        saveProjectFile,
        undo,
        redo,
    } from "../utils/stores";

    import { settingsStore } from "../utils/local-storage";

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        const isCtrlOrCmd = e.ctrlKey || e.metaKey;
        if (!isCtrlOrCmd) return;

        const key = e.key.toLowerCase();

        // Check if the current screen is the editor
        if ($interfaceStore.currentScreen === "editor") {
            if (key === "z" && !e.shiftKey) {
                // Undo
                e.preventDefault();
                undo();
            } else if (key === "y" || (key === "z" && e.shiftKey)) {
                // Redo
                e.preventDefault();
                redo();
            } else if (key === "e" || (key === "s" && e.shiftKey)) {
                // Export (default)
                e.preventDefault();
                if ($settingsStore.saveBind == "save") {
                    if (
                        $interfaceStore.currentScreen === "editor" &&
                        $interfaceStore.currentModal === null
                    ) {
                        openModal("export-as");
                    }
                } else {
                    saveProjectFile();
                }
            } else if (key === "s") {
                // Save (default)
                e.preventDefault();
                if ($settingsStore.saveBind == "export") {
                    if ($interfaceStore.currentModal === null) {
                        openModal("export-as");
                    }
                } else {
                    saveProjectFile();
                }
            }
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />
