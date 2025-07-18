import fetchClient from "@/lib/fetch-client";

import "@/styles/splash.css";

export default function Splash() {
  const client = fetchClient();

  return (
    <div id="splash">
      <svg id="a" viewBox="0 0 149.74 124.78">
        <path
          d="M74.87,24.96v24.96h46.91c1.66,0,3,1.34,3,3v18.96c0,1.66-1.34,3-3,3h-46.91v21.96c0,1.66,1.34,3,3,3h43.91c1.66,0,3,1.34,3,3v21.96h14.96c5.52,0,10-4.48,10-10V34.96c0-5.52-4.48-10-10-10H74.87Z"
          fill="currentColor"
          id="splash-a"
        />
        <path
          d="M24.96,46.91V27.96c0-1.66,1.34-3,3-3h46.91L52.84,2.93c-1.88-1.88-4.42-2.93-7.07-2.93H10C4.48,0,0,4.48,0,10V114.78c0,5.52,4.48,10,10,10h14.96v-46.91c0-1.66,1.34-3,3-3h46.91v-24.96H27.96c-1.66,0-3-1.34-3-3Z"
          fill="var(--text)"
          id="splash-b"
        />
      </svg>
    </div>
  );
}
