<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(256, "win10");
    });
</script>

<svg
    id="folder-256"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 256 256"
    ><defs
        ><style>
            .emboss-shadow-256,
            .emboss-highlight-256 {
                opacity: 0.25;
            }
            .back-256 {
                fill: url(#back-gradient-256);
            }
            .front-256 {
                fill: url(#front-gradient-256);
            }
            .front-shadow-256 {
                fill: url(#front-shadow-gradient-256);
            }
            .highlight-256 {
                fill: url(#highlight-gradient-256);
            }
            .emboss-highlight-256 {
                fill: #fff;
            }
            .back-shadow-256 {
                fill: url(#back-shadow-gradient-256);
            }
            .clip-256 {
                clip-path: url(#clip-path-256);
            }
        </style><linearGradient
            id="back-shadow-gradient-256"
            x1="191.1"
            y1="208.59"
            x2="197.04"
            y2="196.92"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="back-gradient-256"
            x1="28.05"
            y1="147.82"
            x2="169.4"
            y2="100.92"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".33" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ><clipPath id="clip-path-256"
            ><path
                d="M0,0v256h256V0H0ZM94,178.67c0,.87-.23,1.73-.66,2.48l-2.68,4.69c-.43.76-.66,1.61-.66,2.48v53.44c0,2.23-1,4.23-3.27,2.54l-41.73-34.31V28l45,36c4,3,4,5,4,8.38v106.3Z"
            /></clipPath
        ><linearGradient
            id="front-shadow-gradient-256"
            x1="98.13"
            y1="244.64"
            x2="102.2"
            y2="230.99"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color="#000" stop-opacity=".1" /><stop
                offset="1"
                stop-color="#000"
                stop-opacity="0"
            /></linearGradient
        ><linearGradient
            id="front-gradient-256"
            x1="108.74"
            y1="236.77"
            x2="36.67"
            y2="58.39"
            gradientUnits="userSpaceOnUse"
            ><stop offset=".26" stop-color={colors.frontTwo} /><stop
                offset=".89"
                stop-color={colors.frontOne}
            /></linearGradient
        ><linearGradient
            id="highlight-gradient-256"
            x1="69.5"
            y1="242"
            x2="69.5"
            y2="28"
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
        class="back-shadow-256"
        points="185 192 185 209 186 209 209 202 185 192"
    /><path
        class="back-256"
        d="M184,210H45V28h127c2.76,0,5,2.24,5,5v104.4c0,1.3.51,2.55,1.41,3.48l9.75,10.06c.54.56.85,1.31.85,2.09v51.98c0,2.76-2.24,5-5,5Z"
    /><g><g class="clip-256"><Icon folderSize="256" folderType="win10" /></g></g
    ><polygon
        class="front-shadow-256"
        points="88 244 118 234 87 226 88 244"
    /><path
        class="front-256"
        d="M45,28l45,36c4,3,4,5,4,8.38v106.3c0,.87-.23,1.73-.66,2.48l-2.68,4.69c-.43.76-.66,1.61-.66,2.48v53.44c0,2.23-1,4.23-3.27,2.54l-41.73-34.31V28Z"
    /><polygon
        class="emboss-shadow-256"
        fill={colors.backTwo}
        points="49 207.5 48 206.5 48 36.5 49 37.5 49 207.5"
    /><polygon
        class="emboss-shadow-256"
        fill={colors.backTwo}
        points="52 210.5 51 209.5 51 39.5 52 40.5 52 210.5"
    /><polygon
        class="emboss-highlight-256"
        points="50 208.5 49 207.5 49 37.5 50 38.5 50 208.5"
    /><polygon
        class="emboss-highlight-256"
        points="53 211.5 52 210.5 52 40.5 53 41.5 53 211.5"
    /><path
        class="highlight-256"
        d="M93,72.38v106.3c0,.69-.18,1.38-.53,1.98l-2.68,4.69c-.52.91-.79,1.93-.79,2.98v52.67l1,1v-53.67c0-.87.23-1.73.66-2.48l2.68-4.69c.43-.76.66-1.61.66-2.48v-106.3c0-3.38,0-5.38-4-8.38L45,28l1,2.08,43.4,34.72c3.6,2.7,3.6,4.33,3.6,7.58Z"
    /></svg
>
