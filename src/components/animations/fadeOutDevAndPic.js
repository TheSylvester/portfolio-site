import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const fadeOutDevAndPic = () => {
  fadeOut(".dev-container", {
    trigger: ".section-tagline",
    start: "10% top",
    end: "+=25%",
    scrub: 1,
    invalidateOnRefresh: true,
    immediateRender: false,
  });

  fadeOut(".headshot", {
    trigger: ".section-tagline",
    start: "10% top",
    end: "+=25%",
    scrub: 1,
    invalidateOnRefresh: true,
    immediateRender: false,
  });
};

const fadeOut = (target, triggerProperties) => {
  const tlFadeOut = gsap.timeline({ paused: true });
  tlFadeOut.to(target, { opacity: 0 });

  ScrollTrigger.create({ ...triggerProperties, animation: tlFadeOut });
};
