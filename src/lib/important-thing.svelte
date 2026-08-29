<script>
    import { mainStore, SIZES } from "./utils/stores.js";

    let isBlankIcon = $derived(
        SIZES.every(
            (size) =>
                $mainStore[size]?.folderType === "icon-only" &&
                $mainStore[size]?.iconType === "none",
        ),
    );
</script>

{#if isBlankIcon}
    <img
        src="./assets/why-would-you-even-want-that.png"
        alt="Why would you even want that?"
        id="dude-why"
    />
{/if}

<style>
    #dude-why {
        position: fixed;
        bottom: 0px;
        right: 0px;
        pointer-events: none;
    }
</style>
