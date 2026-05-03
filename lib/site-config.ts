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
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
