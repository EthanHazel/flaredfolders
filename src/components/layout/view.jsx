import Image from "next/image";

import "@/styles/layout/view.css";

export default function ViewLayout() {
  return (
    <div id="mobile">
      <Image
        src="/favicon/96.png"
        alt="Flared Folders"
        width={96}
        height={96}
      />
      <h1>Flared Folders</h1>
      <h3>A Free, Open-Source Folder Customization Tool</h3>
      <p>Please visit on a larger screen in order to use this tool.</p>
    </div>
  );
}
