<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(32, "win11");
    });
</script>

<svg
    id="folder-32"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    ><defs
        ><style>
            .shadow-32 {
                fill: url(#shadow-gradient-32);
            }
            .front-32 {
                fill: url(#front-gradient-32);
            }
            .mask-32 {
                fill: url(#mask-gradient-32);
            }
            .highlight-32 {
                fill: url(#highlight-gradient-32);
            }
            .back-32 {
                fill: url(#back-gradient-32);
            }
            .clip-32 {
                clip-path: url(#clip-path-32);
                fill: none;
            }
        </style><linearGradient
            id="back-gradient-32"
            x1="27.11"
            y1="27.61"
            x2="3.27"
            y2="3.77"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-32"
            x1="16"
            y1="13"
            x2="16"
            y2="7"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-32"
            x1="2"
            y1="10"
            x2="4"
            y2="10"
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
            id="front-gradient-32"
            x1="21.89"
            y1="28.58"
            x2="10.9"
            y2="6.04"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-32"
            ><path
                d="M29,8h-14s-1,2-3.5,2H3c-.55,0-1,.45-1,1v13c0,.55.45,1,1,1h26c.55,0,1-.45,1-1v-15c0-.55-.45-1-1-1Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-32"
            x1="18.54"
            y1="15.59"
            x2="13.31"
            y2="4.86"
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
        class="back-32"
        d="M30,25V8c0-.55-.45-1-1-1h-14.5s-2.41-2.41-2.41-2.41c-.38-.38-.88-.59-1.41-.59H3c-.55,0-1,.45-1,1v20c0,.55.45,1,1,1h26c.55,0,1-.45,1-1Z"
    /><path class="shadow-32" d="M2,7v6h28v-5c0-.55-.45-1-1-1H2Z" /><rect
        class="mask-32"
        x="2"
        y="7"
        width="2"
        height="6"
    /><path
        class="front-32"
        d="M29,8h-14s-1,2-3.5,2H3c-.55,0-1,.45-1,1v13c0,.55.45,1,1,1h26c.55,0,1-.45,1-1v-15c0-.55-.45-1-1-1Z"
    /><g><g class="clip-32"><Icon folderSize="32" folderType="win11" /></g></g
    ><path
        class="highlight-32"
        d="M29,8h-14s-1,2-3.5,2H3c-.55,0-1,.45-1,1v1c0-.55.45-1,1-1h8.5c2.2,0,3.47-1.25,4.04-2h13.46c.55,0,1,.45,1,1v-1c0-.55-.45-1-1-1Z"
    /></svg
>
