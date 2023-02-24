export const NavButton = ({ scrollTo = ".section-hero", children }) => (
  <div>
    <button
      onClick={() =>
        document.querySelector(scrollTo).scrollIntoView({ behavior: "smooth" })
      }
    >
      <span>{children}</span>
    </button>
  </div>
);
