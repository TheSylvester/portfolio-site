import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const siteAnimations = () => {
  /* center the hero elements on page load */
  const containerWidth = document.querySelector(".dev-container").offsetWidth;
  const frameWidth = document.querySelector(".dev-frame").offsetWidth;
  gsap.set(".dev-frame", {
    x: containerWidth / 2 - frameWidth / 2,
  });

  /* Hero Page animation */
  const tlHero = gsap.timeline({ paused: true });
  tlHero
    .to(".dev-frame", {
      x: "90",
      y: "41",
    })
    .to(
      ".dev-name",
      {
        fontSize: "37px",
        color: "var(--dark)",
      },
      "<"
    )
    .to(
      ".dev-title",
      {
        fontSize: "14px",
        color: "var(--darker)",
      },
      "<"
    )
    .to(
      ".down-arrow",
      {
        opacity: "0",
      },
      "<"
    )
    .to(
      ".down-arrow-container",
      {
        "--scrollerOpacity": "0",
        scale: 0,
        // ease: "expo.out",
      },
      "<"
    );

  /* triggers */
  ScrollTrigger.create({
    trigger: ".dev-container",
    scrub: true,
    start: "center center",
    end: "top",
    animation: tlHero,
  });

  ScrollTrigger.create({
    trigger: ".dev-container",
    start: "top top",
    end: "max",
    pin: true,
  });

  /* show tagline */

  const tlTaglineFadeIn = gsap.timeline({ paused: true });
  tlTaglineFadeIn
    .fromTo(
      ".tagline-container",
      {
        opacity: 1,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.in",
      }
    )
    .to(
      ".headshot",
      {
        opacity: 0.5,
        ease: "Expo.easeOut",
      },
      "<"
    );

  ScrollTrigger.create({
    trigger: ".section-revealTagline",
    start: "top bottom",
    end: "bottom center",
    scrub: true,
    animation: tlTaglineFadeIn,
  });

  /* zoom to white */
  const tlZoomTagline = gsap.timeline({ paused: true });
  tlZoomTagline
    .set(".tagline-container", {
      scale: "0",
      immediateRender: false,
    })
    .fromTo(
      ".tagline-container",
      {
        scale: "1",
        immediateRender: false,
      },
      {
        scale: "1.5",
        duration: 1,
        immediateRender: false,
      }
    ) // empty duration
    .fromTo(
      ".tagline-container",
      { scale: "1.5" },
      {
        duration: 1,
        scale: "400",
        ease: "circ.in",
        immediateRender: false,
      }
    )
    .set(".tagline-container", { scale: "0" })
    .set(".app-container", { backgroundColor: "var(--white)" });

  ScrollTrigger.create({
    trigger: ".section-zoomTagline",
    pin: ".tagline-container",
    animation: tlZoomTagline,
    start: "top center",
    end: "bottom top",
    scrub: true,
  });

  /* fade in recent projects */
  const tlProjectsHeaderFadeIn = gsap.timeline({ paused: true });
  tlProjectsHeaderFadeIn.fromTo(
    ".projects-fade-in",
    { opacity: "0" },
    {
      opacity: "1",
      stagger: {
        each: 0.4,
      },
      duration: 0.5,
    }
  );

  ScrollTrigger.create({
    trigger: ".section-projects",
    animation: tlProjectsHeaderFadeIn,
    toggleActions: "play complete reverse reverse",
    start: "-3px top",
    end: "top top",
  });

  /* slide down recent projects on scrub until fade out */
  const tlProjectsSlideDown = gsap.timeline({ paused: true });
  tlProjectsSlideDown.to(".projects-header", {
    y: "+=120",
    // opacity: 0,
  });

  ScrollTrigger.create({
    trigger: ".section-projects",
    animation: tlProjectsSlideDown,
    start: "top top",
    end: "center 100",
    scrub: true,
    immediateRender: false,
  });

  /* fade out Recent Projects */
  const tlProjectsFadeOut = gsap.timeline({ paused: true });
  tlProjectsFadeOut.to(".projects-header", {
    scale: "0.9",
    y: "+=50",
    opacity: "0",
    // duration: 0.2,
  });

  ScrollTrigger.create({
    trigger: ".section-projects",
    animation: tlProjectsFadeOut,
    toggleActions: "play complete reverse reverse",
    start: "center 101",
    end: "center top",
    scrub: true,
    immediateRender: false,
  });

  /* pin and slide ChromaGallery pic */
  const tlChromaGalleryPicSlide = gsap.timeline({ paused: true });
  tlChromaGalleryPicSlide.to(".chroma-gallery-pic", {
    x: () => window.innerWidth / 2 - 75,
    // window.innerWidth / 2 - gsap.getProperty(".chroma-gallery-pic", "width"),
  });

  ScrollTrigger.create({
    trigger: ".section-chromaGallery",
    animation: tlChromaGalleryPicSlide,
    toggleActions: "play complete reverse reverse",
    start: () =>
      -(gsap.getProperty(".chroma-gallery-pic", "height") / 3) - 75 + " 100", // "-75 100",
    end: "bottom top",
    pin: ".chroma-gallery-pic",
    immediateRender: false,
    markers: true,
  });
};
