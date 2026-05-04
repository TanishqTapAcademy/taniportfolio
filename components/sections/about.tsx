"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.65, 0.01, 0.05, 0.99] as const;

const TYPE_MS = 28;
const LINE_MS = 80;
const PAUSE_MS = 220;
const SHELL_USER = "tanishq";
const SHELL_HOST = "portfolio";
const SHELL_PATH = "~/site";
const SHELL_BRANCH = "main";

function slug(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
}

function CursorBlock({ color }: { color: string }) {
  return (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block"
      style={{ color }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.5, 0.5, 1],
      }}
    >
      ▮
    </motion.span>
  );
}

function Prompt({ accent, muted }: { accent: string; muted: string }) {
  return (
    <span className="whitespace-nowrap">
      <span style={{ color: accent }}>{SHELL_USER}</span>
      <span style={{ color: muted }}>@</span>
      <span style={{ color: accent }}>{SHELL_HOST}</span>
      <span style={{ color: muted }}>:</span>
      <span style={{ color: muted }}>{SHELL_PATH}</span>
      <span style={{ color: muted }}> (</span>
      <span style={{ color: accent }}>{SHELL_BRANCH}</span>
      <span style={{ color: muted }}>) $ </span>
    </span>
  );
}

type Phase =
  | "boot"
  | "typing-whoami"
  | "whoami-out"
  | "typing-cat"
  | "rule-top"
  | "categories"
  | "rule-bottom"
  | "count"
  | "done";

const CMD_WHOAMI = "whoami";
const CMD_CAT = "cat skills.txt";

function Terminal() {
  const { textColor, accent, name, role, skills } = siteConfig.about;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const [phase, setPhase] = useState<Phase>("boot");
  const [typedWhoami, setTypedWhoami] = useState("");
  const [typedCat, setTypedCat] = useState("");
  const [catStage, setCatStage] = useState(0); // 0 nothing, 1 top rule, 2..N+1 cats, N+2 bottom, N+3 count

  const totalCategories = skills.length;
  const totalTools = skills.reduce((acc, c) => acc + c.items.length, 0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setTypedWhoami(CMD_WHOAMI);
      setTypedCat(CMD_CAT);
      setCatStage(totalCategories + 3);
      setPhase("done");
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let t = 600; // boot delay so the chrome fades in first

    setPhase("boot");

    // type whoami
    timeouts.push(setTimeout(() => setPhase("typing-whoami"), t));
    for (let i = 1; i <= CMD_WHOAMI.length; i++) {
      timeouts.push(setTimeout(() => setTypedWhoami(CMD_WHOAMI.slice(0, i)), t + i * TYPE_MS));
    }
    t = t + CMD_WHOAMI.length * TYPE_MS + PAUSE_MS;

    // whoami output (instant)
    timeouts.push(setTimeout(() => setPhase("whoami-out"), t));
    t = t + 600;

    // type cat
    timeouts.push(setTimeout(() => setPhase("typing-cat"), t));
    for (let i = 1; i <= CMD_CAT.length; i++) {
      timeouts.push(setTimeout(() => setTypedCat(CMD_CAT.slice(0, i)), t + i * TYPE_MS));
    }
    t = t + CMD_CAT.length * TYPE_MS + PAUSE_MS;

    // top rule
    timeouts.push(
      setTimeout(() => {
        setPhase("rule-top");
        setCatStage(1);
      }, t),
    );
    t += LINE_MS;

    // categories
    for (let i = 0; i < totalCategories; i++) {
      timeouts.push(
        setTimeout(() => {
          setPhase("categories");
          setCatStage(2 + i);
        }, t + i * LINE_MS),
      );
    }
    t = t + totalCategories * LINE_MS;

    // bottom rule
    timeouts.push(
      setTimeout(() => {
        setPhase("rule-bottom");
        setCatStage(totalCategories + 2);
      }, t),
    );
    t += LINE_MS;

    // count
    timeouts.push(
      setTimeout(() => {
        setPhase("count");
        setCatStage(totalCategories + 3);
      }, t),
    );
    t += 240;

    // final prompt
    timeouts.push(setTimeout(() => setPhase("done"), t));

    return () => timeouts.forEach(clearTimeout);
  }, [inView, reduce, totalCategories]);

  const muted = `${textColor}99`; // ~60% via hex alpha
  const dim = `${textColor}66`; // ~40%
  const ruleStyle = { backgroundColor: textColor, opacity: 0.2 };

  const showWhoamiCursor =
    phase === "typing-whoami" || (phase === "boot" && !reduce);
  const showCatCursor = phase === "typing-cat";

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease }}
      className="mx-auto w-full max-w-[920px] overflow-hidden rounded-xl backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(8, 0, 60, 0.55)",
        border: `1px solid ${textColor}33`,
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: `${textColor}1f` }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#FF5F57" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#FEBC2E" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#28C840" }}
          />
        </div>

        <div
          className="flex flex-1 items-center justify-center font-departure text-xs"
          style={{ color: muted }}
        >
          <span className="hidden sm:inline">
            {SHELL_PATH} — zsh — {totalTools}×{totalCategories}
          </span>
          <span className="sm:hidden">skills.txt</span>
        </div>

        <div
          className="flex items-center gap-2 font-departure text-[10px] uppercase tracking-[0.2em]"
          style={{ color: dim }}
        >
          <span>●</span>
          <span>live</span>
        </div>
      </div>

      {/* body */}
      <div
        className="px-5 py-6 font-departure text-sm leading-[1.7] sm:px-8 sm:py-8 sm:text-[0.95rem]"
        style={{ color: textColor }}
      >
        {/* boot line */}
        <div style={{ color: dim }}>
          last login: {new Date().toDateString().toLowerCase()} on ttys001
        </div>

        {/* whoami */}
        <div className="mt-4 flex flex-wrap items-baseline">
          <Prompt accent={accent} muted={muted} />
          <span>
            {typedWhoami}
            {showWhoamiCursor && <CursorBlock color={textColor} />}
          </span>
        </div>
        <div
          className="mt-1 transition-opacity duration-200"
          style={{
            opacity:
              phase === "whoami-out" ||
              phase === "typing-cat" ||
              phase === "rule-top" ||
              phase === "categories" ||
              phase === "rule-bottom" ||
              phase === "count" ||
              phase === "done"
                ? 1
                : 0,
          }}
        >
          <span style={{ color: textColor }}>{name.replace(/\.$/, "")}</span>
          <span style={{ color: muted }}> — </span>
          <span style={{ color: muted }}>{role.toLowerCase()}</span>
        </div>

        {/* cat */}
        <div className="mt-5 flex flex-wrap items-baseline">
          <Prompt accent={accent} muted={muted} />
          <span>
            {typedCat}
            {showCatCursor && <CursorBlock color={textColor} />}
          </span>
        </div>

        {/* top rule */}
        <div
          className="mt-4 h-px transition-opacity duration-150"
          style={{ ...ruleStyle, opacity: catStage >= 1 ? 0.2 : 0 }}
        />

        {/* categories */}
        <div className="mt-3 space-y-3">
          {skills.map((cat, i) => {
            const visible = catStage >= 2 + i;
            return (
              <div
                key={cat.title}
                className="grid grid-cols-1 items-baseline gap-x-5 sm:grid-cols-[11rem_1fr]"
              >
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={
                    visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                  }
                  transition={{ duration: 0.25, ease }}
                  className="whitespace-nowrap text-[0.95rem]"
                  style={{ color: accent }}
                >
                  [ {cat.title.toLowerCase()} ]
                </motion.span>
                <span className="flex flex-wrap gap-x-2 gap-y-2">
                  {cat.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.65, y: 8 }}
                      animate={
                        visible
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 0, scale: 0.65, y: 8 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 460,
                        damping: 22,
                        mass: 0.6,
                        delay: visible ? j * 0.04 : 0,
                      }}
                      whileHover={{
                        backgroundColor: accent,
                        color: "#08003C",
                        borderColor: accent,
                        scale: 1.06,
                        rotate: -1.5,
                      }}
                      className="relative inline-flex cursor-default items-center gap-1 px-2 py-1 text-[0.95rem] leading-none"
                      style={{
                        color: textColor,
                        backgroundColor: `${accent}10`,
                        border: `1px solid ${accent}38`,
                        borderRadius: 3,
                        textShadow: `0 0 1px ${textColor}55`,
                      }}
                    >
                      <span
                        aria-hidden
                        className="text-[0.7rem] leading-none"
                        style={{ color: accent }}
                      >
                        ▸
                      </span>
                      {slug(item)}
                    </motion.span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        {/* bottom rule */}
        <div
          className="mt-4 h-px transition-opacity duration-150"
          style={{
            ...ruleStyle,
            opacity: catStage >= totalCategories + 2 ? 0.2 : 0,
          }}
        />

        {/* count */}
        <div
          className="mt-2 transition-opacity duration-200"
          style={{
            color: muted,
            opacity: catStage >= totalCategories + 3 ? 1 : 0,
          }}
        >
          {totalCategories} categories · {totalTools} tools · 0 errors
        </div>

        {/* fresh prompt */}
        <div
          className="mt-5 flex flex-wrap items-baseline transition-opacity duration-300"
          style={{ opacity: phase === "done" ? 1 : 0 }}
        >
          <Prompt accent={accent} muted={muted} />
          <CursorBlock color={textColor} />
        </div>
      </div>

      {/* footer status bar */}
      <div
        className="flex items-center justify-between gap-4 border-t px-5 py-2 font-departure text-[10px] uppercase tracking-[0.25em]"
        style={{ borderColor: `${textColor}14`, color: dim }}
      >
        <span>{SHELL_BRANCH} ⇡</span>
        <span>utf-8</span>
        <span>ln {totalTools + 4}</span>
      </div>
    </motion.div>
  );
}

export function About() {
  const { background, textColor, accent, eyebrow, name, role, intro, sub, marquee } =
    siteConfig.about;
  const reduce = useReducedMotion();

  const marqueeLoop = [...marquee, ...marquee, ...marquee];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden px-6 py-[16vh] md:px-12"
      style={{ backgroundColor: background, color: textColor }}
    >
      {/* eyebrow */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto flex max-w-[1400px] items-center gap-4"
      >
        <span
          className="h-px flex-1"
          style={{ backgroundColor: textColor, opacity: 0.4 }}
        />
        <span className="font-departure text-xs uppercase tracking-[0.3em] opacity-70">
          {eyebrow} — 01
        </span>
        <span
          className="h-px w-16"
          style={{ backgroundColor: textColor, opacity: 0.4 }}
        />
      </motion.div>

      {/* headline + bio */}
      <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-7">
          <motion.h2
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="font-departure font-black uppercase leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            {name}
          </motion.h2>
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="mt-4 font-departure text-xs uppercase tracking-[0.25em]"
            style={{ color: accent }}
          >
            {role}
          </motion.p>
        </div>

        <div className="self-end md:col-span-5">
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="font-departure text-base leading-relaxed md:text-lg"
            style={{ color: textColor }}
          >
            {intro}
          </motion.p>
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            className="mt-6 font-departure text-sm leading-relaxed opacity-70"
          >
            {sub}
          </motion.p>
        </div>
      </div>

      {/* marquee */}
      <div
        className="relative mt-[14vh] overflow-hidden border-y"
        style={{ borderColor: textColor }}
      >
        <motion.div
          className="flex gap-10 whitespace-nowrap py-5 font-departure text-2xl uppercase tracking-tight md:text-3xl"
          animate={reduce ? undefined : { x: ["0%", "-33.3333%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {marqueeLoop.map((label, i) => (
            <span key={`${label}-${i}`} className="inline-flex items-center gap-10">
              <span>{label}</span>
              <span aria-hidden style={{ color: accent }}>
                ✦
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* skills — terminal */}
      <div className="mx-auto mt-[14vh] max-w-[1400px]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-baseline gap-6"
        >
          <span className="font-departure text-xs uppercase tracking-[0.3em] opacity-70">
            Skills — 02
          </span>
          <span
            className="h-px flex-1"
            style={{ backgroundColor: textColor, opacity: 0.4 }}
          />
        </motion.div>

        <div className="mt-10">
          <Terminal />
        </div>
      </div>

      {/* footer strip */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto mt-[14vh] flex max-w-[1400px] items-center justify-between font-departure text-xs uppercase tracking-[0.3em] opacity-70"
      >
        <span>Bangalore, IN</span>
        <span>{new Date().getFullYear()}</span>
      </motion.div>
    </section>
  );
}
