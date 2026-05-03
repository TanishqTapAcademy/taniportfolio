"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.65, 0.01, 0.05, 0.99] as const;

type MenuToggleProps = {
  open: boolean;
  onClick: () => void;
  className?: string;
};

export function MenuToggle({ open, onClick, className }: MenuToggleProps) {
  const [hovered, setHovered] = useState(false);
  const iconRotate = open ? 315 : hovered ? 90 : 0;

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cn(
        "inline-flex items-center gap-[0.5em] text-base font-semibold leading-none tracking-tight sm:text-lg",
        className,
      )}
    >
      <span className="relative block h-[1.125em] w-[3.2em] overflow-hidden">
        <motion.span
          animate={{ y: open ? "-100%" : "0%" }}
          transition={{ duration: 0.7, ease }}
          className="absolute inset-x-0 top-0 block leading-[1.125]"
        >
          Menu
        </motion.span>
        <motion.span
          animate={{ y: open ? "-100%" : "0%" }}
          transition={{ duration: 0.7, ease, delay: open ? 0.2 : 0 }}
          className="absolute inset-x-0 top-full block leading-[1.125]"
        >
          Close
        </motion.span>
      </span>

      <motion.span
        animate={{ rotate: iconRotate }}
        transition={{ duration: 0.4, ease }}
        className="grid h-[1em] w-[1em] place-items-center"
      >
        <svg viewBox="0 0 16 16" className="h-full w-full" fill="none">
          <path d="M7 16V0h2v16z" fill="currentColor" />
          <path d="M16 9H0V7h16z" fill="currentColor" />
        </svg>
      </motion.span>
    </button>
  );
}
