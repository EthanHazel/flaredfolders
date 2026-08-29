<script>
    import { closeModal } from "../utils/stores";
    import { settingsStore } from "../utils/local-storage";
    import Tooltip from "../inputs/tooltip.svelte";
    import { _, locale, locales } from "svelte-i18n";
    import LOCALE_NAMES from "../data/locale-names.json";

    const originalSettings = { ...$settingsStore };

    function cancelSettings() {
        settingsStore.set(originalSettings);
    }

    /**
     * Updates the language setting and saves it to local storage.
     * @param {string} locale - The locale to set.
     */

    function updateLanguage(lang) {
        locale.set(lang);
        settingsStore.update((store) => {
            store.language = lang;
            return store;
        });
    }

    let dialogEl;
    $effect(() => {
        dialogEl?.showModal();

        dialogEl?.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
            }
        });
    });
</script>

<dialog id="settings-modal" bind:this={dialogEl} onclose={closeModal}>
    <div class="modal-header">
        <span class="modal-title">{$_("modals.settings.title")}</span>
        <div class="modal-buttons">
            <button
                commandfor="settings-modal"
                command="close"
                onclick={cancelSettings}
            >
                {$_("actions.cancel")}
            </button>
            <button commandfor="settings-modal" command="close" class="primary">
                {$_("actions.done")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        <label for="debug-mode">
            <input
                type="checkbox"
                id="debug-mode"
                bind:checked={$settingsStore.debugMode}
            />
            {$_("modals.settings.debugMode")}
            <Tooltip key="debugMode" />
        </label>
        <label for="unsaved-warning">
            <input
                type="checkbox"
                id="unsaved-warning"
                bind:checked={$settingsStore.unsavedWarning}
            />
            {$_("modals.settings.unsavedWarning")}
            <Tooltip key="unsavedWarning" />
        </label>
        <label for="save-bind">
            {$_("modals.settings.saveBind.label")}:
            <select name="save-bind" bind:value={$settingsStore.saveBind}>
                <option value="save"
                    >{$_("modals.settings.saveBind.save")}</option
                >
                <option value="export"
                    >{$_("modals.settings.saveBind.export")}</option
                >
            </select>
        </label>
        <label for="theme">
            {$_("modals.settings.theme.label")}:
            <select name="theme" bind:value={$settingsStore.theme}>
                <option value="dark">{$_("modals.settings.theme.dark")}</option>
                <option value="light"
                    >{$_("modals.settings.theme.light")}</option
                >
            </select>
        </label>
        <label for="locale">
            {$_("modals.settings.locale.label")}:
            <select
                name="language"
                onchange={(e) => updateLanguage(e.target.value)}
                bind:value={$settingsStore.language}
            >
                {#each $locales as locale}
                    <option value={locale}>{LOCALE_NAMES[locale]}</option>
                {/each}
            </select>
        </label>
    </div>
</dialog>

<style>
    label {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: var(--interface-gap);
    }
</style>
