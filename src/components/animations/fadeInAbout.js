import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const fadeIn = (
  target,
  triggerProperties,
  from = {
    xPercent: 0,
    yPercent: 0,
  }
) => {
  const tlFadeIn = gsap.timeline({ paused: true });
  const { xPercent, yPercent } = from;
  tlFadeIn.fromTo(
    target,
    {
      opacity: 0,
      xPercent,
      yPercent,
    },
    {
      opacity: 1,
      xPercent: 0,
      yPercent: 0,
      stagger: 0.1,
      duration: 1,
    }
  );

  ScrollTrigger.create({
    ...triggerProperties,
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlFadeIn,
  });
};

export const fadeInAbout = () => {
  fadeIn(
    ".about-frame > *",
    {
      trigger: ".section-about",
      start: "top 5%",
      end: "max",
      toggleActions: "play none reverse reverse",
    },
    { xPercent: 5, yPercent: 0 }
  );
};
