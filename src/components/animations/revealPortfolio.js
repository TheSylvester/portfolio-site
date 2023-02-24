import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const revealPortfolio = () => {
  // show the portfolio items
  const tlRevealPortfolio = gsap.timeline({ paused: true });
  const randomRange = () => Math.floor(Math.random() * 30 - 15);
  tlRevealPortfolio.fromTo(
    // ".portfolio-frame h1",
    ".portfolio-frame > *",
    {
      opacity: 0,
      xPercent: randomRange,
    },
    {
      opacity: 1,
      xPercent: 0,
      stagger: 0.3,
    }
  );

  /* Reveal when cross threshold (prev page disappears) */
  ScrollTrigger.create({
    trigger: ".section-portfolio",
    start: "top 75%",
    end: "top center",
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlRevealPortfolio,
  });
};
