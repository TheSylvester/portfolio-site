import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
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
        tlProjectsReveal.fromTo(
          projectsContainerRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            delay: 0.3,
          }
        );

        ScrollTrigger.create({
          trigger: ".section-projects",
          start: "top top",
          end: "top top",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          immediateRender: false,
          animation: tlProjectsReveal,
        });
      }
    );
  });

  return (
    <section className={"section-projects"}>
      <div className={"projects-container"}>
        <h1 className={"projects-header"} ref={projectsContainerRef}>
          Recent Projects
        </h1>
      </div>
    </section>
  );
}
