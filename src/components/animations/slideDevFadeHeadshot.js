/* slide Dev container to top left and fade headshot on scroll */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

const LEFT_NAV_PADDING = 100;
const TOP_NAV_PADDING_DESKTOP = 35;
const TOP_NAV_PADDING_MOBILE = 25;
const TITLE_UNDERLINE_THICKNESS_RATIO = 0.11;
const HEADSHOT_FADE_OPACITY = 0.4;

const TITLE_UNDERLINE_COLOUR = "#9E9E9E";

export const slideDevFadeHeadshot = ({ isDesktop }) => {
  const tlSlideDevContainer = gsap.timeline({ paused: true });
  tlSlideDevContainer
    .to(".dev-container", {
      x: () => LEFT_NAV_PADDING,
      y: () => (isDesktop ? TOP_NAV_PADDING_DESKTOP : TOP_NAV_PADDING_MOBILE),
      scale: () =>
        gsap.getProperty(".nav-logo-letters", "fontSize") /
        gsap.getProperty(".dev-name", "fontSize"),
      duration: 1,
      transformOrigin: "left top",
      ease: "slow.in",
    })
    .to(
      ".dev-title",
      {
        scaleY: () => TITLE_UNDERLINE_THICKNESS_RATIO,
        transformOrigin: "left top",
        backgroundColor: TITLE_UNDERLINE_COLOUR,
      },
      "<"
    )
    .to(
      ".headshot",
      {
        opacity: HEADSHOT_FADE_OPACITY,
      },
      "<"
    );

  ScrollTrigger.create({
    trigger: ".section-hero",
    start: "bottom bottom",
    end: "bottom top",
    scrub: 1,
    invalidateOnRefresh: true,
    immediateRender: false,
    animation: tlSlideDevContainer,
  });
};
