<script>
    import { mainStore } from "../utils/stores";
    import config from "../folders/config.json";

    let { folderSize, folderType } = $props();

    let naturalWidth = $state(0);
    let naturalHeight = $state(0);

    const DEFAULT_CUSTOM_DATA =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fS5jbHMtMntmaWxsOmdyYXk7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTUuMSwyNi4yN2MtMS4xLDAtMi0uOS0yLTJ2LTE2YzAtMS4xLjktMiwyLTJoOC40MWMuOCwwLDEuNTUuMzEsMi4xMi44OGwyLjEyLDIuMTJoOS4zNGMxLjEsMCwyLC45LDIsMnYxM2MwLDEuMS0uOSwyLTIsMkg1LjFaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTMuNTEsNy4yN2MuNTMsMCwxLjA0LjIxLDEuNDEuNTlsMi40MSwyLjQxaDkuNzZjLjU1LDAsMSwuNDUsMSwxdjEzYzAsLjU1LS40NSwxLTEsMUg1LjFjLS41NSwwLTEtLjQ1LTEtMVY4LjI3YzAtLjU1LjQ1LTEsMS0xaDguNDFNMTMuNTEsNS4yN0g1LjFjLTEuNjUsMC0zLDEuMzUtMywzdjE2YzAsMS42NSwxLjM1LDMsMywzaDIyYzEuNjUsMCwzLTEuMzUsMy0zdi0xM2MwLTEuNjUtMS4zNS0zLTMtM2gtOC45M2wtMS44My0xLjgzYy0uNzYtLjc2LTEuNzYtMS4xNy0yLjgzLTEuMTdoMFoiLz48cG9seWdvbiBwb2ludHM9IjEwLjEgMTYuMjcgMTAuMSAxMy4yNyAxNi4xIDEzLjI3IDEzLjEgMTAuMjcgNy4xIDEwLjI3IDcuMSAyNS4yNyAxMC4xIDI1LjI3IDEwLjEgMTkuMjcgMTYuMSAxOS4yNyAxNi4xIDE2LjI3IDEwLjEgMTYuMjciLz48cG9seWdvbiBwb2ludHM9IjE2LjEgMTMuMjcgMTYuMSAxNi4yNyAyMi4xIDE2LjI3IDIyLjEgMTkuMjcgMTYuMSAxOS4yNyAxNi4xIDIyLjI3IDIyLjEgMjIuMjcgMjIuMSAyNS4yNyAyNS4xIDI1LjI3IDI1LjEgMTMuMjcgMTYuMSAxMy4yNyIvPjwvc3ZnPg0K";

    // Reload dimensions whenever the custom image data changes
    $effect(() => {
        // Hearing "effect" gives me React PTSD
        const src = $mainStore[folderSize].iconCustomData;

        if (!src) {
            naturalWidth = 0;
            naturalHeight = 0;
            return;
        }

        const img = new Image();
        img.onload = () => {
            naturalWidth = img.naturalWidth;
            naturalHeight = img.naturalHeight;
        };
        img.onerror = () => {
            naturalWidth = 0;
            naturalHeight = 0;
        };
        img.src = src;
    });

    function getImageDimensions() {
        // Fallback to 132 until the image has loaded (or if it fails to load)
        if (!naturalWidth && !naturalHeight) return 132;
        return Math.max(naturalWidth, naturalHeight);
    }

    function makeShadow() {
        if ($mainStore[folderSize].iconShadowEnabled != true) return "";

        // Converts 0 - 1 value to rounded hex value
        const shadowOpacity = Math.round(
            $mainStore[folderSize].iconShadowOpacity * 255,
        ).toString(16);

        // Get multiplier for blur and offset
        const multiplier = (getImageDimensions() / 24) * (folderSize / 256);

        return `filter: drop-shadow(${$mainStore[folderSize].iconShadowOffsetX * multiplier}px ${
            $mainStore[folderSize].iconShadowOffsetY * multiplier
        }px ${$mainStore[folderSize].iconShadowBlur * multiplier}px ${$mainStore[folderSize].iconShadowColor}${shadowOpacity})`;
    }

    let baseIconSize = $derived(config[folderType].iconSizes[folderSize]);
    let scaledIconSize = $derived(
        2 * Math.round((baseIconSize * $mainStore[folderSize].iconScale) / 2),
    );

    let centerCorrection = $derived((scaledIconSize - baseIconSize) / 2);
</script>

<g
    transform="translate({Math.round(
        config[folderType].iconOffsets[folderSize][0] +
            $mainStore[folderSize].iconOffsetX * (folderSize / 256) -
            centerCorrection,
    )} {Math.round(
        config[folderType].iconOffsets[folderSize][1] +
            $mainStore[folderSize].iconOffsetY * (folderSize / 256) -
            centerCorrection,
    )})"
    style={makeShadow()}
    width="100%"
    height="100%"
>
    <image
        href={$mainStore[folderSize].iconCustomData || DEFAULT_CUSTOM_DATA}
        width={scaledIconSize}
        height={scaledIconSize}
        style="opacity: {$mainStore[folderSize].iconOpacity}"
    />
</g>
