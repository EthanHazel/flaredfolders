<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(20, "win11");
    });
</script>

<svg
    id="folder-20"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 20 20"
    ><defs
        ><style>
            .shadow-20 {
                fill: url(#shadow-gradient-20);
            }
            .front-20 {
                fill: url(#front-gradient-20);
            }
            .mask-20 {
                fill: url(#mask-gradient-20);
            }
            .highlight-20 {
                fill: url(#highlight-gradient-20);
            }
            .back-20 {
                fill: url(#back-gradient-20);
            }
            .clip-20 {
                clip-path: url(#clip-path-20);
                fill: none;
            }
        </style><linearGradient
            id="back-gradient-20"
            x1="16.99"
            y1="17.99"
            x2="1.94"
            y2="2.94"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-20"
            x1="10"
            y1="9"
            x2="10"
            y2="5"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-20"
            x1="1"
            y1="7"
            x2="2"
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
            id="front-gradient-20"
            x1="13.63"
            y1="18.43"
            x2="6.77"
            y2="4.37"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-20"
            ><path
                d="M18.5,6h-9.5l-1,1H1.5c-.28,0-.5.22-.5.5v8c0,.28.22.5.5.5h17c.28,0,.5-.22.5-.5V6.5c0-.28-.22-.5-.5-.5Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-20"
            x1="11.85"
            y1="11.49"
            x2="8.07"
            y2="3.74"
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
        class="back-20"
        d="M19,16V6c0-.55-.45-1-1-1h-9.5s-1.41-1.41-1.41-1.41c-.38-.38-.88-.59-1.41-.59h-3.67c-.55,0-1,.45-1,1v12c0,.55.45,1,1,1h16c.55,0,1-.45,1-1Z"
    /><path class="shadow-20" d="M1,5v4h18v-3c0-.55-.45-1-1-1H1Z" /><rect
        class="mask-20"
        x="1"
        y="5"
        width="1"
        height="4"
    /><path
        class="front-20"
        d="M18.5,6h-9.5l-1,1H1.5c-.28,0-.5.22-.5.5v8c0,.28.22.5.5.5h17c.28,0,.5-.22.5-.5V6.5c0-.28-.22-.5-.5-.5Z"
    /><g><g class="clip-20"><Icon folderSize="20" folderType="win11" /></g></g>
    <path
        class="highlight-20"
        d="M18.5,6h-9.5l-1,1H1.5c-.28,0-.5.22-.5.5v1.5c0-.55.45-1,1-1h6.24l1-1h8.76c.55,0,1,.45,1,1v-1.5c0-.28-.22-.5-.5-.5Z"
    /></svg
>
