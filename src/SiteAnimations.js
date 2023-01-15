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

  /* now zoom */
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

  /* just pin tagline for a sec */
  ScrollTrigger.create({
    trigger: ".section-zoomTagline",
    pin: ".tagline-container",
    animation: tlZoomTagline,
    start: "top center",
    end: "bottom top",
    scrub: true,
  });

  /* projects */
  const tlProjectsHeader = gsap.timeline({ paused: true });
  tlProjectsHeader.fromTo(
    ".a",
    { opacity: "0" },
    {
      opacity: "1",
      stagger: {
        each: 0.3,
      },
    }
  );

  ScrollTrigger.create({
    trigger: ".section-projects",
    animation: tlProjectsHeader,
    toggleActions: "play complete restart reverse",
    start: "-1px top",
    end: "bottom top",
  });
};
