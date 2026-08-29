<script>
    import { closeModal } from "../utils/stores";

    import CREDITS from "../data/credits.json";
    import LINKS from "../data/links.json";
    import { version } from "../../../package.json";

    import { _ } from "svelte-i18n";

    let dialogEl;

    $effect(() => {
        dialogEl?.showModal();
    });
</script>

<dialog
    id="credits-modal"
    class="contains-rooty"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img src="/assets/rooty/normal.png" alt="Rooty" class="rooty" />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.credits.title")}</span>
        <div class="modal-buttons">
            <button
                commandfor="credits-modal"
                command="close"
                onclick={closeModal}
            >
                {$_("actions.done")}
            </button>
        </div>
    </div>

    <div class="modal-content">
        <div id="credits">
            <div class="credit">
                <span class="credit-title">{$_("modals.credits.leadDev")}</span>
                <span class="credit-content">{CREDITS.leadDev}</span>
            </div>

            <div class="credit">
                <span>{$_("modals.credits.artwork")}</span>
                <a class="credit-content" href={LINKS.nhj} target="_blank"
                    >{CREDITS.artwork}</a
                >
            </div>

            <div class="credit">
                <span class="credit-title"
                    >{$_("modals.credits.donations")}</span
                >
                <div class="credit-content">
                    {#each CREDITS.legacyDonations as credit}
                        <span class="credit-item">{credit}</span>
                    {/each}
                </div>
            </div>

            <div class="credit">
                <span class="credit-title"
                    >{$_("modals.credits.specialThanks")}</span
                >
                <div class="credit-content">
                    {#each CREDITS.specialThanks as credit}
                        <span class="credit-item">{credit}</span>
                    {/each}
                </div>
            </div>
        </div>

        <a href={LINKS.phosphorus} target="_blank"
            >Made with {"<"}3 at Phosphorus</a
        >

        <span class="version">{$_("modals.credits.version")}{version}</span>
    </div>
</dialog>

<style>
    #credits-modal {
        width: fit-content;
    }

    #credits {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: calc(var(--interface-gap) * 3);
    }

    .credit {
        display: flex;
        flex-direction: column;
        gap: var(--interface-gap);
    }

    .credit-content {
        display: flex;
        flex-direction: column;
        gap: var(--interface-gap);
        opacity: 0.5;
        color: var(--text-color);
    }
</style>
