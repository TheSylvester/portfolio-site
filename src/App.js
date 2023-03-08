import { AnimatedNavBar } from "./components/Navbar";

import { AnimatedHero } from "./components/Hero";
import { AnimatedTaglineCanvas } from "./components/TaglineCanvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { AnimatedProjectSection } from "./components/ProjectSection";
import { AnimatedPortfolioSection } from "./components/PortfolioSection";
import { AnimatedAboutSection } from "./components/AboutSection";
import { ModalProvider } from "./contexts/ModalContext";
import { ContactModal } from "./components/ContactModal";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <div className={"app-container"}>
      <ModalProvider Component={ContactModal}>
        <AnimatedHero />
        <AnimatedTaglineCanvas />
        <AnimatedProjectSection />
        <AnimatedPortfolioSection />
        <AnimatedAboutSection />
        <AnimatedNavBar />
      </ModalProvider>
    </div>
  );
};

export default App;
