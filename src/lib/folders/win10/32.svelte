<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(32, "win10");
    });
</script>

<svg
    id="folder-32"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    ><defs
        ><style>
            .back-32 {
                fill: url(#back-gradient-32);
            }
            .front-32 {
                fill: url(#front-gradient-32);
            }
            .front-shadow-32 {
                fill: url(#front-shadow-gradient-32);
            }
            .highlight-32 {
                fill: url(#highlight-gradient-32);
            }
            .back-shadow-32 {
                fill: url(#back-shadow-gradient-32);
            }
            .clip-32 {
                clip-path: url(#clip-path-32);
            }
        </style><linearGradient
            id="back-shadow-gradient-32"
            x1="23"
            y1="27"
            x2="24"
            y2="26"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="back-gradient-32"
            x1="2.88"
            y1="18.16"
            x2="23.23"
            y2="13.29"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".27" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-32"
            ><path d="M0,0v32h32V0H0ZM11,23l-1,2v6l-5-4V4l6,5v14Z" /></clipPath
        ><linearGradient
            id="front-shadow-gradient-32"
            x1="10"
            y1="31"
            x2="11"
            y2="30"
            xlink:href="#back-shadow-gradient-32"
        /><linearGradient
            id="front-gradient-32"
            x1="10.22"
            y1="29.17"
            x2="5.62"
            y2="6"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-32"
            x1="8"
            y1="31"
            x2="8"
            y2="4"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#fff" stop-opacity="0" /><stop
                offset=".21"
                stop-color="#fff"
                stop-opacity=".05"
            /><stop offset=".59" stop-color="#fff" stop-opacity=".19" /><stop
                offset=".85"
                stop-color="#fff"
                stop-opacity=".3"
            /><stop
                offset=".95"
                stop-color="#fff"
                stop-opacity="0"
            /></linearGradient
        ></defs
    ><polygon class="back-shadow-32" points="23 25 23 27 25 27 23 25" /><polygon
        class="back-32"
        points="5 4 21 4 21 17.5 23 19.5 23 27 5 27 5 4"
    /><g><g class="clip-32"><Icon folderSize="32" folderType="win10" /></g></g
    ><polygon
        class="front-shadow-32"
        points="10 29 10 31 12 31 10 29"
    /><polygon
        class="front-32"
        points="5 4 11 9 11 23 10 25 10 31 5 27 5 4"
    /><polygon
        class="highlight-32"
        points="5 4 6 6.14 10 9.47 10 22.76 9.11 24.55 9 24.76 9 25 9 30.2 10 31 10 25 11 23 11 9 5 4"
    /></svg
>
