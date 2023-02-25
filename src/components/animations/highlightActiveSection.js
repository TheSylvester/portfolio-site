import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_NAMES = [
  {
    trigger: ".section-projects",
    endTrigger: ".section-portfolio",
    target: "projects",
  },
  {
    trigger: ".section-about",
    target: "about",
  },
];

export const highlightActiveSection = () => {
  /* light up sections when reached */

  const fadeTo = ({ target, color }) =>
    gsap.set(".nav-no-focus." + target, { color });

  SECTION_NAMES.forEach(({ trigger, endTrigger, target }) => {
    ScrollTrigger.create({
      trigger,
      endTrigger: endTrigger ?? trigger,
      start: "top bottom",
      end: "bottom bottom",
      onEnter: () => fadeTo({ target, color: "var(--white)" }),
      onLeave: () => fadeTo({ target, color: "var(--dark)" }),
      onEnterBack: () => fadeTo({ target, color: "var(--white)" }),
      onLeaveBack: () => fadeTo({ target, color: "var(--dark)" }),
    });
  });
};
