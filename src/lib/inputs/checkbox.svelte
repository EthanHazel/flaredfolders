<script>
    import { mainStore, updateStores } from "../utils/stores.js";
    import Tooltip from "./tooltip.svelte";
    let { key, tooltip = false } = $props();

    import { _ } from "svelte-i18n";
</script>

<label>
    <input
        type="checkbox"
        name={key}
        id={key}
        bind:checked={$mainStore[$mainStore.selectedSizes[0]][key]}
        oninput={(e) => {
            updateStores(key, e.target.checked ? true : false);
        }}
    />

    {$_(`inputs.${key}`)}
    {#if tooltip}
        <Tooltip {key} />
    {/if}
</label>

<style>
    label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: var(--interface-gap);

        & input {
            margin: 0;
        }
    }
</style>
