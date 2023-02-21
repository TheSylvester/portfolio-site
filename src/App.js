import { Navbar } from "./components/Navbar";

import { WindowSizeProvider } from "./contexts/WindowSize";
import useWindowSize from "./hooks/WindowSize";
import { AnimatedHero } from "./components/Hero";
import { AnimatedTaglineCanvas } from "./components/TaglineCanvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { AnimatedProjectSection } from "./components/ProjectSection";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const size = useWindowSize(); // to trigger a state change on resize

  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <div className={"app-container"}>
      <Navbar />
      <AnimatedHero />
      <AnimatedTaglineCanvas />
      <AnimatedProjectSection />
    </div>
  );
};

export default App;
