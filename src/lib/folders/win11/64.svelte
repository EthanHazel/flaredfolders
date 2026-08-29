<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(64, "win11");
    });
</script>

<svg
    id="folder-64"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
    ><defs
        ><style>
            .back-64 {
                fill: url(#back-gradient-64);
            }
            .icon-64 {
                fill: none;
                clip-path: url(#clip-path-64);
            }
            .front-64 {
                fill: url(#front-gradient-64);
            }
            .mask-64 {
                fill: url(#mask-gradient-64);
            }
            .highlight-64 {
                fill: url(#highlight-gradient-64);
            }
            .shadow-64 {
                fill: url(#shadow-gradient-64);
            }
        </style><linearGradient
            id="shadow-gradient-64"
            x1="32"
            y1="21.75"
            x2="32"
            y2="15.5"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="back-gradient-64"
            x1="53.94"
            y1="55.94"
            x2="6.83"
            y2="8.83"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="mask-gradient-64"
            x1="4"
            y1="19.25"
            x2="7"
            y2="19.25"
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
            id="front-gradient-64"
            x1="44.03"
            y1="58.66"
            x2="21.15"
            y2="11.76"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-64"
            ><path
                d="M57,16h-27.39c-.48,0-.95.17-1.31.49-.97.85-3.22,2.51-5.89,2.51H7c-1.66,0-3,1.34-3,3v27c0,1.66,1.34,3,3,3h50c1.66,0,3-1.34,3-3v-30c0-1.66-1.34-3-3-3Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-64"
            x1="4"
            y1="19.5"
            x2="60"
            y2="19.5"
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
    ><g
        ><path
            class="shadow-64"
            d="M4,15.5v6.25h56v-3.25c0-1.66-1.34-3-3-3H4Z"
        /></g
    ><g
        ><path
            class="back-64"
            d="M7,53h50c1.66,0,3-1.34,3-3V18c0-1.66-1.34-3-3-3h-28l-3.28-3.93c-1.09-1.31-2.71-2.07-4.42-2.07H7c-1.66,0-3,1.34-3,3v38c0,1.66,1.34,3,3,3Z"
        /><rect class="mask-64" x="4" y="15.5" width="3" height="7.5" /><path
            class="front-64"
            d="M57,16h-27.39c-.48,0-.95.17-1.31.49-.97.85-3.22,2.51-5.89,2.51H7c-1.66,0-3,1.34-3,3v27c0,1.66,1.34,3,3,3h50c1.66,0,3-1.34,3-3v-30c0-1.66-1.34-3-3-3Z"
        /><g
            ><g class="icon-64"><Icon folderSize="64" folderType="win11" /></g
            ></g
        ><path
            class="highlight-64"
            d="M57,16h-27.39c-.48,0-.95.17-1.31.49-.97.85-3.22,2.51-5.89,2.51H7c-1.66,0-3,1.34-3,3v1c0-1.66,1.34-3,3-3h15.41c3.29,0,5.93-2.17,6.82-3h27.78c1.66,0,3,1.34,3,3v-1c0-1.66-1.34-3-3-3Z"
        /></g
    ></svg
>
