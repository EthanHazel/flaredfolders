<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(256, "win11-square");
    });
</script>

<svg
    id="folder-256"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 256 256"
    ><defs
        ><style>
            .front-256 {
                fill: url(#front-gradient-256);
            }
            .highlight-256 {
                fill: url(#highlight-gradient-256);
            }
            .back-256 {
                fill: url(#back-gradient-256);
            }
            .clip-256 {
                clip-path: url(#clip-path-256);
            }
        </style><linearGradient
            id="back-gradient-256"
            x1="234.14"
            y1="234.14"
            x2="21.86"
            y2="21.86"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="front-gradient-256"
            x1="233.14"
            y1="231.14"
            x2="22.86"
            y2="20.86"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-256"
            ><rect
                x="16"
                y="16"
                width="224"
                height="220"
                rx="20"
                ry="20"
            /></clipPath
        ><linearGradient
            id="highlight-gradient-256"
            x1="187.07"
            y1="481.21"
            x2="68.93"
            y2="363.07"
            gradientTransform="translate(256 456) rotate(-180)"
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
        class="back-256"
        x="16"
        y="16"
        width="224"
        height="224"
        rx="20"
        ry="20"
    /><rect
        class="front-256"
        x="16"
        y="16"
        width="224"
        height="220"
        rx="20"
        ry="20"
    /><g class="clip-256">
        <Icon folderType="win11-square" folderSize="256" /></g
    ><path
        class="highlight-256"
        d="M36,20h184c11.05,0,20,8.95,20,20v-4c0-11.05-8.95-20-20-20H36c-11.05,0-20,8.95-20,20v4c0-11.05,8.95-20,20-20Z"
    /></svg
>
