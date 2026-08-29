<script>
    import {
        loadDataToStore,
        interfaceStore,
        closeModal,
        mainStore,
    } from "./utils/stores";

    import { settingsStore } from "./utils/local-storage";

    import { _ } from "svelte-i18n";

    import PRESETS from "./folders/presets.json";

    /**
     * Loads the specified preset into the mainStore and switches to the editor screen.
     * @param {any} preset
     */
    function loadPreset(preset) {
        const newData = {
            ...preset.data,
            folderName: $_(`presets.${preset.slug}.title`),
        };
        $interfaceStore.currentScreen = "editor";
        loadDataToStore(newData);
        closeModal();
    }

    /**
     * Checks if the current store is dirty or not.
     * @param {any} preset
     */
    function checkDirty(preset) {
        if (
            $mainStore.dirty == true &&
            $interfaceStore.currentScreen == "editor" &&
            $settingsStore.unsavedWarning == true
        ) {
            if (
                window.confirm(
                    "Opening this project will discard any unsaved changes. Are you sure you want to continue?",
                )
            ) {
                loadPreset(preset);
            }
        } else {
            loadPreset(preset);
        }
    }
</script>

<div id="presets">
    {#each PRESETS as preset}
        <a class="preset" on:click={() => checkDirty(preset)}>
            <img
                src="./assets/presets/{preset.slug}.png"
                alt="{$_(`presets.${preset.slug}.title`)} Image"
                class="preset-image"
            />
            <div class="preset-title">{$_(`presets.${preset.slug}.title`)}</div>
            <div class="preset-description">
                {$_(`presets.${preset.slug}.description`)}
            </div>
        </a>
    {/each}
</div>

<style>
    #presets {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(1, 1fr);
        gap: var(--interface-gap);
    }

    .preset {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
        gap: var(--interface-gap);
        cursor: pointer;
        padding: var(--interface-gap);
        border-radius: calc(1rem + var(--interface-gap));
        corner-shape: squircle;

        &:hover {
            background-color: rgba(from var(--text-color) r g b / 0.25);
        }

        &:active {
            background-color: rgba(from var(--text-color) r g b / 0.1);
        }
    }

    .preset-image {
        width: 100%;
        border-radius: 1rem;
        corner-shape: squircle;
        border: 1px solid rgba(from var(--text-color) r g b / 0.25);
        background-color: rgba(from var(--text-color) r g b / 0.1);
    }

    .preset-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--text-color);
    }

    .preset-description {
        font-size: 1rem;
        color: var(--text-color);
        opacity: 50%;
    }
</style>
