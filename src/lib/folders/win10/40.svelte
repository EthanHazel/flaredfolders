<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(40, "win10");
    });
</script>

<svg
    id="folder-40"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 40 40"
    ><defs
        ><style>
            .back-40 {
                fill: url(#back-gradient-40);
            }
            .front-40 {
                fill: url(#front-gradient-40);
            }
            .front-shadow-40 {
                fill: url(#front-shadow-40);
            }
            .highlight-40 {
                fill: url(#highlight-shadow-40);
            }
            .back-shadow-40 {
                fill: url(#back-shadow-40);
            }
            .clip-40 {
                clip-path: url(#clip-path-40);
            }
        </style><linearGradient
            id="back-shadow-40"
            x1="30.52"
            y1="32.9"
            x2="32.01"
            y2="29.98"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="back-gradient-40"
            x1="6.92"
            y1="21.28"
            x2="28.75"
            y2="16.04"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".27" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-40"
            ><path
                d="M0,0v40h40V0H0ZM15,27.76c0,.16-.04.31-.11.45l-.79,1.58c-.07.14-.11.29-.11.45v7.68c0,.43-.5.66-.83.38l-6.17-5.29V4l8,6v17.76Z"
            /></clipPath
        ><linearGradient
            id="front-shadow-40"
            x1="15.66"
            y1="38.33"
            x2="16.48"
            y2="35.58"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".15" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="front-gradient-40"
            x1="11"
            y1="36.16"
            x2="11"
            y2="4.07"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".26" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-shadow-40"
            x1="11"
            y1="38.41"
            x2="11"
            y2="4"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#fff" stop-opacity="0" /><stop
                offset=".16"
                stop-color="#fff"
                stop-opacity=".05"
            /><stop offset=".47" stop-color="#fff" stop-opacity=".19" /><stop
                offset=".85"
                stop-color="#fff"
                stop-opacity=".4"
            /><stop
                offset="1"
                stop-color="#fff"
                stop-opacity="0"
            /></linearGradient
        ></defs
    ><polygon
        class="back-shadow-40"
        points="29 28.75 29 33 30 33 35 31.25 29 28.75"
    /><path class="back-40" d="M7,4h20.5c.28,0,.5.22.5.5v16.5l2,2v10H7V4Z" /><g
        ><g class="clip-40"><Icon folderSize="40" folderType="win10" /></g></g
    ><path
        class="front-shadow-40"
        d="M14.34,38.36l4.66-1.86-5-2v3.63c0,.18.18.3.34.23Z"
    /><path
        class="front-40"
        d="M7,4l8,6v17.76c0,.16-.04.31-.11.45l-.79,1.58c-.07.14-.11.29-.11.45v7.68c0,.43-.5.66-.83.38l-6.17-5.29V4Z"
    /><path
        class="highlight-40"
        d="M7,4l1,2,6,4.5v17.26l-.79,1.58c-.14.28-.21.59-.21.89v7.91l.17.15c.1.08.21.12.32.12.26,0,.5-.2.5-.5v-7.68c0-.16.04-.31.11-.45l.79-1.58c.07-.14.11-.29.11-.45V10L7,4Z"
    /></svg
>
