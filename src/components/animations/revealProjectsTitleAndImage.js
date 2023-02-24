import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIC_STICK_OUT_RATIO = 40;

export const revealProjectsTitleAndImage = () => {
  /* Reveal "Recent Projects" */
  let tlProjectsReveal = gsap.timeline({ paused: true });
  tlProjectsReveal.fromTo(
    ".projects-header",
    {
      opacity: 0,
    },
    {
      opacity: 1,
    }
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

  ScrollTrigger.create({
    trigger: ".projects-header",
    start: "center center",
    endTrigger: ".pic-container",
    end: () => {
      const pic = document.querySelector(".chroma-gallery-pic");
      const picHeight = pic.offsetHeight;
      const stickOut = (picHeight * PIC_STICK_OUT_RATIO) / 100;
      return `top ${window.innerHeight - stickOut}px`;
    },
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    immediateRender: false,
  });
};
