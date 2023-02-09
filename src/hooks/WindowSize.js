import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useWindowSize() {
  /* useWindowSize */
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const resize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
    // added to fix mobile jittering gsap
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // end added
    // ScrollTrigger.refresh();   // let's not refresh scrolltrigger, mobile issues
    // ScrollTrigger.clearScrollMemory();
    // window.history.scrollRestoration = "manual";
    // console.log("Resized to: ", window.innerWidth, window.innerHeight);
    // window.location.reload(); // last resort
  };

  useEffect(() => {
    resize(); // initial setting of size MIGHT be required?
    // window.addEventListener("resize", () => setTimeout(resize, 500));
    window.addEventListener("resize", resize);
    return () => {
      // cleanup the event listener
      // window.removeEventListener("resize", () => setTimeout(resize, 500));
      window.removeEventListener("resize", resize);
    };
  }, [setSize]);

  return size;
}

export default useWindowSize;
