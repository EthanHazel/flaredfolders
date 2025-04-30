import { Heart } from "lucide-react";

import Download from "./inputs/download";

import "@/styles/footer.css";

export default function Footer() {
  return (
    <div id="footer">
      <span id="donators">
        <Heart size={16} />
        Brought to you by Ko-Fi donators like{" "}
        <span id="donator">@unclecomrade</span>, Thank you!
      </span>
      <Download />
    </div>
  );
}
