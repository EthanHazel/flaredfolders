"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Languages } from "lucide-react";

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event) {
    const newLocale = event.target.value;
    const newUrl = pathname.replace(/\/[^/]+/, `/${newLocale}`);
    startTransition(() => {
      router.push(newUrl, undefined, { locale: newLocale });
    });
  }

  return (
    <label className={isPending ? "pending lang-select" : "lang-select"}>
      <Languages className="header-button-svg lang-icon" id="lang-icon" />
      <select
        defaultValue={defaultValue}
        onChange={onSelectChange}
        disabled={isPending}
      >
        {children}
      </select>
    </label>
  );
}
