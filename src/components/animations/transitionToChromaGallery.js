import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const transitionToChromaGallery = () => {
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

  let tlParagraphReveal = gsap.timeline({ paused: true });
  tlParagraphReveal.fromTo(
    ".chroma-gallery-paragraph",
    {
      opacity: 0,
      yPercent: 15,
    },
    {
      opacity: 1,
      yPercent: 0,
    }
  );

  /* shrink pic */
  let tlShrinkPic = gsap.timeline({ paused: true });
  tlShrinkPic.to(".chroma-gallery-pic", {
    scale: 0.5,
    x: () => {
      const currentX = document
        .querySelector(".chroma-gallery-pic")
        .getBoundingClientRect().x;
      const blockRight = document
        .querySelector(".chroma-gallery-container")
        .getBoundingClientRect().right;
      return -currentX + blockRight + window.innerWidth * 0.01;
    },
    y: () => "60%",
  });

  ScrollTrigger.create({
    trigger: ".pic-container",
    start: "top top",
    // end: "bottom 100px",
    end: "top top",
    animation: tlShrinkPic,
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
  });

  /* reveal title */
  ScrollTrigger.create({
    trigger: ".chroma-gallery-title-container",
    start: "top 75%",
    end: "top 75%",
    // end: "top center",
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlTitleReveal,
  });

  /* reveal paragraph */
  ScrollTrigger.create({
    trigger: ".chroma-gallery-paragraph",
    start: "center 75%",
    end: "center 75%",
    // end: "top center",
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlParagraphReveal,
  });

  const tlRevealScreenshot = gsap.timeline({ paused: true });
  tlRevealScreenshot.fromTo(
    ".chroma-gallery-screenshot",
    {
      opacity: 0,
      yPercent: 15,
    },
    {
      opacity: 1,
      yPercent: 0,
    }
  );

  ScrollTrigger.create({
    trigger: ".chroma-gallery-screenshot-container",
    start: "top 75%",
    end: "top 75%",
    // end: "top center",
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlRevealScreenshot,
  });

  const tlSlideInBuiltPanel = gsap.timeline({ paused: true });
  tlSlideInBuiltPanel.fromTo(
    ".chroma-gallery.built-panel",
    {
      opacity: 0,
      xPercent: 15,
    },
    {
      opacity: 1,
      xPercent: 0,
    }
  );

  ScrollTrigger.create({
    trigger: ".chroma-gallery.built-panel",
    // pinnedContainer: ".chroma-gallery-container",
    start: "center bottom",
    end: "center bottom",
    // end: "+=30%",
    toggleActions: "play none reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlSlideInBuiltPanel,
  });
};
