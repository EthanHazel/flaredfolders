<script>
    import {
        getColorsMerged,
        mainStore,
        interfaceStore,
    } from "../utils/stores";
    import { clampLightness } from "../utils/color";

    let rawColor = $derived.by(() => {
        if ($interfaceStore.currentScreen !== "editor") return "#808080";
        $mainStore;
        return getColorsMerged();
    });

    let color = $derived(clampLightness(rawColor, 0.35, 0.65));

    $effect(() => {
        document.documentElement.style.setProperty("--primary-color", color);
    });
</script>
