<script>
    import { CircleX, LoaderCircle } from "@lucide/svelte";
    import { mainStore } from "../utils/stores";

    let { folderType, folderSize, ...restProps } = $props();
    const modules = import.meta.glob("./**/*.svelte");
    let componentPromise = $derived(loadFolder(folderType, folderSize));

    async function loadFolder(type, size) {
        const path = `./${type}/${size}.svelte`;
        const importer = modules[path];
        if (!importer) {
            console.warn(`Folder component not found: ${path}`);
            return null;
        }
        try {
            const mod = await importer();
            return mod.default;
        } catch (err) {
            console.warn(`Failed to load folder component: ${path}`, err);
            return null;
        }
    }

    function toggleSelected() {
        if ($mainStore.selectedSizes.includes(folderSize)) {
            if ($mainStore.selectedSizes.length === 1) return;
            $mainStore.selectedSizes = $mainStore.selectedSizes.filter(
                (size) => size !== folderSize,
            );
        } else {
            $mainStore.selectedSizes = [
                ...$mainStore.selectedSizes,
                folderSize,
            ];
        }
    }
</script>

{#await componentPromise}
    <div class="folder-container">
        <div id="folder-{folderSize}" class="fake-folder">
            <LoaderCircle size={folderSize} class="loader" />
        </div>
    </div>
{:then Component}
    {#if Component}
        <div
            class="folder-container"
            class:selected={$mainStore.selectedSizes.includes(folderSize)}
            onclick={toggleSelected}
        >
            <Component {...restProps} />
        </div>
    {:else}
        <div class="folder-container">
            <div id="folder-{folderSize}" class="fake-folder">
                <CircleX color="red" size={folderSize} />
            </div>
        </div>
    {/if}
{/await}

<style>
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .folder-container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(from var(--text-color) r g b / 0.25);
        background-color: rgba(from var(--background-color) r g b / 0.5);
        padding: 6px;
        min-width: 64px;
        min-height: 64px;
        border-radius: 1rem;
        corner-shape: squircle;
        backdrop-filter: blur(1rem);
        cursor: pointer;
        aspect-ratio: 1;
        transition: opacity 0.05s ease-in-out;

        &:hover {
            background-color: rgba(from var(--text-color) r g b / 0.25);
        }

        :global(&:not(.selected)) {
            opacity: 25%;
        }
    }

    :global(.loader) {
        animation: spin 1s linear infinite;
        color: var(--text-color);
    }
</style>
