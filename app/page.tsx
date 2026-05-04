import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Crafty } from "@/components/sections/crafty";
import { Directors } from "@/components/sections/directors";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Crafty />
      <Directors />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
