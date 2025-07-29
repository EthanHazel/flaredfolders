"use server";

import { cookies } from "next/headers";

export async function setTheme(theme) {
  const cookiesInstance = await cookies();
  cookiesInstance.set("theme", theme, { maxAge: 60 * 60 * 24 * 365 });
}
