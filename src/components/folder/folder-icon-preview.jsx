import { loadLucide } from "@/functions/fetch-lucide";
import { loadSimple } from "@/functions/fetch-simple";
import { loadCustom } from "@/functions/fetch-custom";
import { useEffect, useRef } from "react";

export default function FolderIconPreview({
  iconType,
  slug,
  color = "#000000",
  strokeWidth = "2",
  customFileName,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (iconType === "simple") {
      loadSimple(slug, color).then((img) => {
        ctx.drawImage(img, 0, 0, 48, 48);
      });
    } else if (iconType === "lucide") {
      loadLucide(slug, color, strokeWidth).then((img) => {
        ctx.drawImage(img, 0, 0, 48, 48);
      });
    } else if (iconType === "custom") {
      loadCustom(customFileName).then((img) => {
        ctx.drawImage(img, 0, 0, 48, 48);
      });
    }
  }, [iconType, slug, color, strokeWidth, customFileName]);

  return (
    <canvas id="folder-icon-preview" ref={canvasRef} width={48} height={48} />
  );
}
