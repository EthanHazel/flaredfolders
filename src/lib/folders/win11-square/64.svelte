<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(64, "win11-square");
    });
</script>

<svg
    id="folder-64"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
    ><defs
        ><style>
            .front-64 {
                fill: url(#front-gradient-64);
            }
            .highlight-64 {
                fill: url(#highlight-gradient-64);
            }
            .back-64 {
                fill: url(#back-gradient-64);
            }
            .clip-64 {
                clip-path: url(#clip-path-64);
            }
        </style><linearGradient
            id="back-gradient-64"
            x1="58.54"
            y1="58.54"
            x2="5.46"
            y2="5.46"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-64"
            x1="58.29"
            y1="57.79"
            x2="5.71"
            y2="5.21"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-64"
            ><rect x="4" y="4" width="56" height="55" rx="5" ry="5" /></clipPath
        ><linearGradient
            id="highlight-gradient-64"
            x1="46.77"
            y1="120.3"
            x2="17.23"
            y2="90.77"
            gradientTransform="translate(64 114) rotate(-180)"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#fff" stop-opacity=".3" /><stop
                offset=".04"
                stop-color="#fff"
                stop-opacity=".28"
            /><stop offset=".46" stop-color="#fff" stop-opacity=".13" /><stop
                offset=".79"
                stop-color="#fff"
                stop-opacity=".04"
            /><stop
                offset="1"
                stop-color="#fff"
                stop-opacity="0"
            /></linearGradient
        ></defs
    ><rect
        class="back-64"
        x="4"
        y="4"
        width="56"
        height="56"
        rx="5"
        ry="5"
    /><rect
        class="front-64"
        x="4"
        y="4"
        width="56"
        height="55"
        rx="5"
        ry="5"
    /><g class="clip-64">
        <Icon folderType="win11-square" folderSize="64" /></g
    ><path
        class="highlight-64"
        d="M9,5h46c2.76,0,5,2.24,5,5v-1c0-2.76-2.24-5-5-5H9c-2.76,0-5,2.24-5,5v1c0-2.76,2.24-5,5-5Z"
    /></svg
>
