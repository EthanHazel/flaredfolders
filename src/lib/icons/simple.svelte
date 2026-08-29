<script>
    import { mainStore } from "../utils/stores";
    import config from "../folders/config.json";
    import * as icons from "@icons-pack/svelte-simple-icons";
    import MissingIcon from "./missing.svelte";

    let { folderSize, folderType } = $props();

    /**
     * @param {string} slug
     */
    function toPascalCase(slug) {
        return slug
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("");
    }

    function makeShadow() {
        if ($mainStore[folderSize].iconShadowEnabled != true) return "";

        // Converts 0 - 1 value to rounded hex value
        const shadowOpacity = Math.round(
            $mainStore[folderSize].iconShadowOpacity * 255,
        ).toString(16);

        return `filter: drop-shadow(${$mainStore[folderSize].iconShadowOffsetX}px ${
            $mainStore[folderSize].iconShadowOffsetY
        }px ${$mainStore[folderSize].iconShadowBlur}px ${$mainStore[folderSize].iconShadowColor}${shadowOpacity})`;
    }

    let iconName = $derived(
        "Si" + toPascalCase($mainStore[folderSize].iconSimpleSlug),
    );
    let IconComponent = $derived(icons[iconName]);

    let baseIconSize = $derived(config[folderType].iconSizes[folderSize]);
    let scaledIconSize = $derived(
        Math.round((baseIconSize * $mainStore[folderSize].iconScale) / 2) * 2,
    );

    // Lucide icons have a default padding of 1px for 24x24. SimpleIcons doesn't have any padding
    // so it needs to be added manually
    let iconPadding = $derived(scaledIconSize / 24);

    let renderedIconSize = $derived(
        Math.round((scaledIconSize - iconPadding * 2) / 2) * 2,
    );

    let centerCorrection = $derived(
        Math.round((scaledIconSize - baseIconSize) / 2 - iconPadding),
    );
</script>

{#if IconComponent}
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
        <IconComponent
            size={renderedIconSize}
            color={$mainStore[folderSize].colorIcon ?? "currentColor"}
            style="{makeShadow()}; opacity: {$mainStore[folderSize]
                .iconOpacity}"
        />
    </g>
{:else}
    <MissingIcon {folderSize} {folderType} />
{/if}
