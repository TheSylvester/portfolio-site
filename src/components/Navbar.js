import { useScrollAnimations } from "../hooks/ScrollAnimations";
import { revealNavItems } from "./animations/revealNavItems";
import { NavButton } from "./NavButton";
import { highlightActiveSection } from "./animations/highlightActiveSection";
import { useModalContext } from "../contexts/ModalContext";

const TopNavBox = () => (
  <div className={"nav-top-bar"}>
    <Logo />
  </div>
);

const LeftNav = () => {
  const { showModalState, showModal, hideModal } = useModalContext();

  return (
    <ul className={"nav-items"}>
      <li className={"nav-no-focus projects"}>
        <NavButton scrollTo=".section-projects">projects</NavButton>
      </li>
      <li className={"nav-no-focus about"}>
        <NavButton scrollTo=".section-about">about</NavButton>
      </li>
      <li className={"nav-no-focus contact"}>
        {/*<NavButton scrollTo=".section-about">contact</NavButton>*/}
        <div>
          <button onClick={showModalState ? hideModal : showModal}>
            <span>contact</span>
          </button>
        </div>
      </li>
    </ul>
  );
};

const Logo = () => (
  <div
    className={"nav-logo"}
    onClick={() =>
      document
        .querySelector(".section-hero")
        .scrollIntoView({ behavior: "smooth" })
    }
  >
    <span className={"nav-logo-letters"}>SW</span>
  </div>
);

export function Navbar({ animations = [] }) {
  useScrollAnimations(animations);

  return (
    <nav className={"nav-root"}>
      <TopNavBox />
      {window.innerWidth > 800 && window.innerHeight > 500 && <LeftNav />}
    </nav>
  );
}

export const AnimatedNavBar = () =>
  Navbar({
    animations: [revealNavItems, highlightActiveSection],
  });
