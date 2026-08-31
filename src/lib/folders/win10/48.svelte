<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(48, "win10");
    });
</script>

<svg
    id="folder-48"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    ><defs
        ><style>
            .back-48 {
                fill: url(#back-gradient-48);
            }
            .front-48 {
                fill: url(#front-gradient-48);
            }
            .front-shadow-48 {
                fill: url(#front-shadow-gradient-48);
            }
            .highlight-48 {
                fill: url(#highlight-gradient-48);
            }
            .back-shadow-48 {
                fill: url(#back-shadow-gradient-48);
            }
            .clip-48 {
                clip-path: url(#clip-path-48);
            }
        </style><linearGradient
            id="back-shadow-gradient-48"
            x1="35.52"
            y1="38.9"
            x2="37.01"
            y2="35.98"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="back-gradient-48"
            x1="5.13"
            y1="27.43"
            x2="31.78"
            y2="18.59"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".33" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-48"
            ><path
                d="M0,0v48h48V0H0ZM17,32.35c0,.43-.07.86-.21,1.26l-.59,1.77c-.14.41-.21.84-.21,1.26v7.82c0,.21-.25.33-.41.19l-7.59-5.67V5l8.55,6.63c.28.24.45.59.45.96v19.77Z"
            /></clipPath
        ><linearGradient
            id="front-shadow-gradient-48"
            x1="17.66"
            y1="44.83"
            x2="18.48"
            y2="42.08"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".15" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="front-gradient-48"
            x1="19.58"
            y1="43.19"
            x2="6.4"
            y2="10.58"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".26" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-48"
            x1="12.5"
            y1="44.72"
            x2="12.5"
            y2="5"
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
        class="back-shadow-48"
        points="34 34.75 34 39 35 39 40 37.25 34 34.75"
    /><path
        class="back-48"
        d="M35,39H9c-.55,0-1-.45-1-1V5h25v20.59c0,.27.11.52.29.71l1.41,1.41c.19.19.29.44.29.71v10.59Z"
    /><g><g class="clip-48"><Icon folderSize="48" folderType="win10" /></g></g
    ><path
        class="front-shadow-48"
        d="M16.34,44.86l4.66-1.86-5-2v3.63c0,.18.18.3.34.23Z"
    /><path
        class="front-48"
        d="M8,5l8.55,6.63c.28.24.45.59.45.96v19.77c0,.43-.07.86-.21,1.26l-.59,1.77c-.14.41-.21.83-.21,1.26v7.82c0,.21-.25.33-.41.19l-7.59-5.67V5Z"
    /><path
        class="highlight-48"
        d="M16.55,11.63l-8.55-6.63.5,1.07,7.73,5.94c.17.14.27.35.27.58v19.77c0,.38-.06.75-.18,1.11l-.59,1.77c-.15.46-.23.94-.23,1.42v-.62,8.57l.09.08s.1.06.16.06c.13,0,.25-.1.25-.25v-7.82c0-.43.07-.86.21-1.26l.59-1.77c.14-.41.21-.83.21-1.26V12.59c0-.37-.16-.72-.45-.96Z"
    /></svg
>
