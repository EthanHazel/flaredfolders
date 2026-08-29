<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(24, "win11-square");
    });
</script>

<svg
    id="folder-24"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    ><defs
        ><style>
            .front-24 {
                fill: url(#front-gradient-24);
            }
            .highlight-24 {
                fill: url(#highlight-gradient-24);
            }
            .back-24 {
                fill: url(#back-gradient-24);
            }
            .clip-24 {
                clip-path: url(#clip-path-24);
            }
        </style><linearGradient
            id="back-gradient-24"
            x1="22.41"
            y1="22.41"
            x2="1.59"
            y2="1.59"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-24"
            x1="22.16"
            y1="21.66"
            x2="1.84"
            y2="1.34"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-24"
            ><rect x="1" y="1" width="22" height="21" rx="2" ry="2" /></clipPath
        ><linearGradient
            id="highlight-gradient-24"
            x1="17.96"
            y1="45.87"
            x2="6.04"
            y2="33.96"
            gradientTransform="translate(24 43) rotate(-180)"
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
        class="back-24"
        x="1"
        y="1"
        width="22"
        height="22"
        rx="2"
        ry="2"
    /><rect
        class="front-24"
        x="1"
        y="1"
        width="22"
        height="21"
        rx="2"
        ry="2"
    /><g class="clip-24">
        <Icon folderType="win11-square" folderSize="24" /></g
    ><path
        class="highlight-24"
        d="M3,2h18c1.1,0,2,.9,2,2v-1c0-1.1-.9-2-2-2H3c-1.1,0-2,.9-2,2v1c0-1.1.9-2,2-2Z"
    /></svg
>
