<script>
    import {
        interfaceStore,
        mainStore,
        loadDataToStore,
        openModal,
    } from "../utils/stores";
    import { _ } from "svelte-i18n";

    /**
     * Opens a project from a file input event.
     * @param {Event} e
     */
    function openProject(e) {
        try {
            new Response(e.target.files[0])
                .json()
                .then((data) => {
                    loadDataToStore(data);
                    $interfaceStore.currentScreen = "editor";
                })
                .catch((err) => {
                    openModal("unknown-filetype-project");
                });
        } catch (e) {
            openModal("unknown-filetype-project");
        }
    }
</script>

<input
    type="file"
    name="open-project"
    id="open-project"
    oninput={(e) => openProject(e)}
/>
<button
    class="text"
    onclick={() => {
        if ($mainStore.dirty == true) {
            if (window.confirm($_("openProject.confirm"))) {
                document.getElementById("open-project")?.click();
            }
        } else {
            document.getElementById("open-project")?.click();
        }
    }}>{$_("actions.open")}</button
>

<style>
    #open-project {
        opacity: 0%;
        width: 0px;
        height: 0px;
        position: fixed;
        top: -200%;
        left: -200%;
        display: none;
        /* Absolutely banished this thing from the viewport */
    }
</style>
