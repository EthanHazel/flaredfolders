<script>
    import { closeModal, openModal } from "../utils/stores";
    import LINKS from "../data/links.json";

    import { _ } from "svelte-i18n";

    function goToSettings() {
        let settings = JSON.parse(localStorage.getItem("settings"));

        if (settings.returningUser == false) {
            settings.returningUser = true;
            localStorage.setItem("settings", JSON.stringify(settings));
        }

        openModal("settings");
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

<dialog
    id="welcome-modal"
    class="contains-rooty"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img src="/assets/rooty/wave.png" alt="Rooty Waving" class="rooty" />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.welcome.title")}</span>
        <div class="modal-buttons">
            <button class="primary" onclick={() => goToSettings()}
                >{$_("actions.next")}</button
            >
        </div>
    </div>

    <div class="modal-content">
        <p class="center">{$_("modals.welcome.description")}</p>
        <p class="center">{$_("modals.welcome.discord")}</p>
        <a href={LINKS.discord} class="center"
            >{$_("modals.welcome.discordLink")}</a
        >
    </div>
</dialog>
