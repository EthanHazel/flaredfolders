"use client";

import { useState, useEffect } from "react";

export default function useOS() {
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
