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
                fill: url(#linear-gradient-2);
            }
            .front-fill-16 {
                fill: url(#linear-gradient);
            }
            .clip-16 {
                clip-path: url(#clip-path-16);
            }
        </style><linearGradient
            id="linear-gradient"
            x1="14"
            y1="14"
            x2="2"
            y2="2"
            gradientUnits="userSpaceOnUse"
            ><stop offset="0" stop-color={colors.frontTwo} /><stop
                offset="1"
                stop-color={colors.frontOne}
            /></linearGradient
        ><clipPath id="clip-path-16"
            ><polygon
                points="3 1 13 1 13 8.79 12 9.79 12 15 3 15 3 1"
            /></clipPath
        ><linearGradient
            id="linear-gradient-2"
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
    ><rect class="front-fill-16" x="3" y="1" width="10" height="14" /><g
        ><g class="clip-16">
            <Icon folderSize="16" folderType="win10" />
        </g></g
    ><path
        class="front-outline-16"
        d="M14,16H2V0h11.25c.41,0,.75.34.75.75v15.25ZM3,15h10V1H3v14Z"
    /><path
        fill={colors.backTwo}
        d="M14.5,16h-2.5v-6.21l1.5-1.5,1.5,1.5v5.71c0,.28-.22.5-.5.5ZM14,15h0M13,15h1v-4.79l-.5-.5-.5.5v4.79Z"
    /><polygon
        fill={colors.frontTwo}
        points="14 10.21 13.5 9.71 13 10.21 13 15 14 15 14 10.21"
    /></svg
>
