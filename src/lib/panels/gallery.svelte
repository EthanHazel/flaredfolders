<script>
    import { SIZES, folderTypes } from "../utils/stores";
    import FolderContainer from "../folders/folder-container.svelte";
    import BackgroundController from "../controllers/background.svelte";
</script>

<output id="gallery">
    <BackgroundController />
    <FolderContainer folderType={$folderTypes[256]} folderSize={256} />
    <div class="gallery-small">
        <FolderContainer folderType={$folderTypes[64]} folderSize={64} />
        <FolderContainer folderType={$folderTypes[48]} folderSize={48} />
        <FolderContainer folderType={$folderTypes[40]} folderSize={40} />
    </div>
    <div class="gallery-small">
        <FolderContainer folderType={$folderTypes[32]} folderSize={32} />
        <FolderContainer folderType={$folderTypes[24]} folderSize={24} />
        <FolderContainer folderType={$folderTypes[20]} folderSize={20} />
        <FolderContainer folderType={$folderTypes[16]} folderSize={16} />
    </div>
</output>

<style>
    output {
        position: relative;
        display: flex;
        width: 50%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
        corner-shape: squircle;
        border-radius: 1rem;
        overflow: hidden;
        gap: var(--interface-gap);
        background-image: linear-gradient(
            0deg,
            rgba(from var(--background-color) r g b / 1) 0%,
            rgba(from var(--background-color) r g b / 0) 25%,
            rgba(from var(--background-color) r g b / 0) 75%,
            rgba(from var(--background-color) r g b / 1) 100%
        );
    }

    .gallery-small {
        display: flex;
        flex-direction: row;
        gap: var(--interface-gap);
    }
</style>
