<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(40, "win11-square");
    });
</script>

<svg
    id="folder-40"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 40 40"
    ><defs
        ><style>
            .front-40 {
                fill: url(#front-gradient-40);
            }
            .highlight-40 {
                fill: url(#highlight-gradient-40);
            }
            .back-40 {
                fill: url(#back-gradient-40);
            }
            .clip-40 {
                clip-path: url(#clip-path-40);
            }
        </style><linearGradient
            id="back-gradient-40"
            x1="36.83"
            y1="36.83"
            x2="3.17"
            y2="3.17"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-40"
            x1="36.58"
            y1="36.08"
            x2="3.42"
            y2="2.92"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-40"
            ><rect x="2" y="2" width="36" height="35" rx="4" ry="4" /></clipPath
        ><linearGradient
            id="highlight-gradient-40"
            x1="29.66"
            y1="74.99"
            x2="10.34"
            y2="55.66"
            gradientTransform="translate(40 71) rotate(-180)"
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
        class="back-40"
        x="2"
        y="2"
        width="36"
        height="36"
        rx="4"
        ry="4"
    /><rect
        class="front-40"
        x="2"
        y="2"
        width="36"
        height="35"
        rx="4"
        ry="4"
    /><g class="clip-40">
        <Icon folderType="win11-square" folderSize="40" /></g
    ><path
        class="highlight-40"
        d="M6,3h28c2.21,0,4,1.79,4,4v-1c0-2.21-1.79-4-4-4H6c-2.21,0-4,1.79-4,4v1c0-2.21,1.79-4,4-4Z"
    /></svg
>
