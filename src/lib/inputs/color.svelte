<script>
    import {
        mainStore,
        updateStores,
        updateStoresSilently,
    } from "../utils/stores.js";
    import Tooltip from "./tooltip.svelte";

    let { key, tooltip = false } = $props();

    import { _ } from "svelte-i18n";
</script>

<label for={key}
    ><span class="color-label">
        {$_(`inputs.${key}`)}:
        {#if tooltip}
            <Tooltip {key} />
        {/if}
    </span>
    <input
        type="color"
        name={key}
        id={key}
        bind:value={$mainStore[$mainStore.selectedSizes[0]][key]}
        oninput={(e) => {
            updateStoresSilently(key, e.target.value);
        }}
        onblur={(e) => {
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

        & input {
            margin: 0;
            width: 25%;
        }
    }

    .color-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--interface-gap);
    }
</style>
