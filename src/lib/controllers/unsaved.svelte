<script>
    import { mainStore, interfaceStore } from "../utils/stores.js";
    import { settingsStore } from "../utils/local-storage.js";

    function handleBeforeUnload(event) {
        if (
            $mainStore.dirty &&
            $settingsStore.unsavedWarning == true &&
            $interfaceStore.currentScreen === "editor"
        ) {
            event.preventDefault();
            event.returnValue = "";
        }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
</script>
