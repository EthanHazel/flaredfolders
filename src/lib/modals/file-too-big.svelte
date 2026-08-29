<script>
    import { closeModal } from "../utils/stores";

    import { _ } from "svelte-i18n";

    let dialogEl;

    $effect(() => {
        dialogEl?.showModal();
    });
</script>

<dialog
    class="contains-rooty"
    id="file-too-big-modal"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img src="/assets/rooty/busy.png" alt="Rooty Busy" class="rooty" />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.fileTooBig.title")}</span>
        <div class="modal-buttons">
            <button
                commandfor="file-too-big-modal"
                command="close"
                onclick={closeModal}
            >
                {$_("actions.dismiss")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        <p class="center">
            {$_("modals.fileTooBig.description")}
        </p>
        <p class="center">{$_("modals.fileTooBig.maxSize")}</p>
    </div>
</dialog>

<style>
    .modal-content {
        min-height: fit-content;
    }
</style>
