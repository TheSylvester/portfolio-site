import { useLayoutEffect } from "react";
import { gsap } from "gsap";

const isDesktop = "(min-width: 800px)";
const isMobile = "(max-width: 799px)";
const isTablet = "(min-width: 500px) and (max-width: 799px)";

export const AddScrollAnimations = ({ Component, animations = [] }) => {
  useLayoutEffect(() => {
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add(
      {
        isDesktop,
        isTablet,
        isMobile,
      },
      (context) => {
        const { isDesktop, isTablet, isMobile } = context.conditions;

        animations.forEach((animation) => {
          animation({
            isDesktop,
            isTablet,
            isMobile,
          }); /* load / register every animation passed in */
        });
      }
    );
    return () => mediaQuery.revert();
  }, [animations]);
  return <Component />;
};
