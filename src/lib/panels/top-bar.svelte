<script>
    import Logo from "../logo.svelte";
    import UndoRedo from "../buttons/undo-redo.svelte";

    import Links from "../data/links.json";

    import { openModal, interfaceStore } from "../utils/stores";
    import { settingsStore } from "../utils/local-storage";

    import { Info, Cog, CodeXml, ScrollText } from "@lucide/svelte";
    import {
        SiDiscord,
        SiOpencollective,
        SiGithub,
    } from "@icons-pack/svelte-simple-icons";
</script>

<nav id="top-bar" class="nav-bar">
    <a href={Links.discord} target="_blank" class="nav-button-icon">
        <SiDiscord size={16} />
    </a>
    <a href={Links.openCollective} target="_blank" class="nav-button-icon">
        <SiOpencollective size={16} />
    </a>
    <a href={Links.github} target="_blank" class="nav-button-icon">
        <SiGithub size={16} />
    </a>
    <button onclick={() => openModal("credits")} class="nav-button-icon">
        <Info size={16} />
    </button>

    <Logo />

    {#if $settingsStore.debugMode == true}
        <button onclick={() => openModal("debug")} class="nav-button-icon">
            <CodeXml size={16} />
        </button>
    {:else}
        <button onclick={() => openModal("changelog")} class="nav-button-icon">
            <ScrollText size={16} />
        </button>
    {/if}
    <UndoRedo />
    <button onclick={() => openModal("settings")} class="nav-button-icon">
        <Cog size={16} />
    </button>
</nav>

<style>
    .nav-bar {
        top: var(--interface-gap);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: var(--interface-gap);
        padding: var(--interface-gap);
        z-index: 2;
    }
</style>
