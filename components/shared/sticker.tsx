"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type StickerProps = {
  src: string;
  alt?: string;
  className?: string;
  delay?: number;
  rotate?: number;
};

export function Sticker({
  src,
  alt = "",
  className,
  delay = 0,
  rotate = -6,
}: StickerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={
        reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: rotate * 3 }
      }
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.9, ease, delay }}
      className={cn("pointer-events-none absolute z-20", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        unoptimized
        draggable={false}
        className="h-auto w-full select-none"
      />
    </motion.div>
  );
}
