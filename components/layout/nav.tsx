"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuToggle } from "@/components/shared/menu-toggle";
import { NavMenu } from "./nav-menu";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ color: siteConfig.hero.accentColor }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            aria-label="Home"
            className="text-base font-black uppercase leading-none tracking-tight sm:text-lg"
          >
            {siteConfig.logo}
          </Link>
          <MenuToggle open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </header>

      <NavMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
