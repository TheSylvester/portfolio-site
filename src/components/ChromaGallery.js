import chromaGalleryPic from "../assets/chromagallery_1920.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useWindowSizeContext } from "../contexts/WindowSize";

gsap.registerPlugin(ScrollTrigger);

/* positioning constants */
const LEFT_NAV_PADDING = 100;
const PIC_OFF_CENTER_RATIO = 0.1;
const PIC_STICK_OUT_RATIO = 0.35;
const TOP_NAV_PADDING = 80;
const PIC_POPUP_DELAY = 0.7;

export function ChromaGallery() {
  const { width: windowWidth, height: windowHeight } = useWindowSizeContext();

  useLayoutEffect(() => {
    const centerPosition = (isDesktop) => {
      const containerWidth = gsap.getProperty(".chroma-gallery-pic", "width");

      return (
        windowWidth / 2 -
        (isDesktop ? LEFT_NAV_PADDING : 0) -
        containerWidth / 2 -
        containerWidth * PIC_OFF_CENTER_RATIO
      );
    };

    /* the right panel position of an L/R configuration */
    function rightPosition(isDesktop) {
      return windowWidth / 2 - (isDesktop ? LEFT_NAV_PADDING / 2 : 0);
    }

    function yPosition(isDesktop, isMobile) {
      return isMobile
        ? 100 /* fixed placement height of pic on mobile U/D config */
        : TOP_NAV_PADDING +
            (windowHeight -
              TOP_NAV_PADDING -
              gsap.getProperty(".chroma-gallery-pic", "height")) /
              2;
    }

    function animatePicProjectsPopup(isDesktop) {
      /* slide up pic at ProjectSection start */

      const tlSlidePicUp = gsap.timeline({ paused: true });
      tlSlidePicUp.fromTo(
        ".chroma-gallery-pic",
        {
          /* center first */
          x: () => centerPosition(isDesktop),
          y: () => 0,
        },
        {
          x: () => centerPosition(isDesktop),
          y: () =>
            gsap.getProperty(".chroma-gallery-pic", "height") *
            -PIC_STICK_OUT_RATIO,
          ease: "elastic.out(1, 0.75)",
          delay: PIC_POPUP_DELAY,
        }
      ); // end tlSlidePicUp

      ScrollTrigger.create({
        trigger: ".section-projects",
        start: "top top",
        end: "top top",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        immediateRender: false,
        animation: tlSlidePicUp,
      });
    }

    function animatePicToChromaGallery(isDesktop, isMobile) {
      const tlSlidePicAndReveal = gsap.timeline({ paused: true });
      tlSlidePicAndReveal
        .fromTo(
          ".chroma-gallery-pic",
          {
            x: () => centerPosition(isDesktop),
            y: () => yPosition(isDesktop, isMobile),
          },
          {
            x: () =>
              isMobile ? centerPosition(isDesktop) : rightPosition(isDesktop),
            y: () => yPosition(isDesktop, isMobile),
            delay: 0.1,
          }
        )
        .fromTo(".chroma-gallery-container", { opacity: 0 }, { opacity: 1 });

      const tlSlidePicDown = gsap.timeline({ paused: true });
      tlSlidePicDown.fromTo(
        ".chroma-gallery-pic",
        {
          x: () => centerPosition(isDesktop),
          y: () =>
            gsap.getProperty(".chroma-gallery-pic", "height") *
            -PIC_STICK_OUT_RATIO,
        },
        {
          x: () => centerPosition(isDesktop),
          y: () => yPosition(isDesktop, isMobile),
        }
      );

      ScrollTrigger.create({
        trigger: ".section-chromaGallery",
        start: "top bottom",
        end: "top top",
        onLeave: () => tlSlidePicAndReveal.play(0), // slide+fade animation after scrub animation
        onEnterBack: () =>
          gsap.set(".chroma-gallery-container", { opacity: 0 }), // hide text b4 reverse scrub
        scrub: true,
        invalidateOnRefresh: true,
        immediateRender: false,
        animation: tlSlidePicDown,
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
        let { isDesktop, isMobile } = context.conditions;

        animatePicProjectsPopup(isDesktop); // onLoad Recent ProjectSection page, pop up Pic
        animatePicToChromaGallery(isDesktop, isMobile); // transition from ProjectSection to Chroma Gallery
      }
    );
  }, [windowWidth, windowHeight]);

  return (
    <section className={"section-chroma-gallery"}>
      <div className={"pic-container"}>
        <img
          className={"chroma-gallery-pic"}
          src={chromaGalleryPic}
          alt="Chroma Gallery pic"
        />
      </div>
      <div className={"chroma-gallery-container"}>
        <div className={"chroma-gallery-title-container"}>
          <h1 className={"chroma-gallery-title"}>Chroma Gallery</h1>
        </div>
        <p className={"chroma-gallery-paragraph"}>
          Video gallery and file repository for Razer RGB lighting profiles
          collected from Reddit via REST API and analyzed for searchability
        </p>
        <h2 className={"chroma-gallery-subheading"}>Built With:</h2>
        <ul>
          <li>React</li>
          <li>NodeJS</li>
          <li>Express</li>
          <li>MongoDB</li>
        </ul>
        <div className={"chroma-gallery-footer"}>
          <a href={"https://www.reddit.com"}>front-end on GitHub</a> |{" "}
          <a href={"https://www.reddit.com"}>back-end on GitHub</a>
        </div>
      </div>
    </section>
  );
}
