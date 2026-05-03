import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Crafty } from "@/components/sections/crafty";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Crafty />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
