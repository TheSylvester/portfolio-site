import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const transitionToChromaGallery = () => {
  let tlTitleReveal = gsap.timeline({ paused: true });
  tlTitleReveal
    .fromTo(
      ".chroma-gallery-title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )
    .fromTo(
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
  tlShrinkPic
    .to(".chroma-gallery-pic", {
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
    })
    .to(".chroma-gallery-pic", {
      // opacity: 0,
    })
    .fromTo(".chroma-gallery-pic-sm", { opacity: 0 }, { opacity: 1 });

  /* reveal Chroma Gallery Title */
  /* pin pic */
  ScrollTrigger.create({
    trigger: ".pic-container",
    pin: true,
    pinSpacing: false,
    start: "top 100px",
    end: "bottom 100px",
    onLeave: () => tlShrinkPic.play(),
    onEnterBack: () => tlShrinkPic.reverse(),
    toggleActions: "play complete reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
  });

  /* pin & reveal title + paragraph */
  ScrollTrigger.create({
    trigger: ".pic-container",
    pin: ".chroma-gallery-container",
    start: "top 100px",
    end: "bottom 100px",
    toggleActions: "play complete reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlTitleReveal,
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
    trigger: ".chroma-gallery-container",
    start: "top center",
    // end: "+=30%",
    end: "top center",
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
    pinnedContainer: ".chroma-gallery-container",
    start: "center bottom",
    end: "+=30%",
    toggleActions: "play complete reverse reverse",
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlSlideInBuiltPanel,
  });
};
