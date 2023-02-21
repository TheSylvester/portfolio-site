import { NameAndTitle } from "./NameAndTitle";
import { Headshot } from "./Headshot";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { AddScrollAnimations } from "../utilities/AddScrollAnimations";
import { slideDevFadeHeadshot } from "./animations/slideDevFadeHeadshot";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export const Hero = () => {
  return (
    <section className={"section-hero"}>
      <NameAndTitle />
      <Headshot />
    </section>
  );
};

export const AnimatedHero = () =>
  AddScrollAnimations({
    Component: Hero,
    animations: [slideDevFadeHeadshot],
  });
