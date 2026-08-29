<script>
    import { CircleQuestionMark } from "@lucide/svelte";
    import { _ } from "svelte-i18n";

    let { key } = $props();
</script>

<div class="tooltip">
    <div class="tooltip-icon" style="anchor-name: --tooltip-{key};">
        <CircleQuestionMark size={16} />
    </div>
    <div
        class="tooltip-text"
        style="
        position-try-fallbacks: --tooltip-{key}, --tooltip-{key}
        flip-inline, bottom left;

        position-anchor: --tooltip-{key};"
    >
        {$_(`tooltips.${key}`)}
    </div>
</div>

<style>
    .tooltip {
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            .tooltip-text {
                opacity: 1;
            }

            .tooltip-icon {
                opacity: 1;
                background-color: rgba(from var(--text-color) r g b / 0.25);
            }
        }
    }

    .tooltip-icon {
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }

    .tooltip-text {
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
        display: flex;
        background-color: var(--background-color);
        color: var(--text-color);
        padding: 1rem;
        border: 1px solid rgba(from var(--text-color) r g b / 0.25);
        border-radius: 0.5rem;
        z-index: 4;
        max-width: 25vw;
        text-wrap: wrap;
        position: absolute;
        position-area: start end;
    }
</style>
