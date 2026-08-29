<script>
    let {
        idPrefix = "folder",
        sizes = [256, 64, 48, 40, 32, 24, 20, 16],
        filename = "icon.ico",
        label = "Export as ICO",
    } = $props();

    let isExporting = $state(false);
    let error = $state("");

    /**
     * Rasterizes a single SVG element (found via id `${idPrefix}-${size}`)
     * to a PNG Blob at the given pixel size.
     * @param {string} svgId - The ID of the SVG element to rasterize.
     * @param {number} size - The pixel size of the output PNG.
     * @returns {Promise<Blob>} A Promise that resolves to the PNG Blob.
     */
    async function svgToPngBlob(svgId, size) {
        const svgEl = document.getElementById(svgId);
        if (!svgEl) throw new Error(`No element with id "${svgId}" found`);
        if (svgEl.tagName.toLowerCase() !== "svg") {
            throw new Error(`Element with id "${svgId}" is not an <svg>`);
        }

        // Clone so we never mutate the live SVG on the page
        const clone = svgEl.cloneNode(true);
        clone.setAttribute("width", String(size));
        clone.setAttribute("height", String(size));
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
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);

            const blob = await new Promise((resolve, reject) => {
                canvas.toBlob((b) => {
                    if (b) resolve(b);
                    else reject(new Error(`toBlob failed for "${svgId}"`));
                }, "image/png");
            });
            return blob;
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    /**
     * Packs an array of { size, buffer(PNG ArrayBuffer) } entries into a
     * Windows .ico file (using the modern PNG-embedded ICO format,
     * supported by Windows Vista+, browsers, and most OS icon viewers).
     */
    function buildIco(entries) {
        const numImages = entries.length;
        const HEADER_SIZE = 6;
        const DIR_ENTRY_SIZE = 16;
        const dataStart = HEADER_SIZE + DIR_ENTRY_SIZE * numImages;

        const header = new ArrayBuffer(HEADER_SIZE);
        const headerView = new DataView(header);
        headerView.setUint16(0, 0, true); // reserved, must be 0
        headerView.setUint16(2, 1, true); // type: 1 = icon
        headerView.setUint16(4, numImages, true);

        const dir = new ArrayBuffer(DIR_ENTRY_SIZE * numImages);
        const dirView = new DataView(dir);

        let offset = dataStart;
        const parts = [header, dir];

        entries.forEach(({ size, buffer }, i) => {
            const base = i * DIR_ENTRY_SIZE;
            const dim = size >= 256 ? 0 : size; // 0 means 256px per ICO spec
            dirView.setUint8(base + 0, dim); // width
            dirView.setUint8(base + 1, dim); // height
            dirView.setUint8(base + 2, 0); // color count (0 = no palette)
            dirView.setUint8(base + 3, 0); // reserved
            dirView.setUint16(base + 4, 1, true); // color planes
            dirView.setUint16(base + 6, 32, true); // bits per pixel
            dirView.setUint32(base + 8, buffer.byteLength, true); // size of image data
            dirView.setUint32(base + 12, offset, true); // offset of image data

            offset += buffer.byteLength;
            parts.push(buffer);
        });

        return new Blob(parts, { type: "image/x-icon" });
    }

    async function exportIco() {
        error = "";
        isExporting = true;
        try {
            const entries = [];
            for (const size of sizes) {
                const svgId = `${idPrefix}-${size}`;
                const pngBlob = await svgToPngBlob(svgId, size);
                const buffer = await pngBlob.arrayBuffer();
                entries.push({ size, buffer });
            }

            const icoBlob = buildIco(entries);
            const url = URL.createObjectURL(icoBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
            console.error("SVG to ICO export failed:", e);
        } finally {
            isExporting = false;
        }
    }
</script>

<button onclick={exportIco} disabled={isExporting} class="primary">
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
