<script>
    import GroupInput from "../inputs/group.svelte";
    import RangeInput from "../inputs/range.svelte";
    import ColorInput from "../inputs/color.svelte";
    import RadioInput from "../inputs/radio.svelte";
    import CheckboxInput from "../inputs/checkbox.svelte";
    import TextInput from "../inputs/text.svelte";
    import CustomUpload from "../buttons/custom-upload.svelte";
    import { mainStore } from "../utils/stores";

    let selected = $derived(
        $mainStore.selectedSizes.map((size) => ({
            size,
            folderStore: $mainStore[size],
        })),
    );

    /**
     * Returns if a selected folder has the key
     * @param {any} key
     * @param {any} value
     */
    function isIncludedInSelected(key, value) {
        let isIncluded = false;
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].folderStore[key] === value) {
                isIncluded = true;
                break;
            }
        }
        return isIncluded;
    }
</script>

<div id="icon-panel" class="panel">
    <GroupInput name="icon.image">
        <RadioInput key="iconType" value="none" />
        <RadioInput key="iconType" value="lucide" tooltip />
        <RadioInput key="iconType" value="simple" tooltip />
        <RadioInput key="iconType" value="custom" />

        {#if isIncludedInSelected("iconType", "lucide") == true}
            <TextInput key="iconLucideSlug" tooltip={true} />
            <RangeInput
                min="0.1"
                max="4"
                key="iconLucideStroke"
                step="0.1"
                defaultValue="1.5"
            />
        {/if}

        {#if isIncludedInSelected("iconType", "simple") == true}
            <TextInput key="iconSimpleSlug" tooltip />
        {/if}

        {#if isIncludedInSelected("iconType", "custom") == true}
            <CustomUpload />
        {/if}
    </GroupInput>

    <GroupInput name="icon.color">
        <ColorInput key="colorIcon" />
        {#if isIncludedInSelected("iconShadowEnabled", true) == true}
            <ColorInput key="iconShadowColor" />
        {/if}
    </GroupInput>

    <GroupInput name="icon.transform">
        <RangeInput min="-128" max="128" key="iconOffsetX" step="1" />
        <RangeInput min="-128" max="128" key="iconOffsetY" step="1" />
        <RangeInput
            min="0"
            max="1"
            key="iconOpacity"
            step="0.05"
            defaultValue="1"
        />
        <RangeInput
            min="0.05"
            max="4"
            key="iconScale"
            step="0.05"
            defaultValue="1"
        />
    </GroupInput>

    <GroupInput name="icon.shadow" defaultClosed={true}>
        <CheckboxInput key="iconShadowEnabled" />

        {#if isIncludedInSelected("iconShadowEnabled", true) == true}
            <RangeInput min="0" max="1" key="iconShadowOpacity" step="0.05" />
            <RangeInput
                min="-10"
                max="10"
                key="iconShadowOffsetX"
                step="0.05"
            />
            <RangeInput
                min="-10"
                max="10"
                key="iconShadowOffsetY"
                step="0.05"
                defaultValue="1"
            />
            <RangeInput
                min="0"
                max="5"
                key="iconShadowBlur"
                step="0.05"
                defaultValue="1"
            />
        {/if}
    </GroupInput>
</div>
