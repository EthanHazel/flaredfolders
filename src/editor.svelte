<script>
    import { mainStore } from "./lib/utils/stores";

    import FolderPanel from "./lib/panels/folder.svelte";
    import IconPanel from "./lib/panels/icon.svelte";

    import ImportantThing from "./lib/important-thing.svelte";

    import Gallery from "./lib/panels/gallery.svelte";
</script>

<div id="editor" class="screen">
    <FolderPanel />

    <Gallery />

    <IconPanel />

    <ImportantThing />
</div>

<style>
    #editor {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: space-between;
        height: 100%;
        width: 100%;
        gap: var(--interface-gap);
    }
</style>
