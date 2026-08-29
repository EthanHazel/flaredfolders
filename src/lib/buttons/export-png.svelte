<script>
    let {
        svgId,
        filename = `${svgId}.png`,
        label = `Export ${svgId} as PNG`,
    } = $props();

    let isExporting = $state(false);
    let error = $state("");

    async function exportPng() {
        error = "";
        isExporting = true;

        try {
            const svgEl = document.getElementById(svgId);
            if (!svgEl) throw new Error(`No element with id "${svgId}" found`);
            if (svgEl.tagName.toLowerCase() !== "svg") {
                throw new Error(`Element with id "${svgId}" is not an <svg>`);
            }

            // Clone so we never mutate the live SVG on the page
            const clone = svgEl.cloneNode(true);

            // Resolve real pixel dimensions (attribute -> viewBox -> rendered size)
            const bbox = svgEl.getBoundingClientRect();
            const viewBox = svgEl.viewBox?.baseVal;
            const width =
                svgEl.width?.baseVal?.value ||
                viewBox?.width ||
                bbox.width ||
                300;
            const height =
                svgEl.height?.baseVal?.value ||
                viewBox?.height ||
                bbox.height ||
                150;

            clone.setAttribute("width", String(width));
            clone.setAttribute("height", String(height));
            if (!clone.getAttribute("xmlns")) {
                clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            }

            const svgString = new XMLSerializer().serializeToString(clone);
            const svgBlob = new Blob([svgString], {
                type: "image/svg+xml;charset=utf-8",
            });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            const loaded = new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () =>
                    reject(
                        new Error(
                            "Failed to rasterize SVG (check for external/CORS-blocked images inside it)",
                        ),
                    );
            });
            img.src = url;
            await loaded;

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
            console.error("SVG to PNG export failed:", e);
        } finally {
            isExporting = false;
        }
    }
</script>

<button onclick={exportPng} disabled={isExporting}>
    {isExporting ? "Exporting…" : label}
</button>

{#if error}
    <p class="error">{error}</p>
{/if}

<style>
    button {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        cursor: pointer;
    }
    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    .error {
        color: #c0392b;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }
</style>
