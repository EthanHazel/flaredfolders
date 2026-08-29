<script>
    import { mainStore, updateStores } from "../utils/stores.js";
    import Tooltip from "./tooltip.svelte";
    import { _ } from "svelte-i18n";

    let { key, value, tooltip = false } = $props();

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
</script>

<label>
    <input
        type="radio"
        name={key}
        id="{key}-{value}"
        bind:group={$mainStore[$mainStore.selectedSizes[0]][key]}
        {value}
        oninput={(e) => {
            updateStores(key, value);
        }}
        onclick={(e) => {
            // Oninput doesn't trigger if it's already the selected option. Can be buggy for mixed options. Using onclick as a fallback.
            updateStores(key, value);
        }}
    />
    {$_(`inputs.${value}`)}
    {#if tooltip}
        <Tooltip key="{key}{capitalizeFirstLetter(value)}" />
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
