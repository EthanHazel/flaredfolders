<script>
    import { mainStore } from "../utils/stores";
    import config from "../folders/config.json";

    let { folderSize, folderType } = $props();

    let baseIconSize = $derived(config[folderType].iconSizes[folderSize]);
    let scaledIconSize = $derived(
        2 * Math.round((baseIconSize * $mainStore[folderSize].iconScale) / 2),
    );

    let centerCorrection = $derived((scaledIconSize - baseIconSize) / 2);
</script>

<g
    transform="translate({Math.round(
        config[folderType].iconOffsets[folderSize][0] +
            $mainStore[folderSize].iconOffsetX * (folderSize / 256) -
            centerCorrection,
    )} {Math.round(
        config[folderType].iconOffsets[folderSize][1] +
            $mainStore[folderSize].iconOffsetY * (folderSize / 256) -
            centerCorrection,
    )})"
>
    <svg
        id="missingno"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        width={scaledIconSize}
        height={scaledIconSize}
        ><defs>
            <title>missingno</title>
        </defs><circle
            id="outer-black"
            cx="20"
            cy="20"
            r="20"
            fill="black"
        /><circle id="white" fill="white" cx="20" cy="20" r="16" /><circle
            id="inner-black"
            cx="20"
            cy="20"
            r="11.5"
            fill="black"
        /><rect
            id="question-bottom"
            fill="white"
            x="17.75"
            y="25"
            width="5"
            height="4"
            rx="1.83"
            ry="1.83"
        /><path
            id="question-top"
            fill="white"
            d="M20.77,24h-1.06c-.98,0-1.73-.93-1.46-1.87.31-1.11.91-2.13,1.74-2.96l1.23-1.23c.5-.5.77-1.16.77-1.86,0-1.13-.87-2.07-1.94-2.08h-.12c-1.07.01-1.94.95-1.94,2.08v1.92c0,1.1-.9,2-2,2h0c-1.1,0-2-.9-2-2v-1c0-3.31,2.64-5.96,5.88-6h.24c3.97.05,7.04,3.17,5.45,7.4-.37.98-.99,1.85-1.73,2.59l-1.01,1.01c-.28.28-.5.62-.64.98-.23.6-.77,1.02-1.42,1.02Z"
        /></svg
    >
</g>
