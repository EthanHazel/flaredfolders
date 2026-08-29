<script>
    import { saveProjectFile } from "../utils/stores";
    import { _ } from "svelte-i18n";
</script>

<button
    class="text"
    onclick={() => {
        saveProjectFile();
    }}>{$_("actions.save")}</button
>
