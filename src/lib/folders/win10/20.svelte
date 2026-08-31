<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(20, "win10");
    });
</script>

<svg
    id="folder-20"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 20 20"
    ><defs
        ><style>
            .front-20 {
                fill: url(#front-gradient-20);
            }
            .highlight-20 {
                fill: url(#highlight-gradient-20);
            }
            .back-20 {
                fill: url(#back-gradient-20);
            }
            .clip-20 {
                clip-path: url(#clip-path-20);
            }
        </style><linearGradient
            id="back-gradient-20"
            x1="1.63"
            y1="11.27"
            x2="15.43"
            y2="7.96"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".27" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-20"
            ><path
                d="M0,0v20h20V0H0ZM7,14l-1,2v2.79c0,.45-.54.67-.85.35l-2.15-2.15V2l4,3v9Z"
            /></clipPath
        ><linearGradient
            id="front-gradient-20"
            x1="6.6"
            y1="19.08"
            x2="3.21"
            y2="1.96"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-20"
            x1="5"
            y1="19.29"
            x2="5"
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
    ><polygon class="back-20" points="3 2 14 2 14 11 15 12 15 17 3 17 3 2" /><g
        ><g class="clip-20"><Icon folderSize="20" folderType="win10" /></g></g
    ><path
        class="front-20"
        d="M3,2l4,3v9l-1,2v2.79c0,.45-.54.67-.85.35l-2.15-2.15V2Z"
    /><path
        class="highlight-20"
        d="M3,2l1,2,2,1.5v8.26l-.89,1.79-.11.21v3.24l.15.15c.1.1.23.15.35.15.26,0,.5-.2.5-.5v-2.79l1-2V5L3,2Z"
    /></svg
>
