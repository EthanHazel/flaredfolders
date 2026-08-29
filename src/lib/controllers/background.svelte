<script>
    import ColorBends from "../backgrounds/color-bends.svelte";
    import { mainStore, getColorsCombined } from "../utils/stores";

    let colors = $derived.by(() => {
        $mainStore;
        return getColorsCombined();
    });

    // TODO: Merge all the colors from each size into one
</script>

<div id="background-controller">
    <ColorBends
        rotation={90}
        autoRotate={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.15}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        colors={[
            colors.backOne,
            colors.backTwo,
            colors.frontOne,
            colors.frontTwo,
        ]}
    />
</div>

<style>
    #background-controller {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
    }
</style>
