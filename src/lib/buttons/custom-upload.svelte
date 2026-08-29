<script>
    import { updateStores, openModal } from "../utils/stores";

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 20 MB

    function uploadCustomData(e) {
        const file = e.target.files[0];

        // Check if the file is an image
        if (!file.type.startsWith("image/")) {
            openModal("unknown-filetype");
            return;
        }

        // Check if the file is too large
        if (file.size > MAX_FILE_SIZE) {
            openModal("file-too-big");
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            updateStores("iconCustomData", reader.result);
            updateStores(
                "iconCustomName",
                e.target.files[0].name.split(".").slice(0, -1).join("."),
            );
        };
    }
</script>

<input
    type="file"
    name="custom-upload"
    id="custom-upload"
    accept="image/*"
    oninput={(e) => {
        uploadCustomData(e);
    }}
/>
