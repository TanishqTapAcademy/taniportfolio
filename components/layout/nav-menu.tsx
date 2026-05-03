"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.65, 0.01, 0.05, 0.99] as const;

type NavMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function NavMenu({ open, onClose }: NavMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-40"
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration: 0.4, ease }}
            className="absolute inset-0 cursor-default bg-black/50"
          />

          <div className="absolute inset-y-0 right-0 w-full overflow-hidden sm:w-[min(560px,90vw)]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={{ closed: { x: "101%" }, open: { x: "0%" } }}
                transition={{ duration: 0.575, ease, delay: i * 0.12 }}
                className={
                  i === 0
                    ? "absolute inset-0 bg-foreground/10"
                    : i === 1
                      ? "absolute inset-0 bg-foreground/20"
                      : "absolute inset-0 bg-background"
                }
              />
            ))}

            <nav className="relative flex h-full flex-col justify-between p-8 sm:p-12">
              <ul className="space-y-2 pt-24">
                {siteConfig.nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      variants={{
                        closed: { y: "140%", rotate: 10, opacity: 0 },
                        open: { y: "0%", rotate: 0, opacity: 1 },
                      }}
                      transition={{
                        duration: 0.7,
                        ease,
                        delay: 0.35 + i * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-4xl font-semibold tracking-tight transition-opacity hover:opacity-60 sm:text-6xl"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                variants={{
                  closed: { y: 30, opacity: 0 },
                  open: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.5, ease, delay: 0.55 }}
                className="space-y-4 text-sm text-foreground/70"
              >
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
                <ul className="flex gap-5">
                  {siteConfig.socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
