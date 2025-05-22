import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST() {
  const supabase = createSupabaseServerClient();

  try {
    const { data, error } = await supabase.rpc("increment_downloads");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Database operation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("downloads")
      .select("count")
      .single();

    if (error) throw error;

    return NextResponse.json({ count: data.count });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve download count" },
      { status: 500 }
    );
  }
}
