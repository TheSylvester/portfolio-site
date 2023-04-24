import { useScrollAnimations } from "../hooks/ScrollAnimations";
import { revealNavItems } from "./animations/revealNavItems";
import { NavButton } from "./NavButton";
import { highlightActiveSection } from "./animations/highlightActiveSection";
import { useModalContext } from "../contexts/ModalContext";
import { useState } from "react";

const TopNavBox = ({ onclick }) => {
  return (
    <div className={"nav-top-bar"} onClick={onclick}>
      <div className={"nav-logo"}>
        <span className={"nav-logo-letters"}>SW</span>
      </div>
    </div>
  );
};

const LeftNav = () => {
  const { showModalState, showModal, hideModal } = useModalContext();
  const isDesktop = window.innerWidth > 800 && window.innerHeight > 500;

  return (
    <ul className={"nav-items"}>
      {!isDesktop && (
        <li className={"nav-no-focus home"}>
          <NavButton scrollTo=".section-hero">home</NavButton>
        </li>
      )}
      <li className={"nav-no-focus projects"}>
        <NavButton scrollTo=".section-projects">projects</NavButton>
      </li>
      <li className={"nav-no-focus about"}>
        <NavButton scrollTo=".section-about">about</NavButton>
      </li>
      <li className={"nav-no-focus contact"}>
        <div>
          <button onClick={showModalState ? hideModal : showModal}>
            <span>contact</span>
          </button>
        </div>
      </li>
    </ul>
  );
};

export function Navbar({ animations = [] }) {
  useScrollAnimations(animations);

  const [mobileShowNav, setMobileShowNav] = useState(false);

  const scrollToTop = () =>
    document
      .querySelector(".section-hero")
      .scrollIntoView({ behavior: "smooth" });

  const closeNavOnClick = () => {
    console.log("triggered should remove");
    setMobileShowNav(false);
    document.removeEventListener("click", closeNavOnClick, true);
  };

  // const toggleNavMobile = () => {
  //   !mobileShowNav &&
  //     (document.addEventListener("click", closeNavOnClick, true) ||
  //       console.log("added"));
  //   setMobileShowNav((current) => !current);
  // };

  const isDesktop = window.innerWidth > 800 && window.innerHeight > 500;

  return (
    <nav className={"nav-root"}>
      <TopNavBox onclick={isDesktop ? scrollToTop : null} />
      {/*{(isDesktop || mobileShowNav) && <LeftNav />}*/}
      <LeftNav />
    </nav>
  );
}

export const AnimatedNavBar = () =>
  Navbar({
    animations: [revealNavItems, highlightActiveSection],
  });
