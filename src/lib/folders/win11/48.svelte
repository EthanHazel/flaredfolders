<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(48, "win11");
    });
</script>

<svg
    id="folder-48"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    ><defs
        ><style>
            .shadow-48 {
                fill: url(#shadow-gradient-48);
            }
            .clip-48 {
                fill: none;
                clip-path: url(#clip-path-48);
            }
            .front-48 {
                fill: url(#front-gradient-48);
            }
            .cls-48-4 {
                fill: url(#mask-gradient-48);
            }
            .highlight-48 {
                fill: url(#highlight-gradient-48);
            }
            .back-48 {
                fill: url(#back-gradient-48);
            }
        </style><linearGradient
            id="back-gradient-48"
            x1="40.36"
            y1="40.86"
            x2="5.46"
            y2="5.96"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-48"
            x1="24"
            y1="16"
            x2="24"
            y2="10"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-48"
            x1="3"
            y1="13"
            x2="5"
            y2="13"
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
            id="front-gradient-48"
            x1="32.91"
            y1="42.77"
            x2="15.88"
            y2="7.84"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-48"
            ><path
                d="M42,11h-22.5s-1,2-4,2H6c-1.66,0-3,1.34-3,3v19c0,1.66,1.34,3,3,3h36c1.66,0,3-1.34,3-3V14c0-1.66-1.34-3-3-3Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-48"
            x1="27.98"
            y1="23.3"
            x2="19.56"
            y2="6.05"
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
    ><path
        class="back-48"
        d="M45,36V13c0-1.66-1.34-3-3-3h-22.5s-2.83-2.83-2.83-2.83c-.75-.75-1.77-1.17-2.83-1.17h-7.84c-1.66,0-3,1.34-3,3v27c0,1.66,1.34,3,3,3h36c1.66,0,3-1.34,3-3Z"
    /><path class="shadow-48" d="M3,10v6h42v-3c0-1.66-1.34-3-3-3H3Z" /><rect
        id="Mask"
        class="cls-48-4"
        x="3"
        y="10"
        width="2"
        height="6"
    /><path
        class="front-48"
        d="M42,11h-22.5s-1,2-4,2H6c-1.66,0-3,1.34-3,3v19c0,1.66,1.34,3,3,3h36c1.66,0,3-1.34,3-3V14c0-1.66-1.34-3-3-3Z"
    /><g class="clip-48">
        <Icon folderSize="48" folderType="win11" />
    </g><path
        class="highlight-48"
        d="M42,11h-22.5s-1,2-4,2H6c-1.66,0-3,1.34-3,3v1c0-1.66,1.34-3,3-3h9.5c2.55,0,3.93-1.25,4.53-2h21.97c1.66,0,3,1.34,3,3v-1c0-1.66-1.34-3-3-3Z"
    /></svg
>
