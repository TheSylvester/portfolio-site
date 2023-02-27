import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_NAMES = [
  {
    trigger: ".section-hero",
    endTrigger: ".section-tagline",
    target: ".nav-logo-letters",
  },
  {
    trigger: ".section-projects",
    endTrigger: ".section-portfolio",
    target: "li.projects",
  },
  {
    trigger: ".section-about",
    target: "li.about",
  },
];

export const highlightActiveSection = () => {
  /* light up sections when reached */

  const fadeTo = ({ target, color }) => gsap.set(target, { color });

  SECTION_NAMES.forEach(({ trigger, endTrigger, target }) => {
    ScrollTrigger.create({
      trigger,
      endTrigger: endTrigger ?? trigger,
      start: "top center",
      end: endTrigger ? "bottom bottom" : "bottom max",
      onEnter: () => fadeTo({ target, color: "var(--white)" }),
      onLeave: () => fadeTo({ target, color: "var(--dark)" }),
      onEnterBack: () => fadeTo({ target, color: "var(--white)" }),
      onLeaveBack: () => fadeTo({ target, color: "var(--dark)" }),
    });
  });
};
