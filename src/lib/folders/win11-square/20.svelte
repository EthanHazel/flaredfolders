<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(20, "win11-square");
    });
</script>

<svg
    id="folder-20"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 20 20"
    ><defs
        ><style>
            .front-20 {
                fill: url(#front-gradient-20);
            }
            .highlight-20 {
                fill: url(#highlight-gradient-20);
            }
            .back-20 {
                fill: url(#back-gradient-20);
            }
            .clip-20 {
                clip-path: url(#clip-path-20);
            }
        </style><linearGradient
            id="back-gradient-20"
            x1="18.18"
            y1="18.18"
            x2="1.74"
            y2="1.74"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-20"
            x1="18.31"
            y1="18.1"
            x2="1.69"
            y2="1.48"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-20"
            ><path
                d="M3,1h14c1.1,0,2,.9,2,2v14c0,.55-.45,1-1,1H2c-.55,0-1-.45-1-1V3c0-1.1.9-2,2-2Z"
            /></clipPath
        ><linearGradient
            id="highlight-gradient-20"
            x1="14.57"
            y1="37.99"
            x2="5.38"
            y2="28.8"
            gradientTransform="translate(20 36) rotate(-180)"
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
        class="back-20"
        x="1"
        y="1"
        width="18"
        height="18"
        rx="2"
        ry="2"
    /><path
        class="front-20"
        d="M3,1h14c1.1,0,2,.9,2,2v14c0,.55-.45,1-1,1H2c-.55,0-1-.45-1-1V3c0-1.1.9-2,2-2Z"
    /><g class="clip-20">
        <Icon folderType="win11-square" folderSize="20" /></g
    ><path
        class="highlight-20"
        d="M2,2h16c.55,0,1,.45,1,1,0-1.1-.9-2-2-2H3c-1.1,0-2,.9-2,2,0-.55.45-1,1-1Z"
    /></svg
>
