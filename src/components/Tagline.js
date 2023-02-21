import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { CustomEase } from "gsap/CustomEase";
// import { useWindowSizeContext } from "../contexts/WindowSize";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const ZOOM_TEXT_WIPE_SCALE_MAX = 400;
const ZOOM_TEXT_WIPE_DURATION = 1.5;
const TAGLINE_INFLATE_POINT = 0.5; // inverse; when to start scaling up Tagline

export function Tagline() {
  const taglineContainerRef = useRef(null);
  // const { width: windowWidth, height: windowHeight } = useWindowSizeContext();
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  useLayoutEffect(() => {
    const centerX = (ref) =>
      windowWidth / 2 - gsap.getProperty(ref.current, "width") / 2;

    const centerY = (ref) =>
      windowHeight / 2 - gsap.getProperty(ref.current, "height") / 2;

    function animateSlideInTagline(taglineContainerRef) {
      /* slide in Tagline from bottom of screen */
      let tlSlideTaglineContainer = gsap.timeline({ paused: true });
      tlSlideTaglineContainer.fromTo(
        taglineContainerRef.current,
        {
          scale: 0.01, // smallest form (before reveal)
          x: () => centerX(taglineContainerRef),
          y: () => centerY(taglineContainerRef),
        },
        {
          x: () => centerX(taglineContainerRef),
          y: () => centerY(taglineContainerRef),
          scale: () => 1,
          duration: TAGLINE_INFLATE_POINT,
          ease: "power2.in",
        },
        `-=${TAGLINE_INFLATE_POINT}`
      );

      ScrollTrigger.create({
        trigger: ".section-tagline",
        start: "top bottom",
        end: "top top",
        scrub: true, // was 1
        // invalidateOnRefresh: true,
        immediateRender: false,
        animation: tlSlideTaglineContainer,
      });
    }

    function animateZoomTaglineToWhite(taglineContainerRef) {
      let tlZoomTaglineToWhite = gsap.timeline({ paused: true });
      tlZoomTaglineToWhite
        .fromTo(
          taglineContainerRef.current,
          { scale: 1 },
          {
            duration: ZOOM_TEXT_WIPE_DURATION,
            scale: ZOOM_TEXT_WIPE_SCALE_MAX,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.656,0 0.656,0.006 0.746,0.074 0.915,0.201 0.786,0.856 1,1 "
            ),
            immediateRender: false,
          }
        )
        .set(".section-projects", { backgroundColor: "var(--white)" })
        .set(taglineContainerRef.current, { scale: 0 });

      /* pin the tagline for the zoom animation, until past recent projects? */
      ScrollTrigger.create({
        trigger: ".section-projects",
        pin: ".tagline-wrapper",
        pinSpacing: false,
        pinType: "fixed",
        // anticipatePin: 1,
        start: "top bottom",
        // end: "+=" + windowHeight * 2,
        end: "+=200%",
      });

      ScrollTrigger.create({
        trigger: ".section-projects",
        start: "top bottom",
        end: "top top",
        animation: tlZoomTaglineToWhite,
        scrub: ZOOM_TEXT_WIPE_DURATION,
        snap: [0, 1],
      });
    }

    const mediaQuery = gsap.matchMedia();
    mediaQuery.add(
      {
        isDesktop: "(min-width: 800px)",
        isTablet: "(min-width: 500px) and (max-width: 799px)",
        isMobile: "(max-width: 499px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        isDesktop && animateSlideInTagline(taglineContainerRef);
        animateZoomTaglineToWhite(taglineContainerRef);
      }
    );

    return () => mediaQuery.revert();
  }, [windowWidth, windowHeight]);

  return (
    <section className={"section-tagline"}>
      <div className={"tagline-wrapper"}>
        <div ref={taglineContainerRef} className={"tagline-container"}>
          <p className={"tagline"}>
            <span className={"tagline-dark"}>I build</span>{" "}
            <span className={"tagline-bold"}>full stack</span>
            <br />
            <span className={"tagline-thin"}>web applications</span>{" "}
            <span className={"tagline-small"}>with</span>
            <br />
            <span className={"tagline-bold"}>aesthetic</span>{" "}
            <span className={"tagline-thin"}>designs,</span>
            <br />
            <span className={"tagline-bold"}>clean</span>{" "}
            <span className={"tagline-thin"}>code, </span>
            <span className={"tagline-small"}>and</span>
            <br />
            <span className={"tagline-bold"}>lots</span>{" "}
            <span className={"tagline-small"}>of</span>{" "}
            <span className={"tagline-bold"}>love</span>{" "}
            <span style={{ color: "red" }}>❤</span>
          </p>
        </div>
      </div>
    </section>
  );
}
