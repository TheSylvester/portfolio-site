import { NameAndTitle } from "./NameAndTitle";
import { Headshot } from "./Headshot";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { slideDevFadeHeadshot } from "./animations/slideDevFadeHeadshot";
import { useScrollAnimations } from "../hooks/ScrollAnimations";
import { revealHeroItems } from "./animations/revealHeroItems";
import { LogoDock } from "./LogoDock";
import { CodeExtractor } from "./CodeExtractor";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export const Hero = ({ animations = [] }) => {
  useScrollAnimations(animations);
  return (
    <section className={"section-hero"}>
      <CodeExtractor />
      <NameAndTitle />
      <Headshot />
      <LogoDock className={"logo-dock"} />
    </section>
  );
};

export const AnimatedHero = () => (
  <Hero animations={[revealHeroItems, slideDevFadeHeadshot]} />
);
