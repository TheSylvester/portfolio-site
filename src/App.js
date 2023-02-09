import { Navbar } from "./components/Navbar";

import { WindowSizeProvider } from "./contexts/WindowSize";
import useWindowSize from "./hooks/WindowSize";
import { Hero } from "./components/Hero";
import { Tagline } from "./components/Tagline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Projects } from "./components/Projects";
import { ChromaGallery } from "./components/ChromaGallery";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const size = useWindowSize(); // to trigger a state change on resize

  // ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <div className={"app-container"}>
      <WindowSizeProvider value={size}>
        <Navbar />
        <Hero />
        {/*<ScrollDownIndicator />*/}
        <Tagline />
        <Projects />
        <ChromaGallery />
        {/*<section style={{ height: "500vh", scrollSnapAlign: "start" }}>*/}
        {/*  <h1>Next Section</h1>*/}
        {/*</section>*/}
      </WindowSizeProvider>
    </div>
  );
};

export default App;
