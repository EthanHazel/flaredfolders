"use client";

import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event) {
    const newLocale = event.target.value;
    startTransition(() => {
      router.push(`/${newLocale}`, undefined, { locale: newLocale });
    });
  }

  return (
    <label className={isPending ? "pending" : ""}>
      <span className="lang-label">{label}</span>
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
