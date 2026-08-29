<script>
    import RAW_LICENSES from "./lib/data/licenses.json";

    const licenses = Object.entries(RAW_LICENSES)
        .map(([nameVersion, info]) => ({
            name: nameVersion.replace(/@[^@]+$/, ""),
            version: nameVersion.match(/@([^@]+)$/)?.[1] ?? "",
            license: info.licenses,
            repository: info.repository,
            publisher: info.publisher,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
</script>

<div class="screen" id="licenses">
    <ul id="licenses-list">
        {#each licenses as pkg}
            <li>
                <strong>{pkg.name}</strong>
                <span class="version">v{pkg.version}</span>
                - {pkg.license}
                {#if pkg.repository}
                    (<a
                        href={pkg.repository}
                        target="_blank"
                        rel="noopener noreferrer">repo</a
                    >)
                {/if}
            </li>
        {/each}
    </ul>

    <div id="gradient-overlay"></div>
</div>

<style>
    #licenses {
        display: flex;
        flex-direction: column;
        gap: var(--interface-gap);
        outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
        corner-shape: squircle;
        width: 100%;
        height: 100%;
        padding: 5.5rem var(--interface-gap);
        overflow-y: scroll;
        overflow-x: hidden;
        text-align: center;
    }
    #licenses-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    #licenses-list .version {
        opacity: 0.6;
        font-size: 0.85em;
    }
</style>
