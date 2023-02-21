import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import chromaGalleryPic from "../assets/chromagallery_1920.png";
import chromaGalleryScreenshot from "../assets/chromagallery_screenshot.png";

gsap.registerPlugin(ScrollTrigger);

const PIC_STICK_OUT_RATIO = 40;

export function ProjectSection() {
  const projectsContainerRef = useRef(null);

  useLayoutEffect(() => {
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add(
      {
        isDesktop: "(min-width: 800px)",
        isMobile: "(max-width: 799px)",
      },
      () => {
        let tlProjectsReveal = gsap.timeline({ paused: true });
        tlProjectsReveal
          .fromTo(
            ".projects-header",
            {
              opacity: 0,
            },
            {
              opacity: 1,
            }
          )
          .fromTo(
            ".chroma-gallery-pic",
            { yPercent: 0 },
            {
              yPercent: -PIC_STICK_OUT_RATIO,
              ease: "elastic.out(1, 0.75)",
              delay: 0.1,
            },
            "<"
          );

        ScrollTrigger.create({
          trigger: ".projects-header",
          start: "center center",
          end: "top top",
          toggleActions: "play complete reverse reverse",
          invalidateOnRefresh: true,
          immediateRender: false,
          animation: tlProjectsReveal,
        });

        /* the pin */
        ScrollTrigger.create({
          trigger: ".projects-header",
          start: "center center",
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          immediateRender: false,
        });
        ScrollTrigger.create({
          trigger: ".projects-header",
          start: "center center",
          end: "top top",
          pin: ".pic-container",
          // pinSpacing: false,
          invalidateOnRefresh: true,
          immediateRender: false,
        });

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
          trigger: ".chroma-gallery-title",
          start: "top 75%",
          end: "top center",
          toggleActions: "play complete reverse reverse",
          invalidateOnRefresh: true,
          immediateRender: false,
          animation: tlTitleReveal,
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
          // pinnedContainer: ".chrome-gallery-title-container",
          // toggleActions: "play complete reverse reverse",
          invalidateOnRefresh: true,
          immediateRender: false,
          animation: tlShrinkPic,
          scrub: 1,
        });
      }
    );
  }, []);

  return (
    <section className={"section-projects"}>
      <h1 className={"projects-header"} ref={projectsContainerRef}>
        Recent Projects
      </h1>
      <div className={"pic-container"}>
        <img
          className={"chroma-gallery-pic"}
          src={chromaGalleryPic}
          alt="Chroma Gallery pic"
        />
      </div>

      {/*<div className={"chrome-gallery-title-container"}>*/}
      {/*  <h1 className={"chroma-gallery-title"}>Chroma Gallery</h1>*/}
      {/*</div>*/}
      <div className={"chrome-gallery-title-container"}>
        <h1 className={"chroma-gallery-title"}>Chroma Gallery</h1>
        <p className={"chroma-gallery-paragraph"}>
          Video gallery and file repository for Razer RGB lighting profiles
          collected from Reddit via REST API and analyzed for searchability
        </p>
      </div>
      <div className={"chroma-gallery-paragraph-container"}></div>
      <div className={"chroma-gallery-screenshot-container"}>
        <img
          src={chromaGalleryScreenshot}
          alt={"chroma gallery screenshot"}
          className={"chroma-gallery-screenshot"}
        />
      </div>
    </section>
  );
}
