<script>
    import { undo, redo, interfaceStore } from "../utils/stores";
    import { Undo, Redo } from "@lucide/svelte";
</script>

<button
    onclick={() => undo()}
    disabled={$interfaceStore.currentScreen !== "editor"}
    class="nav-button-icon"><Undo size={16} /></button
>
<button
    onclick={() => redo()}
    disabled={$interfaceStore.currentScreen !== "editor"}
    class="nav-button-icon"><Redo size={16} /></button
>
