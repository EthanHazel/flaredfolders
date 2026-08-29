<script>
    import { interfaceStore } from "../utils/stores";

    import NewProjectModal from "../modals/new-project.svelte";
    import ExportAsModal from "../modals/export-as.svelte";
    import WelcomeModal from "../modals/welcome.svelte";
    import UnknownFileTypeModal from "../modals/unknown-filetype.svelte";
    import UnknownFileTypeProjectModal from "../modals/unknown-filetype-project.svelte";
    import FileTooBigModal from "../modals/file-too-big.svelte";
    import SettingsModal from "../modals/settings.svelte";
    import CreditsModal from "../modals/credits.svelte";
    import DebugModal from "../modals/debug.svelte";
    import ChangelogModal from "../modals/changelog.svelte";

    // TODO: Dynamically load modal components from the modal folder
</script>

{#if $interfaceStore.currentModal === "new-project"}
    <NewProjectModal />
{:else if $interfaceStore.currentModal === "export-as"}
    <ExportAsModal />
{:else if $interfaceStore.currentModal === "welcome"}
    <WelcomeModal />
{:else if $interfaceStore.currentModal === "unknown-filetype"}
    <UnknownFileTypeModal />
{:else if $interfaceStore.currentModal === "unknown-filetype-project"}
    <UnknownFileTypeProjectModal />
{:else if $interfaceStore.currentModal === "file-too-big"}
    <FileTooBigModal />
{:else if $interfaceStore.currentModal === "settings"}
    <SettingsModal />
{:else if $interfaceStore.currentModal === "debug"}
    <DebugModal />
{:else if $interfaceStore.currentModal === "changelog"}
    <ChangelogModal />
{:else if $interfaceStore.currentModal === "credits"}
    <CreditsModal />
{/if}
