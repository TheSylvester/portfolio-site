import { gsap } from "gsap";

export const staggeredReveal = (targets) =>
  gsap.fromTo(
    targets,
    { opacity: 0 },
    {
      opacity: 1,
      stagger: 0.1,
      duration: 1,
    }
  );
