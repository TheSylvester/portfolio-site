import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const transitionToPortfolio = () => {
  /* transition to portfolio */

  // parallax pic container
  const tlParallaxChromaScreenshot = gsap.timeline({ paused: true });
  tlParallaxChromaScreenshot
    .to(".chroma-gallery-screenshot", {
      yPercent: -40,
      opacity: 0,
    })
    .to(
      ".chroma-gallery.built-panel",
      {
        yPercent: -50,
        opacity: 0,
      },
      "<"
    )
    .to(
      ".chroma-gallery-pic",
      {
        yPercent: -15,
        opacity: 0,
      },
      "<"
    );

  /* when the text block center reaches 25% from the top of the page */
  ScrollTrigger.create({
    // trigger: ".chroma-gallery-container",
    // endTrigger: ".chroma-gallery-screenshot-container",
    trigger: ".section-projects",
    start: "bottom 75%",
    end: "+=30%",
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlParallaxChromaScreenshot,
  });
};
