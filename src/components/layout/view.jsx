import { Expand } from "lucide-react";

import "@/styles/layout/view.css";

export default function ViewLayout() {
  return (
    <div id="mobile">
      <Expand />
      <p>
        <b>Please visit on a larger screen in order to use this tool.</b>
      </p>
      <p>Minimum resolution: 980x500</p>
    </div>
  );
}
