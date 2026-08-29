<script>
    import PRIVACY_POLICY from "./docs/privacy-policy.md?raw";
    import SvelteMarkdown from "@humanspeak/svelte-markdown";
</script>

<div id="privacy-policy" class="screen">
    <div id="privacy-policy-content">
        <SvelteMarkdown source={PRIVACY_POLICY} />
    </div>
    <div id="gradient-overlay"></div>
</div>

<style>
    #privacy-policy {
        outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
        corner-shape: squircle;
        border-radius: 2rem;
        width: 100%;
        height: 100%;
        padding: 5.5rem var(--interface-gap);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    #privacy-policy-content {
        display: flex;
        flex-direction: column;
        gap: calc(var(--interface-gap) * 2);
        max-width: 720px;
        margin: 0 auto;

        :global(& p) {
            opacity: 75%;
            line-height: 2;
        }
    }
</style>
