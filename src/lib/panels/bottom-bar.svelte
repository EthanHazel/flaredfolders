<script>
    import New from "../buttons/new.svelte";
    import Open from "../buttons/open.svelte";
    import Save from "../buttons/save.svelte";

    import { openModal, mainStore, interfaceStore } from "../utils/stores";
    import { _ } from "svelte-i18n";
</script>

<nav id="bottom-bar" class="nav-bar">
    <New />
    <Open />

    {#if $interfaceStore.currentScreen === "editor"}
        <input
            type="text"
            bind:value={$mainStore.folderName}
            placeholder={$_("inputs.placeholders.folderName")}
            id="folder-name"
        />

        <Save />
        <button class="primary" on:click={() => openModal("export-as")}
            >{$_("actions.export")}</button
        >
    {/if}
</nav>

<style>
    .nav-bar {
        bottom: var(--interface-gap);
        left: 50%;
        transform: translateX(-50%);

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: var(--interface-gap);
        gap: var(--interface-gap);

        :global(& button) {
            width: 50%;
        }
        :global(& input[type="text"]) {
            width: 100%;
        }
    }
    #folder-name {
        text-align: center;
    }
</style>
