<script>
    import { _ } from "svelte-i18n";

    import Tooltip from "./tooltip.svelte";
    import { mainStore, updateStores } from "../utils/stores.js";

    let { key, tooltip = false } = $props();
</script>

<label>
    {$_(`inputs.${key}`)}:
    {#if tooltip}
        <Tooltip {key} />
    {/if}
    <input
        type="text"
        name={key}
        id={key}
        bind:value={$mainStore[$mainStore.selectedSizes[0]][key]}
        oninput={(e) => {
            updateStores(key, e.target.value);
        }}
    />
</label>

<style>
    label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: var(--interface-gap);
        text-wrap: nowrap;

        & input {
            margin: 0;
            width: 100%;
        }
    }
</style>
