"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function DownloadCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("download");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/downloads");

        if (!response.ok) {
          throw new Error(
            `Failed to retrieve download count: ${response.status}`
          );
        }

        const { count } = await response.json();

        setCount(count);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      fetchCount();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return (
    <div className="download-counter">
      {count?.toLocaleString() || "∞"} {t("counter")}
    </div>
  );
}
