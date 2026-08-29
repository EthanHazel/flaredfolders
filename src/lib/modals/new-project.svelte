<script>
    import { closeModal } from "../utils/stores";

    import PresetLoader from "../preset-loader.svelte";

    import { _ } from "svelte-i18n";

    let dialogEl;

    $effect(() => {
        dialogEl?.showModal();
    });
</script>

<dialog
    id="new-project-modal"
    class="contains-rooty"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img src="/assets/rooty/holding.png" alt="Rooty Holding" class="rooty" />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.newProject.title")}</span>
        <div class="modal-buttons">
            <button
                commandfor="new-project-modal"
                command="cancel"
                onclick={closeModal}
            >
                {$_("actions.cancel")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        <PresetLoader />
    </div>
</dialog>

<style>
    dialog {
        width: 50%;
    }
</style>
