import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeToBlack = () => {
  /* Fade to black when page is exiting */
  const tlFadeOut = gsap.timeline({ paused: true });
  tlFadeOut.fromTo(
    ".section-portfolio",
    { filter: "brightness(1)" },
    { filter: "brightness(0)" }
  );

  ScrollTrigger.create({
    trigger: ".section-portfolio",
    start: "bottom 75%",
    end: "bottom 25%",
    // toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlFadeOut,
    scrub: 1,
  });
};
