<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(256, "win11");
    });
</script>

<svg
    id="folder-256"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 256 256"
    ><defs
        ><style>
            .shadow-256 {
                fill: url(#shadow-gradient-256);
            }
            .clip-256 {
                fill: none;
                clip-path: url(#clip-path-256);
            }
            .front-256 {
                fill: url(#front-gradient-256);
            }
            .mask-256 {
                fill: url(#mask-gradient-256);
            }
            .highlight-256 {
                fill: url(#highlight-gradient-256);
            }
            .back-256 {
                fill: url(#back-gradient-256);
            }
        </style><linearGradient
            id="back-gradient-256"
            x1="215.75"
            y1="221.75"
            x2="27.32"
            y2="33.32"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-256"
            x1="67.21"
            y1="87"
            x2="67.21"
            y2="62"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-256"
            x1="16"
            y1="74.5"
            x2="28"
            y2="74.5"
            gradientUnits="userSpaceOnUse"
            ><stop
                offset="0"
                stop-color={colors.backOne}
                stop-opacity=".75"
            /><stop
                offset="1"
                stop-color={colors.backOne}
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="front-gradient-256"
            x1="176.12"
            y1="232.66"
            x2="84.61"
            y2="45.04"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-256"
            ><path
                d="M228,62h-109.57c-1.92,0-3.78.68-5.23,1.95-3.89,3.4-12.87,10.05-23.57,10.05H28c-6.63,0-12,5.37-12,12v108c0,6.63,5.37,12,12,12h200c6.63,0,12-5.37,12-12v-120c0-6.63-5.37-12-12-12Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-256"
            x1="16"
            y1="76"
            x2="240"
            y2="76"
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
    ><path
        class="back-256"
        d="M28,210h200c6.63,0,12-5.37,12-12V70c0-6.63-5.37-12-12-12h-112l-13.1-15.72c-4.37-5.24-10.84-8.28-17.67-8.28H28c-6.63,0-12,5.37-12,12v152c0,6.63,5.37,12,12,12Z"
    /><rect class="shadow-256" x="16" y="62" width="102.43" height="25" /><rect
        class="mask-256"
        x="16"
        y="62"
        width="12"
        height="25"
    /><path
        class="front-256"
        d="M228,62h-109.57c-1.92,0-3.78.68-5.23,1.95-3.89,3.4-12.87,10.05-23.57,10.05H28c-6.63,0-12,5.37-12,12v108c0,6.63,5.37,12,12,12h200c6.63,0,12-5.37,12-12v-120c0-6.63-5.37-12-12-12Z"
    /><g><g class="clip-256"><Icon folderSize="256" folderType="win11" /></g></g
    ><path
        class="highlight-256"
        d="M228,62h-109.57c-1.92,0-3.78.68-5.23,1.95-3.89,3.4-12.87,10.05-23.57,10.05H28c-6.63,0-12,5.37-12,12v4c0-6.63,5.37-12,12-12h61.62c13.15,0,23.71-8.67,27.27-12h111.1c6.63,0,12,5.37,12,12v-4c0-6.63-5.37-12-12-12Z"
    /></svg
>
