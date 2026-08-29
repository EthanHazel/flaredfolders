<script>
    import { openModal } from "../utils/stores";
    import { _ } from "svelte-i18n";
</script>

<button
    class="text primary"
    onclick={() => {
        openModal("new-project");
    }}>{$_("actions.new")}</button
>
