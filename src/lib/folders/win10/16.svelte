<script>
    import { mainStore, getColors } from "../../utils/stores.js";
    import Icon from "../../icon.svelte";

    let colors = $derived.by(() => {
        $mainStore;
        return getColors(16, "win10");
    });
</script>

<svg
    id="folder-16"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 16 16"
    ><defs
        ><style>
            .front-outline-16 {
                fill: url(#front-stroke-16);
            }
            .front-fill-16 {
                fill: url(#front-fill-gradient-16);
            }
            .clip-16 {
                clip-path: url(#clip-path-16);
            }
        </style><linearGradient
            id="front-fill-gradient-16"
            x1="14.46"
            y1="14.54"
            x2="1.46"
            y2="1.54"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-16"
            ><polygon
                class="mask"
                points="3 1 13 1 13 8.79 12 9.79 12 15 3 15 3 1"
            /></clipPath
        ><linearGradient
            id="front-stroke-16"
            x1="14.89"
            y1="15.11"
            x2=".89"
            y2="1.11"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.backTwo} /><stop
                offset="1"
                stop-color={colors.backOne}
            /></linearGradient
        ></defs
    ><path
        class="front-fill-16"
        d="M2.5.5h10.75c.14,0,.25.11.25.25v14.75H2.5V.5h0Z"
    /><g id="icon"
        ><g class="clip-16"><Icon folderSize="16" folderType="win10" /></g></g
    ><path
        class="front-outline-16"
        d="M14,16H2V0h11.25c.41,0,.75.34.75.75v15.25ZM3,15h10V1H3v14Z"
    /><polygon
        class="back-fill-16"
        fill={colors.frontTwo}
        points="14.5 15.5 12.5 15.5 12.5 10 13.5 9 14.5 10 14.5 15.5"
    /><path
        class="back-outline-16"
        stroke={colors.backTwo}
        d="M14.5,16h-2.5v-6.21l1.5-1.5,1.5,1.5v5.71c0,.28-.22.5-.5.5ZM14,15h0M13,15h1v-4.79l-.5-.5-.5.5v4.79Z"
    /></svg
>
