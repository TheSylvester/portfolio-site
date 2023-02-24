import { AnimatedNavBar } from "./components/Navbar";

import { AnimatedHero } from "./components/Hero";
import { AnimatedTaglineCanvas } from "./components/TaglineCanvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { AnimatedProjectSection } from "./components/ProjectSection";
import { AnimatedPortfolioSection } from "./components/PortfolioSection";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <div className={"app-container"}>
      <AnimatedNavBar />
      <AnimatedHero />
      <AnimatedTaglineCanvas />
      <AnimatedProjectSection />
      <AnimatedPortfolioSection />
    </div>
  );
};

export default App;
