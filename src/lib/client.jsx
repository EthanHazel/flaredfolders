"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function fetchClient() {
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

export function isFirefox() {
  if (typeof window === "undefined") {
    return false;
  }
  return navigator.userAgent.toLowerCase().includes("firefox");
}

export function useOS() {
  const [os, setOS] = useState("windows");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Mac")) {
      setOS("mac");
    } else if (userAgent.includes("Win")) {
      setOS("windows");
    } else {
      setOS("other");
    }
  }, []);

  return os;
}
