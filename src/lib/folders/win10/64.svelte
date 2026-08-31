<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(64, "win10");
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
            .front-64 {
                fill: url(#front-gradient-64);
            }
            .front-shadow-64 {
                fill: url(#front-shadow-gradient-64);
            }
            .highlight-64 {
                fill: url(#highlight-gradient-64);
            }
            .back-shadow-64 {
                fill: url(#back-shadow-gradient-64);
            }
            .clip-64 {
                clip-path: url(#clip-path-64);
            }
        </style><linearGradient
            id="back-shadow-gradient-64"
            x1="47.52"
            y1="52.9"
            x2="49.01"
            y2="49.98"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="back-gradient-64"
            x1="6.69"
            y1="37.23"
            x2="42.2"
            y2="25.45"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".33" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-64"
            ><path
                id="mask"
                class="cls-2"
                d="M0,0v64h64V0H0ZM23,43.35c0,.43-.07.86-.21,1.26l-.59,1.77c-.14.41-.21.84-.21,1.26v13.82c0,.21-.25.33-.41.19l-10.59-8.67V7l11.55,9.63c.28.24.45.59.45.96v25.77Z"
            /></clipPath
        ><linearGradient
            id="front-shadow-gradient-64"
            x1="24.28"
            y1="61.66"
            x2="25.3"
            y2="58.25"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="front-gradient-64"
            x1="26.9"
            y1="59.66"
            x2="8.74"
            y2="14.72"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".26" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-64"
            x1="17"
            y1="61.72"
            x2="17"
            y2="7"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#fff" stop-opacity="0" /><stop
                offset=".06"
                stop-color="#fff"
                stop-opacity=".07"
            /><stop offset=".2" stop-color="#fff" stop-opacity=".19" /><stop
                offset=".34"
                stop-color="#fff"
                stop-opacity=".28"
            /><stop offset=".49" stop-color="#fff" stop-opacity=".35" /><stop
                offset=".65"
                stop-color="#fff"
                stop-opacity=".39"
            /><stop offset=".85" stop-color="#fff" stop-opacity=".4" /><stop
                offset="1"
                stop-color="#fff"
                stop-opacity="0"
            /></linearGradient
        ></defs
    ><polygon
        class="back-shadow-64"
        points="46 48.75 46 53 46.25 53 52 51.25 46 48.75"
    /><path
        class="back-64"
        d="M45.75,53H11V7h32c.55,0,1,.45,1,1v26.48c0,.33.13.65.37.88l2.27,2.27c.23.23.37.55.37.88v13.23c0,.69-.56,1.25-1.25,1.25Z"
    /><g><g class="clip-64"><Icon folderSize="64" folderType="win10" /></g></g
    ><polygon
        class="front-shadow-64"
        points="21.75 61.5 29.25 59 21.5 57 21.75 61.5"
    /><path
        class="front-64"
        d="M11,7l11.55,9.63c.28.24.45.59.45.96v25.77c0,.43-.07.86-.21,1.26l-.59,1.77c-.14.41-.21.83-.21,1.26v13.82c0,.21-.25.33-.41.19l-10.59-8.67V7Z"
    /><path
        class="highlight-64"
        d="M22.55,16.63L11,7l.5,1.07,10.73,8.94c.17.14.27.35.27.58v25.77c0,.38-.06.75-.18,1.11l-.59,1.77c-.15.46-.23.94-.23,1.42v13.94l.09.08s.1.06.16.06c.13,0,.25-.1.25-.25v-13.82c0-.43.07-.86.21-1.26l.59-1.77c.14-.41.21-.83.21-1.26v-25.77c0-.37-.16-.72-.45-.96Z"
    /></svg
>
