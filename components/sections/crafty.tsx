"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.65, 0.01, 0.05, 0.99] as const;

const POSITION_CLASS: Record<string, string> = {
  top: "left-[20%] top-[22%]",
  middle: "right-[18%] top-[46%]",
  bottom: "bottom-[26%] left-[36%]",
};

export function Crafty() {
  const { background, textColor, headline, stickers, stickerColors } =
    siteConfig.crafty;
  const reduce = useReducedMotion();

  const sideShadow = [1, 2, 3, 4, 5]
    .map((n) => `${n}px ${n}px 0 ${stickerColors.side}`)
    .join(", ");

  return (
    <section
      id="crafty"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: background }}
    >
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <video
          data-physics-item
          className="h-[60vmin] w-[60vmin] object-contain mix-blend-multiply"
          autoPlay
          loop
          muted
          playsInline
          poster={bgVideo.poster}
        >
          <source src={bgVideo.webm} type="video/webm" />
          <source src={bgVideo.mp4} type="video/mp4" />
        </video>
      </div> */}

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
        {headline.map((line, i) => (
          <motion.div
            key={line}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.12 }}
            className="font-departure font-black uppercase leading-[0.95] tracking-tight"
            style={{
              color: textColor,
              fontSize: "clamp(2rem, 6vw, 5.5rem)",
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {stickers.map((s, i) => (
        <motion.div
          key={s.label}
          data-physics-item
          initial={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0,
                  rotate: s.rotate + (s.rotate > 0 ? 35 : -35),
                  y: -30,
                }
          }
          whileInView={{ opacity: 1, scale: 1, rotate: s.rotate, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 14,
            mass: 0.7,
            delay: 0.5 + i * 0.18,
          }}
          className={`pointer-events-none absolute z-20 select-none ${POSITION_CLASS[s.position]}`}
        >
          <div
            className="font-departure font-bold uppercase"
            style={{
              backgroundColor: stickerColors.face,
              color: stickerColors.text,
              boxShadow: sideShadow,
              padding: "0.5em 0.85em",
              fontSize: "clamp(0.7rem, 0.95vw, 1rem)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              lineHeight: 1.1,
            }}
          >
            {s.label}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
