<script>
    import { mainStore } from "./utils/stores";

    import LucideIcon from "./icons/lucide.svelte";
    import SimpleIcon from "./icons/simple.svelte";
    import CustomIcon from "./icons/custom.svelte";
    import MissingIcon from "./icons/missing.svelte";

    let props = $props();
</script>

{#if $mainStore[props.folderSize].iconType == "none"}
    <span></span>
{:else if $mainStore[props.folderSize].iconType == "lucide"}
    <LucideIcon {...props} />
{:else if $mainStore[props.folderSize].iconType == "simple"}
    <SimpleIcon {...props} />
{:else if $mainStore[props.folderSize].iconType == "custom"}
    <CustomIcon {...props} />
{:else}
    <MissingIcon {...props} />
{/if}
