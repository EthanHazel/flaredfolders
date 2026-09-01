<script>
    import JSZip from "jszip";

    import { mainStore } from "../utils/stores";
    import { _ } from "svelte-i18n";

    let {
        sizes = [256, 64, 48, 40, 32, 24, 20, 16],
        // svgId for a given size, e.g. "folder-256"
        idForSize = (size) => `folder-${size}`,
        // filename inside the zip for a given size, e.g. "folder-256.png"
        filenameForSize = (size) => `${size}x.png`,
        zipFilename = $mainStore.folderName + ".zip",
        label = $_("modals.exportAs.zip"),
    } = $props();

    let isExporting = $state(false);
    let error = $state("");
    let progress = $state("");

    /**
     * Rasterizes a single <svg> element (by id) to a PNG Blob at its
     * own intrinsic size (width/height/viewBox as authored).
     */
    async function svgToPngBlob(svgId) {
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
            svgEl.width?.baseVal?.value || viewBox?.width || bbox.width || 300;
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

        try {
            const img = new Image();
            const loaded = new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () =>
                    reject(
                        new Error(
                            `Failed to rasterize "${svgId}" (check for external/CORS-blocked images inside it)`,
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

            const pngBlob = await new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else
                        reject(
                            new Error(`Failed to encode PNG for "${svgId}"`),
                        );
                }, "image/png");
            });

            return pngBlob;
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    async function exportAllAsZip() {
        error = "";
        isExporting = true;
        progress = "";
        try {
            const zip = new JSZip();

            for (const size of sizes) {
                const svgId = idForSize(size);
                progress = $_("modals.exportAs.rendering").replace(
                    "%SIZE%",
                    size,
                );
                const pngBlob = await svgToPngBlob(svgId);
                zip.file(filenameForSize(size), pngBlob);
            }

            progress = $_("modals.exportAs.zipping");
            const zipBlob = await zip.generateAsync({ type: "blob" });

            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = zipFilename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
            console.error("ZIP export failed:", e);
        } finally {
            isExporting = false;
            progress = "";
        }
    }
</script>

<button onclick={exportAllAsZip} disabled={isExporting} class="primary">
    {isExporting ? progress || $_("modals.exportAs.exporting") : label}
</button>
{#if error}
    <p class="error">{error}</p>
{/if}

<style>
    .error {
        color: #c0392b;
    }
</style>
