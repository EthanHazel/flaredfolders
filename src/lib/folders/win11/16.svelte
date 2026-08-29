<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(16, "win11");
    });
</script>

<svg
    id="folder-16"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 16 16"
    ><defs
        ><style>
            .shadow-16 {
                fill: url(#shadow-gradient-16);
            }
            .front-16 {
                fill: url(#front-gradient-16);
            }
            .mask-16 {
                fill: url(#mask-gradient-16);
            }
            .highlight-16 {
                fill: url(#highlight-gradient-16);
            }
            .back-16 {
                fill: url(#back-gradient-16);
            }
            .clip-16 {
                fill: none;
                clip-path: url(#clip-path-16);
            }
        </style><linearGradient
            id="back-gradient-16"
            x1="13.97"
            y1="14.47"
            x2=".67"
            y2="1.17"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset=".99"
                stop-color={colors.backOne}
            /></linearGradient
        ><linearGradient
            id="shadow-gradient-16"
            x1="8"
            y1="8"
            x2="8"
            y2="3"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".5" stop-color="#080808" stop-opacity=".16" /><stop
                offset="1"
                stop-color="#080808"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="mask-gradient-16"
            x1="0"
            y1="5"
            x2="1"
            y2="5"
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
            id="front-gradient-16"
            x1="11.16"
            y1="14.98"
            x2="5.23"
            y2="2.82"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clippath id="clip-path-16"
            ><path
                d="M15,4h-6s-1,1-2,1H1C.45,5,0,5.45,0,6v6C0,12.55.45,13,1,13h14c.55,0,1-.45,1-1v-7c0-.55-.45-1-1-1Z"
            /></clippath
        ><linearGradient
            id="highlight-gradient-16"
            x1="9.48"
            y1="8.68"
            x2="6.36"
            y2="2.27"
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
        class="back-16"
        d="M16,12v-7c0-1.1-.9-2-2-2h-5.5s-1.41-1.41-1.41-1.41c-.38-.38-.88-.59-1.41-.59H1c-.55,0-1,.45-1,1v10c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2Z"
    /><path class="shadow-16" d="M0,3v5h16v-3c0-1.1-.9-2-2-2H0Z" /><rect
        class="mask-16"
        y="3"
        width="1"
        height="4"
    /><path
        class="front-16"
        d="M15,4h-6s-1,1-2,1H1C.45,5,0,5.45,0,6v6C0,12.55.45,13,1,13h14c.55,0,1-.45,1-1v-7c0-.55-.45-1-1-1Z"
    /><g><g class="clip-16"><Icon folderSize="16" folderType="win11" /></g></g
    ><path
        class="highlight-16"
        d="M15,4h-6s-1,1-2,1H1c-.55,0-1,.45-1,1v.5c0-.55.45-1,1-1h6c.96,0,1.84-.68,2.2-1h5.8c.55,0,1,.45,1,1v-.5c0-.55-.45-1-1-1Z"
    /></svg
>
