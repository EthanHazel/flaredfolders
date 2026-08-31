<script>
    import GroupInput from "../inputs/group.svelte";
    import RangeInput from "../inputs/range.svelte";
    import ColorInput from "../inputs/color.svelte";
    import RadioInput from "../inputs/radio.svelte";

    import { mainStore } from "../utils/stores";

    import FOLDER_CONFIG from "../folders/config.json";

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

<div id="folder-panel" class="panel">
    <GroupInput name="folder.type">
        {#each Object.entries(FOLDER_CONFIG) as [type]}
            <RadioInput key="folderType" value={type} />
        {/each}
    </GroupInput>

    <GroupInput name="folder.color">
        <RadioInput key="colorType" value="original" />
        <RadioInput key="colorType" value="advanced" />
        <RadioInput key="colorType" value="gradient" />
        <RadioInput key="colorType" value="solid" />

        {#if isIncludedInSelected("colorType", "original") == false}
            <ColorInput key="colorFrontOne" />
            {#if isIncludedInSelected("colorType", "gradient") == true || isIncludedInSelected("colorType", "advanced") == true}
                <ColorInput key="colorFrontTwo" />
                {#if isIncludedInSelected("colorType", "advanced") == true}
                    <ColorInput key="colorBackOne" />
                    <ColorInput key="colorBackTwo" />
                {/if}
            {/if}

            {#if isIncludedInSelected("colorType", "solid") == true || isIncludedInSelected("colorType", "gradient") == true}
                <RangeInput
                    min="0"
                    max="0.5"
                    key="colorContrast"
                    step="0.01"
                    defaultValue="0.1.5"
                    tooltip
                />
                {#if isIncludedInSelected("colorType", "solid") == true}
                    <RangeInput
                        min="0"
                        max="360"
                        key="colorHueShift"
                        step="1"
                        defaultValue="15"
                        tooltip
                    />
                {/if}
            {/if}
        {/if}
    </GroupInput>
</div>
