<script>
    import { _ } from "svelte-i18n";
    import { ChevronRight } from "@lucide/svelte";
    let { name, children, defaultClosed } = $props();
</script>

<details open={defaultClosed ? false : true}>
    <summary>
        {$_(`groups.${name}`)}
        <ChevronRight id="chevron" size={16} />
    </summary>
    <div class="contents">
        {#if children}
            {@render children()}
        {:else}
            <p color="red">Error: no children</p>
        {/if}
    </div>
</details>

<style>
    details {
        display: flex;
        flex-direction: column;
        user-select: none;
        outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
        border-radius: 0.25rem;

        &[open] summary {
            border-bottom: 1px solid rgba(from var(--text-color) r g b / 0.1);
        }

        :global(&[open] #chevron) {
            transform: rotate(90deg);
        }
    }

    summary {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        list-style: none;
        cursor: pointer;
        padding: var(--interface-gap);
        border-radius: 0.25rem 0.25rem 0 0;

        &:hover {
            background-color: rgba(from var(--text-color) r g b / 0.1);
        }
    }

    :global(#chevron) {
        transition: transform 0.05s ease-in-out;
    }

    .contents {
        display: flex;
        flex-direction: column;
        gap: var(--interface-gap);
        padding: var(--interface-gap);
    }
</style>
