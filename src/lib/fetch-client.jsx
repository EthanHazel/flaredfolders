"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function fetchClient() {
  const [client, setClient] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const isDesktop = await invoke("is_desktop");
        setClient(isDesktop ? "desktop" : "web");
      } catch (error) {
        setClient("web");
      }
    })();
  }, []);

  return client;
}
