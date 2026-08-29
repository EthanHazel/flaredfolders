<script>
    import { _ } from "svelte-i18n";
    import SvelteMarkdown from "@humanspeak/svelte-markdown";

    import { closeModal } from "../utils/stores";
    import { version } from "../../../package.json";

    let dialogEl;
    $effect(() => {
        dialogEl?.showModal();
    });

    const changelogs = import.meta.glob("../../docs/changelogs/*.md", {
        query: "?raw",
        import: "default",
        eager: true,
    });

    const changelogPath = `../../docs/changelogs/${version}.md`;
    const CHANGELOG =
        changelogs[changelogPath] ?? $_("modals.changelog.notFound");
</script>

<dialog
    id="changelog-modal"
    class="contains-rooty"
    bind:this={dialogEl}
    onclose={closeModal}
>
    <img
        src="/assets/rooty/newspaper.png"
        alt="Rooty Holding Newspaper"
        class="rooty"
    />

    <div class="modal-header">
        <span class="modal-title">{$_("modals.changelog.title")}</span>
        <div class="modal-buttons">
            <span class="modal-disclaimer"
                >{$_("modals.changelog.disclaimer")}</span
            >
            <button
                commandfor="changelog-modal"
                command="close"
                onclick={closeModal}
            >
                {$_("actions.done")}
            </button>
        </div>
    </div>
    <div class="modal-content" lang="en-US">
        <SvelteMarkdown source={CHANGELOG} />
    </div>
</dialog>
