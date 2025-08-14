"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState } from "react";
import { Languages } from "lucide-react";

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  variant = "default",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function onSelectChange(event) {
    const newLocale = event.target.value;
    const newUrl = pathname.replace(/\/[^/]+/, `/${newLocale}`);
    startTransition(() => {
      router.push(newUrl, undefined, { locale: newLocale });
    });
    setIsOpen(false);
  }

  if (variant === "icon") {
    return (
      <div className="lang-select-icon home-nav-icon-button">
        <Languages
          className={`lang-icon ${isPending ? "pending" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <select
            className="lang-dropdown"
            defaultValue={defaultValue}
            onChange={onSelectChange}
            disabled={isPending}
          >
            {children}
          </select>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <label className={isPending ? "pending lang-select" : "lang-select"}>
      <Languages className="lang-icon" />
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
