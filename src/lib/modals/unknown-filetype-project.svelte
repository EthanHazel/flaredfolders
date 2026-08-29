<script>
    import { closeModal } from "../utils/stores";

    import { _ } from "svelte-i18n";

    let dialogEl;

    $effect(() => {
        dialogEl?.showModal();
    });
</script>

<dialog
    id="unknown-filetype-project-modal"
    class="contains-rooty"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img src="/assets/rooty/busy.png" alt="Rooty Busy" class="rooty" />

    <div class="modal-header">
        <span class="modal-title"
            >{$_("modals.unknownFileTypeProject.title")}</span
        >
        <div class="modal-buttons">
            <button
                commandfor="unknown-filetype-project-modal"
                command="close"
                onclick={closeModal}
            >
                {$_("actions.dismiss")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        <p class="center">
            {$_("modals.unknownFileTypeProject.description")}
        </p>
        <p class="center disclaimer">
            {$_("modals.unknownFileTypeProject.disclaimer")}
        </p>
    </div>
</dialog>

<style>
    .modal-content {
        min-height: fit-content;
    }

    .disclaimer {
        font-size: 0.875rem;
        opacity: 50%;
    }
</style>
