<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(40, "win11");
    });
</script>

<svg
    id="folder-40"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 40 40"
    ><defs
        ><style>
            .shadow-40 {
                fill: url(#shadow-gradient-40);
            }
            .front-40 {
                fill: url(#front-gradient-40);
            }
            .cls-40-4 {
                fill: url(#mask-gradient-40);
            }
            .highlight-40 {
                fill: url(#highlight-gradient-40);
            }
            .back-40 {
                fill: url(#back-gradient-40);
            }
            .clip-40 {
                clip-path: url(#clip-path-40);
                fill: url(#front-gradient-40);
            }
        </style><linearGradient
            id="back-gradient-40"
            x1="33.98"
            y1="34.98"
            x2="3.88"
            y2="4.87"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-40"
            x1="20"
            y1="15"
            x2="20"
            y2="9"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-40"
            x1="2"
            y1="12"
            x2="4"
            y2="12"
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
            id="front-gradient-40"
            x1="27.5"
            y1="36.37"
            x2="13.29"
            y2="7.24"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-40"
            x1="23.35"
            y1="20.14"
            x2="16.34"
            y2="5.76"
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
        ><clippath id="clip-path-40"
            ><path
                d="M36,10h-18.5s-1,2-4,2H4c-1.1,0-2,.9-2,2v16c0,1.1.9,2,2,2h32c1.1,0,2-.9,2-2V12c0-1.1-.9-2-2-2Z"
            /></clippath
        ></defs
    ><path
        class="back-40"
        d="M38,31V11c0-1.1-.9-2-2-2h-18.5s-2.83-2.83-2.83-2.83c-.75-.75-1.77-1.17-2.83-1.17h-7.84c-1.1,0-2,.9-2,2v24c0,1.1.9,2,2,2h32c1.1,0,2-.9,2-2Z"
    /><path class="shadow-40" d="M2,9v6h36v-4c0-1.1-.9-2-2-2H2Z" /><rect
        id="Mask"
        class="cls-40-4"
        x="2"
        y="9"
        width="2"
        height="6"
    /><path
        class="front-40"
        d="M36,10h-18.5s-1,2-4,2H4c-1.1,0-2,.9-2,2v16c0,1.1.9,2,2,2h32c1.1,0,2-.9,2-2V12c0-1.1-.9-2-2-2Z"
    /><path
        class="highlight-40"
        d="M36,10h-18.5s-1,2-4,2H4c-1.1,0-2,.9-2,2v1c0-1.1.9-2,2-2h9.5c2.55,0,3.93-1.25,4.53-2h17.97c1.1,0,2,.9,2,2v-1c0-1.1-.9-2-2-2Z"
    /><g><g class="clip-40"><Icon folderSize="40" folderType="win11" /></g></g
    ></svg
>
