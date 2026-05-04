"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
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
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={siteConfig.contact.resume.href}
              download={siteConfig.contact.resume.fileName}
              aria-label="Download resume"
              className="group relative isolate hidden items-center gap-2 rounded-full border border-current px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors hover:bg-current hover:text-black sm:inline-flex"
            >
              {/* continuous pulsing glow halo */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-1.5 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${siteConfig.hero.accentColor}, transparent 70%)`,
                  filter: "blur(10px)",
                  zIndex: -1,
                }}
                animate={{
                  scale: [1, 1.18, 1],
                  opacity: [0.45, 0.85, 0.45],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* expanding ring (radar pulse) */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border"
                style={{ borderColor: siteConfig.hero.accentColor }}
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 1],
                }}
              />
              {/* tiny pulse dot indicator */}
              <span
                aria-hidden
                className="relative inline-flex h-1.5 w-1.5"
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: siteConfig.hero.accentColor,
                    boxShadow: `0 0 8px ${siteConfig.hero.accentColor}`,
                  }}
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
              {/* arrow with periodic bounce */}
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative transition-transform group-hover:translate-y-0.5"
                aria-hidden
                animate={{ y: [0, 0, -3, 1, 0, 0, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.35, 0.5, 0.62, 0.72, 0.85, 1],
                }}
              >
                <path d="M12 4v12" />
                <path d="m6 12 6 6 6-6" />
                <path d="M5 21h14" />
              </motion.svg>
              <span className="relative">Resume</span>
            </a>
            <MenuToggle open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </div>
      </header>

      <NavMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
