<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(48, "win11-square");
    });
</script>

<svg
    id="folder-48"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    ><defs
        ><style>
            .front-48 {
                fill: url(#front-gradient-48);
            }
            .highlight-48 {
                fill: url(#highlight-gradient-48);
            }
            .back-48 {
                fill: url(#back-gradient-48);
            }
            .clip-48 {
                clip-path: url(#clip-path-48);
            }
        </style><linearGradient
            id="back-gradient-48"
            x1="43.54"
            y1="43.54"
            x2="4.46"
            y2="4.46"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-48"
            x1="43.29"
            y1="42.79"
            x2="4.71"
            y2="4.21"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-48"
            ><rect x="3" y="3" width="42" height="41" rx="5" ry="5" /></clipPath
        ><linearGradient
            id="highlight-gradient-48"
            x1="35.27"
            y1="87.8"
            x2="12.73"
            y2="65.27"
            gradientTransform="translate(48 84) rotate(-180)"
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
        class="back-48"
        x="3"
        y="3"
        width="42"
        height="42"
        rx="5"
        ry="5"
    /><rect
        class="front-48"
        x="3"
        y="3"
        width="42"
        height="41"
        rx="5"
        ry="5"
    /><g class="clip-48">
        <Icon folderType="win11-square" folderSize="48" /></g
    ><path
        class="highlight-48"
        d="M8,4h32c2.76,0,5,2.24,5,5v-1c0-2.76-2.24-5-5-5H8c-2.76,0-5,2.24-5,5v1c0-2.76,2.24-5,5-5Z"
    /></svg
>
