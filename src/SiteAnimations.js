import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function animateHeroToTagline() {
  /* Shrink Name, Show Tagline */

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
    scrub: 1,
    start: "center center",
    end: "top",
    animation: tlHero,
  });

  ScrollTrigger.create({
    trigger: ".dev-container",
    start: "top top",
    end: "max",
    pin: true,
    pinSpacing: false,
  });

  /* show tagline */

  const tlTaglineFadeIn = gsap.timeline({ paused: true });
  tlTaglineFadeIn
    .fromTo(
      ".tagline-container",
      {
        scale: 0,
      },
      {
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
    immediateRender: false,
  });
}

function animateTaglineToProjects() {
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
    scrub: 1,
  });

  /* fade in recent projects */
  const tlProjectsHeaderFadeIn = gsap.timeline({ paused: true });
  tlProjectsHeaderFadeIn
    .fromTo(
      ".projects-header",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
      }
    )
    .fromTo(
      ".chroma-gallery-pic",
      {
        // x: () => gsap.getProperty(".chroma-gallery-pic", "width") / 2 - 65,
        x: () =>
          window.innerWidth / 2 -
          gsap.getProperty(".chroma-gallery-pic", "width") / 2 -
          65,
      },
      {
        y: "-33%",
      },
      "<"
    );

  ScrollTrigger.create({
    trigger: ".section-projects",
    animation: tlProjectsHeaderFadeIn,
    toggleActions: "play resume reverse reverse",
    start: "-3px top",
    end: "top top",
  });
}

function animateProjectsToChromaGallery() {
  /* parallax recent projects on scrub until fade out */
  const tlProjectsParallax = gsap.timeline({ paused: true });
  tlProjectsParallax
    .to(".projects-header", {
      y: () => window.innerHeight / 2 + 100,
      duration: 1,
    })
    .to(
      ".chroma-gallery-pic",
      {
        y: 165,
        duration: 1,
        onComplete: () => tlSlideChromaGalleryPic.play(),
      },
      "<"
    )
    .to(".projects-header", { opacity: 0, duration: 0.25 }, "0.75");

  ScrollTrigger.create({
    trigger: ".section-projects",
    animation: tlProjectsParallax,
    start: "top top",
    end: "bottom top",
    onEnterBack: () => tlSlideChromaGalleryPic.reverse(),
    scrub: true,
    immediateRender: false,
  });

  /* slide Chroma Gallery sideways and fade in the rest */

  const tlSlideChromaGalleryPic = gsap.timeline({ paused: true });
  tlSlideChromaGalleryPic
    .to(".chroma-gallery-pic", {
      x: () =>
        window.innerWidth -
        gsap.getProperty(".chroma-gallery-pic", "width") -
        (window.innerWidth / 2 -
          gsap.getProperty(".chroma-gallery-pic", "width")) /
          2,
    })
    .fromTo(".chroma-gallery-block", { opacity: 0 }, { opacity: 1 });
}

function animateInitialPage() {
  /* center the hero elements on page load */
  const containerWidth = document.querySelector(".dev-container").offsetWidth;
  const frameWidth = document.querySelector(".dev-frame").offsetWidth;
  gsap.set(".dev-frame", {
    x: containerWidth / 2 - frameWidth / 2,
  });
  let targets = gsap.utils.toArray(".show-on-load");
  gsap.fromTo(targets, { opacity: 0 }, { opacity: 1, stagger: 0.1 });
}

export const siteAnimations = () => {
  animateInitialPage();
  animateHeroToTagline(); // Shrink name, show tagline
  animateTaglineToProjects(); // zoom tagline, wipe screen white, fade in projects
  animateProjectsToChromaGallery();
};
