<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(24, "win11");
    });
</script>

<svg
    id="folder-24"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    ><defs
        ><style>
            .shadow-24 {
                fill: url(#shadow-gradient-24);
            }
            .front-24 {
                fill: url(#front-gradient-24);
            }
            .mask-24 {
                fill: url(#mask-gradient-24);
            }
            .highlight-24 {
                fill: url(#highlight-gradient-24);
            }
            .back-24 {
                fill: url(#back-gradient-24);
            }
            .clip-24 {
                clip-path: url(#clip-path-24);
                fill: none;
            }
        </style><linearGradient
            id="back-gradient-24"
            x1="20.69"
            y1="21.19"
            x2="2.22"
            y2="2.72"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-24"
            x1="12"
            y1="9"
            x2="12"
            y2="5"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-24"
            x1="1"
            y1="7"
            x2="3"
            y2="7"
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
            id="front-gradient-24"
            x1="16.53"
            y1="21.78"
            x2="7.87"
            y2="4.03"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-24"
            ><path
                d="M22,6h-12l-2,1H2c-.55,0-1,.45-1,1v10c0,.55.45,1,1,1h20c.55,0,1-.45,1-1V7c0-.55-.45-1-1-1Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-24"
            x1="14.16"
            y1="12.31"
            x2="9.69"
            y2="3.14"
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
        id="Back"
        class="back-24"
        d="M23,19V6c0-.55-.45-1-1-1h-12.5s-1.41-1.41-1.41-1.41c-.38-.38-.88-.59-1.41-.59H2c-.55,0-1,.45-1,1v15c0,.55.45,1,1,1h20c.55,0,1-.45,1-1Z"
    /><path
        id="Shadow"
        class="shadow-24"
        d="M1,5v4h22v-3c0-.55-.45-1-1-1H1Z"
    /><rect id="Mask" class="mask-24" x="1" y="5" width="2" height="4" /><path
        id="Front"
        class="front-24"
        d="M22,6h-12l-2,1H2c-.55,0-1,.45-1,1v10c0,.55.45,1,1,1h20c.55,0,1-.45,1-1V7c0-.55-.45-1-1-1Z"
    /><g id="Clip"
        ><g class="clip-24"><Icon folderSize="24" folderType="win11" /></g></g
    ><path
        id="Highlight"
        class="highlight-24"
        d="M22,6h-12l-2,1H2c-.55,0-1,.45-1,1v1c0-.55.45-1,1-1h6.24l2-1h11.76c.55,0,1,.45,1,1v-1c0-.55-.45-1-1-1Z"
    /></svg
>
