"use client";

import useOS from "@/functions/fetch-os";

import "@/styles/home.css";

export default function Home() {
  const os = useOS();

  return (
    <div id="home">
      <h1>FlaredFolders</h1>
      <span>Check out my amazing temporary home page</span>
      {os === "windows" && (
        <div className="home-links windows">
          <span className="home-links-buttons">
            <a href="https://www.google.com/" className="home-link primary">
              Download for Windows
            </a>
            <a href="/editor" className="home-link secondary">
              Open Online Editor
            </a>
          </span>
          <a
            href="https://github.com/EthanHazel/flaredfolders"
            className="home-link-under"
            target="_blank"
          >
            Source Code
          </a>
        </div>
      )}
      {os !== "windows" && (
        <div className="home-links other">
          <span className="home-links-buttons">
            <a href="/editor" className="home-link primary">
              Open Editor
            </a>
            <a
              href="https://github.com/EthanHazel/flaredfolders"
              className="home-link secondary"
              target="_blank"
            >
              Source Code
            </a>
          </span>
        </div>
      )}
    </div>
  );
}
