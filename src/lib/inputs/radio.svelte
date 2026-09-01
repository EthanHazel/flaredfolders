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
    <div
        class="fake-radio"
        class:checked={value === $mainStore[$mainStore.selectedSizes[0]][key]}
    >
        <div class="fake-radio-inner"></div>
    </div>
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
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
            background-color: rgba(from var(--text-color) r g b / 0.1);
        }

        & input {
            display: none;
        }

        & .fake-radio {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            outline: 1px solid rgba(from var(--text-color) r g b / 0.5);
            outline-offset: -1px;
            cursor: pointer;

            & .fake-radio-inner {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                background-color: var(--text-color);
                opacity: 0;
            }

            &.checked {
                background-color: var(--primary-color);
                & .fake-radio-inner {
                    opacity: 1;
                }
            }
        }
    }
</style>
