export const siteConfig = {
  name: "Tanishq",
  logo: "TANISHQ",
  tagline: "Crafting playful, considered software.",
  contact: {
    email: "you@example.com",
    phone: "+61 0000 000 000",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Let's talk", href: "/#contact" },
  ],
  hero: {
    wordmark: "TANISHQ",
    background: "#FF5A52",
    wordmarkColor: "#FFC9C5",
    accentColor: "#E4FE52",
  },
  crafty: {
    background: "#FF5A52",
    textColor: "#FFC9C5",
    headline: ["A crafty bunch", "of creative", "problem solvers."],
    bgVideo: {
      poster:
        "https://cdn.prod.website-files.com/699637b29cf8a85d12ebac48/69aaa9d802173759e72876ed_hero_logo_loop-good_poster.0000000.jpg",
      mp4: "https://cdn.prod.website-files.com/699637b29cf8a85d12ebac48/69aaa9d802173759e72876ed_hero_logo_loop-good_mp4.mp4",
      webm: "https://cdn.prod.website-files.com/699637b29cf8a85d12ebac48/69aaa9d802173759e72876ed_hero_logo_loop-good_webm.webm",
    },
    stickerColors: {
      face: "#E4FE52",
      side: "#A8C220",
      text: "#FF3B33",
    },
    stickers: [
      { label: "ANIMATION", position: "top", rotate: -10 },
      { label: "LIVE ACTION", position: "middle", rotate: 8 },
      { label: "WIZARDRY", position: "bottom", rotate: -7 },
    ],
  },
  about: {
    background: "#2D00F7",
    textColor: "#E0C8BB",
    accent: "#FFE6D6",
    eyebrow: "About",
    name: "Tanishq Bhosale.",
    role: "Full Stack + AI Engineer · Bangalore",
    intro:
      "Two-plus years shipping production LLM and agentic AI systems — LangGraph state machines, FastAPI streams, React Native interfaces. I care about the moment where a complex system feels obvious to use, even when the plumbing underneath isn't.",
    sub: "Currently at Tap Academy (Full Stack) and Quanta (SDE1). Previously interned at Visionet Systems. B.Tech in Computer Science (Data Science), Presidency University, 2020–2024.",
    skills: [
      {
        title: "AI / ML",
        items: [
          "LangGraph",
          "LangChain",
          "LLM Integration",
          "RAG",
          "pgvector",
          "Agentic Workflows",
          "Prompt Engineering",
          "Mem0",
        ],
      },
      {
        title: "Languages",
        items: ["Python", "JavaScript", "TypeScript"],
      },
      {
        title: "Frontend",
        items: [
          "React",
          "React Native",
          "Expo",
          "Redux",
          "Zustand",
          "Tailwind CSS",
        ],
      },
      {
        title: "Backend",
        items: ["FastAPI", "Node.js", "Express", "Flask", "Prisma"],
      },
      {
        title: "Databases",
        items: ["PostgreSQL", "MongoDB", "MySQL", "pgvector"],
      },
      {
        title: "Cloud",
        items: ["AWS", "Firebase", "Supabase"],
      },
      {
        title: "Other",
        items: [
          "RESTful APIs",
          "SSE Streaming",
          "Async Architecture",
          "Modular Architecture",
          "SQL Optimization",
        ],
      },
    ],
    marquee: [
      "Full Stack",
      "AI Engineer",
      "LangGraph",
      "FastAPI",
      "React Native",
      "pgvector",
      "Agentic AI",
      "Streaming",
      "✦",
    ],
  },
  directors: {
    background: "#E0C8BB",
    textColor: "#2A1810",
    accentColor: "#FF3B33",
    items: [
      { name: "Project 01" },
      { name: "Project 02" },
      { name: "Project 03" },
      { name: "Project 04" },
      { name: "Project 05" },
      { name: "Project 06" },
      { name: "Project 07" },
      { name: "Project 08" },
    ],
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
