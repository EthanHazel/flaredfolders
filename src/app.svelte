<script context="module">
    import "./lib/utils/i18n.js";
    import { waitLocale } from "svelte-i18n";

    export async function preload() {
        return waitLocale();
    }
    initSession();
</script>

<script>
    import { interfaceStore } from "./lib/utils/stores";
    import { initSession } from "./lib/utils/local-storage";
    import { isLoading, locale } from "svelte-i18n";

    import TopBar from "./lib/panels/top-bar.svelte";
    import BottomBar from "./lib/panels/bottom-bar.svelte";

    import Home from "./home.svelte";
    import Editor from "./editor.svelte";
    import PrivacyPolicy from "./privacy-policy.svelte";
    import Licenses from "./licenses.svelte";

    import KeybindsController from "./lib/controllers/keybinds.svelte";
    import ModalController from "./lib/controllers/modal.svelte";
    import PrimaryColorController from "./lib/controllers/primary-color.svelte";
    import ThemeController from "./lib/controllers/theme.svelte";
    import ScreenSizeController from "./lib/controllers/screen-size.svelte";
    import UnsavedController from "./lib/controllers/unsaved.svelte";
</script>

<main lang={$locale}>
    {#if $isLoading}
        <span></span>
    {:else}
        <!-- Controllers -->
        <KeybindsController />
        <ModalController />
        <PrimaryColorController />
        <UnsavedController />
        <ThemeController />
        <ScreenSizeController />

        <!-- Screen Content -->
        <TopBar />

        <!-- Main Screens -->
        {#if $interfaceStore.currentScreen === "editor"}
            <Editor />
        {:else if $interfaceStore.currentScreen === "privacy-policy"}
            <PrivacyPolicy />
        {:else if $interfaceStore.currentScreen === "licenses"}
            <Licenses />
        {:else}
            <Home />
        {/if}

        <BottomBar />
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        padding: var(--interface-gap);
        box-sizing: border-box;
        height: 100vh;
        justify-content: space-between;
        align-items: center;
        gap: var(--interface-gap);
    }
</style>
