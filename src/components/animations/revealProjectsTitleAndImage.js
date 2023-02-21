import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIC_STICK_OUT_RATIO = 40;

export const revealProjectsTitleAndImage = () => {
  let tlProjectsReveal = gsap.timeline({ paused: true });
  tlProjectsReveal
    .fromTo(
      ".projects-header",
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )
    .fromTo(
      ".chroma-gallery-pic",
      { yPercent: 0 },
      {
        yPercent: -PIC_STICK_OUT_RATIO,
        ease: "elastic.out(1, 0.75)",
        delay: 0.1,
      },
      "<"
    );

  ScrollTrigger.create({
    trigger: ".projects-header",
    start: "center center",
    end: "top top",
    toggleActions: "play complete reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlProjectsReveal,
  });

  /* the pin */
  ScrollTrigger.create({
    trigger: ".projects-header",
    start: "center center",
    end: "top top",
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    immediateRender: false,
  });
  ScrollTrigger.create({
    trigger: ".projects-header",
    start: "center center",
    end: "top top",
    pin: ".pic-container",
    invalidateOnRefresh: true,
    immediateRender: false,
  });
};
