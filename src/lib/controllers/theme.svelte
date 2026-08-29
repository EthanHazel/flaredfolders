<script>
    import { settingsStore } from "../utils/local-storage.js";

    $effect(() => {
        if ($settingsStore.theme == "dark") {
            document.documentElement.style.setProperty(
                "--text-color",
                "var(--white-color)",
            );
            document.documentElement.style.setProperty(
                "--background-color",
                "var(--black-color)",
            );
        } else {
            document.documentElement.style.setProperty(
                "--text-color",
                "var(--black-color)",
            );
            document.documentElement.style.setProperty(
                "--background-color",
                "var(--white-color)",
            );
        }
    });
</script>
