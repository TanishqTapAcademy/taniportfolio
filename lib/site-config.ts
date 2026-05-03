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
  directors: {
    background: "#FF5A52",
    textColor: "#FFC9C5",
    accentColor: "#E4FE52",
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
