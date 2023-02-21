import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "../utilities/debounce";

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
    const resize_debounced = debounce(resize, 300);
    resize(); // initial setting of size MIGHT be required?
    // window.addEventListener("resize", resize_debounced);
    return () => {
      // cleanup the event listener
      // window.removeEventListener("resize", resize_debounced);
    };
  }, [setSize]);

  return size;
}

export default useWindowSize;
