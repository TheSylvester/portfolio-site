import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const transitionToChromaGallery = () => {
  /* parallax scroll on the pic */
  ScrollTrigger.create({
    trigger: ".section-projects",
    start: "top top",
    end: "800 top",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: gsap.to(".chroma-gallery-pic", {
      yPercent: 0,
    }),
    scrub: true,
  });

  let tlTitleReveal = gsap.timeline({ paused: true });
  tlTitleReveal.fromTo(
    ".chroma-gallery-title",
    {
      opacity: 0,
    },
    {
      opacity: 1,
    }
  );

  ScrollTrigger.create({
    // trigger: ".chroma-gallery-title",
    // start: "top 75%",
    // end: "top center",
    trigger: ".pic-container",
    start: "top 100px",
    toggleActions: "play complete reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlTitleReveal,
    markers: true,
  });

  let tlParagraphReveal = gsap.timeline({ paused: true });
  tlParagraphReveal.fromTo(
    ".chroma-gallery-paragraph",
    {
      opacity: 0,
    },
    {
      opacity: 1,
    }
  );

  ScrollTrigger.create({
    trigger: ".chroma-gallery-paragraph",
    start: "top 75%",
    end: "top center",
    // pinnedContainer: ".chrome-gallery-title-container",
    toggleActions: "play complete reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlParagraphReveal,
  });

  /* shrink pic */
  let tlShrinkPic = gsap.timeline({ paused: true });
  tlShrinkPic
    .to(".chroma-gallery-pic", { scale: 0.7 })
    .to(".chroma-gallery-pic", { x: 300, y: 500 }, "<");

  ScrollTrigger.create({
    trigger: ".pic-container",
    start: "top 100",
    end: "top top",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlShrinkPic,
    scrub: 1,
  });
};
