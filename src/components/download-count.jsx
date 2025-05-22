"use client";

import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabase";

export default function DownloadCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("downloads")
          .select("count")
          .single();

        if (error) throw error;

        setCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) return null;

  return (
    <div className="download-counter">
      {count?.toLocaleString() || "0"} folders downloaded wordwide!
    </div>
  );
}
