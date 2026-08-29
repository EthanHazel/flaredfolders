<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(32, "win11-square");
    });
</script>

<svg
    id="folder-32"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    ><defs
        ><style>
            .front-32 {
                fill: url(#front-gradient-32);
            }
            .highlight-32 {
                fill: url(#highlight-gradient-32);
            }
            .back-32 {
                fill: url(#back-gradient-32);
            }
            .clip-32 {
                clip-path: url(#clip-path-32);
            }
        </style><linearGradient
            id="back-gradient-32"
            x1="28.83"
            y1="28.83"
            x2="3.17"
            y2="3.17"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-32"
            x1="28.58"
            y1="28.08"
            x2="3.42"
            y2="2.92"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-32"
            ><rect x="2" y="2" width="28" height="27" rx="4" ry="4" /></clipPath
        ><linearGradient
            id="highlight-gradient-32"
            x1="23.66"
            y1="13.34"
            x2="8.34"
            y2="-1.99"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#fff" stop-opacity="0" /><stop
                offset=".21"
                stop-color="#fff"
                stop-opacity=".04"
            /><stop offset=".54" stop-color="#fff" stop-opacity=".13" /><stop
                offset=".96"
                stop-color="#fff"
                stop-opacity=".28"
            /><stop
                offset="1"
                stop-color="#fff"
                stop-opacity=".3"
            /></linearGradient
        ></defs
    ><rect
        class="back-32"
        x="2"
        y="2"
        width="28"
        height="28"
        rx="4"
        ry="4"
    /><rect
        class="front-32"
        x="2"
        y="2"
        width="28"
        height="27"
        rx="4"
        ry="4"
    /><g class="clip-32">
        <Icon folderType="win11-square" folderSize="32" /></g
    ><path
        class="highlight-32"
        d="M26,2H6c-2.21,0-4,1.79-4,4v1c0-2.21,1.79-4,4-4h20c2.21,0,4,1.79,4,4v-1c0-2.21-1.79-4-4-4Z"
    /></svg
>
