<script>
    import { closeModal, SIZES } from "../utils/stores";

    import ExportPng from "../buttons/export-png.svelte";
    import ExportZip from "../buttons/export-zip.svelte";
    import ExportIco from "../buttons/export-ico.svelte";

    import { _ } from "svelte-i18n";

    let dialogEl;

    $effect(() => {
        dialogEl?.showModal();
    });
</script>

<dialog
    id="export-modal"
    class="contains-rooty"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img src="/assets/rooty/save.png" alt="Rooty Download" class="rooty" />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.exportAs.title")}</span>
        <div class="modal-buttons">
            <button
                commandfor="settings"
                command="export-modal"
                onclick={closeModal}
            >
                {$_("actions.done")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        {#each SIZES as size}
            <ExportPng svgId="folder-{size}" />
        {/each}

        <ExportZip />

        <ExportIco />
    </div>
</dialog>
