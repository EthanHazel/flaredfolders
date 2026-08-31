<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(24, "win10");
    });
</script>

<svg
    id="folder-24"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    ><defs
        ><style>
            .front-24 {
                fill: url(#front-gradient-24);
            }
            .highlight-24 {
                fill: url(#highlight-gradient-24);
            }
            .back-24 {
                fill: url(#back-gradient-24);
            }
            .clip-24 {
                clip-path: url(#clip-path-24);
            }
        </style><linearGradient
            id="back-gradient-24"
            x1="2.34"
            y1="13.08"
            x2="18.71"
            y2="9.15"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".27" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-24"
            ><path d="M0,0v24h24V0H0ZM9,17l-1,1v5l-4-3V2l5,4v11Z" /></clipPath
        ><linearGradient
            id="front-gradient-24"
            x1="8.47"
            y1="22.91"
            x2="4.31"
            y2="1.94"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-24"
            x1="6.5"
            y1="23"
            x2="6.5"
            y2="2"
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
    ><polygon class="back-24" points="4 2 17 2 17 13 18 14 18 20 4 20 4 2" /><g
        ><g class="clip-24"><Icon folderSize="24" folderType="win10" /></g></g
    ><polygon
        class="front-24"
        points="4 2 9 6 9 17 8 18 8 23 4 20 4 2"
    /><polygon
        class="highlight-24"
        points="4 2 5 4.08 8 6.48 8 16.59 7.29 17.29 7 17.59 7 18 7 22 8 23 8 18 9 17 9 6 4 2"
    /></svg
>
