<script>
    import {
        mainStore,
        updateStoresSilently,
        saveStep,
    } from "../utils/stores.js";

    import Tooltip from "./tooltip.svelte";
    import { RotateCcw } from "@lucide/svelte";

    let { min, max, key, step, defaultValue = 0, tooltip = false } = $props();

    /** @param {PointerEvent} e */
    function startDrag(e) {
        // Fires once, wherever the pointer is released, even off the input.
        window.addEventListener("pointerup", handleRelease, { once: true });
    }

    function handleRelease() {
        saveStep();
    }

    function reset() {
        updateStoresSilently(key, defaultValue);
    }

    import { _ } from "svelte-i18n";
</script>

<label for={key}>
    <div class="range-controls">
        {$_(`inputs.${key}`)}:
        <div class="range-control-inputs">
            {#if tooltip}
                <Tooltip {key} />
            {/if}
            <input
                type="number"
                value={$mainStore[$mainStore.selectedSizes[0]][key]}
                {min}
                {max}
                {step}
                oninput={(e) => {
                    updateStoresSilently(key, e.target.value);
                }}
            />
            <button onclick={reset} class="reset-button">
                <RotateCcw size={16} />
            </button>
        </div>
    </div>
    <input
        type="range"
        name={key}
        id={key}
        {min}
        {max}
        bind:value={$mainStore[$mainStore.selectedSizes[0]][key]}
        {step}
        oninput={(e) => {
            updateStoresSilently(key, e.target.value);
        }}
        onpointerdown={startDrag}
    />
</label>

<style>
    label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: var(--interface-gap);

        & input {
            width: 100%;
        }

        & .range-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: var(--interface-gap);
            text-wrap: nowrap;

            & .range-control-inputs {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: var(--interface-gap);
                width: fit-content;

                & input[type="number"] {
                    text-align: center;
                }
            }
        }
    }

    .reset-button {
        width: 36px;
        height: 36px;
        aspect-ratio: 1;
        background: none;
        border: none;
        color: var(--text-color);
        opacity: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        &:hover {
            opacity: 100%;
            background-color: rgba(from var(--text-color) r g b / 0.1);
        }
    }
</style>
