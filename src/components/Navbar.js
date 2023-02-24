import { useScrollAnimations } from "../hooks/ScrollAnimations";
import { revealNavItems } from "./animations/revealNavItems";
import { NavButton } from "./NavButton";

const TopNavBlackBar = () => (
  <div className={"nav-top-bar"}>
    <Logo />
  </div>
);

function LeftNav() {
  return (
    <ul className={"nav-items"}>
      <li className={"nav-no-focus"}>
        <NavButton scrollTo=".section-projects">projects</NavButton>
      </li>
      <li className={"nav-no-focus"}>
        <NavButton scrollTo=".section-projects">about</NavButton>
      </li>
      <li className={"nav-no-focus"}>
        <NavButton scrollTo=".section-projects">contact</NavButton>
      </li>
    </ul>
  );
}

const Logo = () => (
  <div
    className={"nav-logo"}
    onClick={() =>
      document
        .querySelector(".section-hero")
        .scrollIntoView({ behavior: "smooth" })
    }
  >
    <span className={"nav-logo-letters nav-focus"}>SW</span>
  </div>
);

export function Navbar({ animations = [] }) {
  useScrollAnimations(animations);

  return (
    <nav className={"nav-root"}>
      <TopNavBlackBar />
      {window.innerWidth > 800 && window.innerHeight > 500 && <LeftNav />}
    </nav>
  );
}

export const AnimatedNavBar = () =>
  Navbar({
    animations: [revealNavItems],
  });
