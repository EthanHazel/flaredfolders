<script>
    import { closeModal, openModal, updateStores } from "../utils/stores";
    import { interfaceStore, mainStore } from "../utils/stores";
    import { _ } from "svelte-i18n";

    let dialogEl;
    let settings = JSON.parse(localStorage.getItem("settings"));

    $effect(() => {
        dialogEl?.showModal();
    });

    function factoryResetSettings() {
        localStorage.removeItem("settings");
        settings = null;
    }
</script>

<dialog id="debug-modal" bind:this={dialogEl} onclose={closeModal} lang="en-US">
    <img src="/assets/rooty/holding.png" alt="Rooty" class="rooty" />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.debug.title")}</span>
        <div class="modal-buttons">
            <span class="modal-disclaimer">{$_("modals.debug.disclaimer")}</span
            >
            <button
                commandfor="debug-modal"
                command="close"
                onclick={closeModal}
            >
                {$_("actions.done")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        <p>Force open modal</p>
        <div class="row-control">
            <input
                type="text"
                name="interface-modal-value"
                id="interface-modal-value"
                placeholder="Interface Modal Value"
            />
            <button
                onclick={() =>
                    openModal(
                        document.getElementById("interface-modal-value").value,
                    )}>Set Value</button
            >
        </div>

        <p>Force open screen</p>

        <div class="row-control">
            <input
                type="text"
                name="interface-screen-value"
                id="interface-screen-value"
                placeholder="Interface Screen Value"
            />
            <button
                onclick={() =>
                    interfaceStore.update((store) => {
                        const s = /** @type {any} */ (store);
                        s.currentScreen = document.getElementById(
                            "interface-screen-value",
                        ).value;
                        return s;
                    })}>Set Value</button
            >
        </div>

        <p>Force set main store variable (for selected folders)</p>
        <div class="row-control">
            <input
                type="text"
                name="main-store-key"
                id="main-store-key"
                placeholder="Main Store Key"
            />
            <input
                type="text"
                name="main-store-value"
                id="main-store-value"
                placeholder="Main Store Value"
            />
            <button
                onclick={() =>
                    updateStores(
                        document.getElementById("main-store-key").value,
                        document.getElementById("main-store-value").value,
                    )}>Set Value</button
            >
        </div>

        <div class="row-control">
            <button onclick={() => console.log($mainStore)}
                >Log Main Store</button
            >
            <button onclick={() => console.log($interfaceStore)}
                >Log Interface Store</button
            >
            <button onclick={() => console.log($settings)}
                >Log Settings Variable</button
            >
            <button onclick={factoryResetSettings}
                >Factory Reset Settings Variable</button
            >
        </div>
    </div>
</dialog>

<style>
    .row-control {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: var(--interface-gap);
    }
</style>
