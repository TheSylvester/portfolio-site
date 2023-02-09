import { NameAndTitle } from "./NameAndTitle";
import { Headshot } from "./Headshot";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const LEFT_NAV_PADDING = 100;
const TOP_NAV_PADDING_DESKTOP = 35;
const TOP_NAV_PADDING_MOBILE = 25;
const TITLE_UNDERLINE_THICKNESS_RATIO = 0.11;
const HEADSHOT_FADE_OPACITY = 0.4;

const TITLE_UNDERLINE_COLOUR = "#9E9E9E";
export const Hero = () => {
  useLayoutEffect(() => {
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add(
      {
        isDesktop: "(min-width: 800px)",
        isTablet: "(min-width: 500px) and (max-width: 799px)",
        isMobile: "(max-width: 499px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        // use GSAP to set initial position of headshot because it's flickering on mobile
        // gsap.set(".headshot-container", {
        //   x: () =>
        //     isDesktop
        //       ? windowWidth / 2 + Math.min((windowWidth / 100) * 14, 200)
        //       : windowWidth / 2 -
        //         gsap.getProperty(".headshot-container", "width") / 2,
        //   y: () =>
        //     windowHeight / 2 -
        //     gsap.getProperty(".headshot-container", "height") / 2,
        // });

        /* slide Dev container to top left and fade headshot on scroll */
        const tlSlideDevContainer = gsap.timeline({ paused: true });
        tlSlideDevContainer
          .to(".dev-container", {
            x: () => LEFT_NAV_PADDING,
            y: () =>
              isDesktop ? TOP_NAV_PADDING_DESKTOP : TOP_NAV_PADDING_MOBILE,
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
          trigger: ".section-tagline",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          immediateRender: false,
          animation: tlSlideDevContainer,
        });

        /* pin the headshot container for 2 screens worth */
        ScrollTrigger.create({
          trigger: ".section-tagline",
          start: "top bottom",
          // end: "+=" + window.innerHeight * 2, // for 2 screens worth
          end: "+=200%", // trying a sort of fixed value
          pin: ".headshot-container",
          pinType: "fixed",
          pinSpacer: false, // test property
        });
      }
    );
    return () => mediaQuery.revert();
  }, []);

  return (
    <section className={"section-hero"}>
      <NameAndTitle />
      <Headshot />
    </section>
  );
};
