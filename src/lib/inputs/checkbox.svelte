<script>
    import { mainStore, updateStores } from "../utils/stores.js";
    import Tooltip from "./tooltip.svelte";

    import { Check } from "@lucide/svelte";
    import { _ } from "svelte-i18n";

    let { key, tooltip = false } = $props();
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

    <div
        class="fake-checkbox"
        class:checked={$mainStore[$mainStore.selectedSizes[0]][key]}
    >
        <div class="fake-checkbox-inner">
            <Check size={16} />
        </div>
    </div>

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
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
            background-color: rgba(from var(--text-color) r g b / 0.1);
        }

        & input {
            display: none;
        }

        & .fake-checkbox {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 5px;
            outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
            outline-offset: -1px;
            cursor: pointer;

            & .fake-checkbox-inner {
                color: var(--white-color);
                opacity: 0;

                :global(& svg) {
                    margin-top: 5px;
                    stroke-width: 4px;
                    width: 12px;
                    height: 12px;
                }
            }

            &.checked {
                outline: 1px solid rgba(from var(--white-color) r g b / 0.25);
                background-color: var(--primary-color);
                & .fake-checkbox-inner {
                    opacity: 1;
                }
            }
        }
    }
</style>
