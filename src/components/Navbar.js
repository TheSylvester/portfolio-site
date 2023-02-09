const TopNavBlackBar = () => (
  <div className={"nav-top-bar"}>
    <Logo />
  </div>
);

function LeftNav() {
  return (
    <ul className={"nav-items"}>
      <li className={"nav-no-focus"}>
        <div>
          <button>
            <span>projects</span>
          </button>
        </div>
      </li>
      <li className={"nav-no-focus"}>
        <div>
          <button>
            <span>about</span>
          </button>
        </div>
      </li>
      <li className={"nav-no-focus"}>
        <div>
          <button>
            <span>contact</span>
          </button>
        </div>
      </li>
    </ul>
  );
}

const Logo = () => (
  <div className={"nav-logo"}>
    {/*<span className={"nav-logo-bracket nav-no-focus"}>[</span>*/}
    <span className={"nav-logo-letters nav-focus"}>SW</span>
    {/*<span className={"nav-logo-bracket nav-no-focus"}>]</span>*/}
  </div>
);

export function Navbar() {
  // const windowSize = useWindowSizeContext();

  // useEffect(() => {
  //   // gsap.utils.toArray(".nav-logo, nav-items > li");
  //   gsap.fromTo(
  //     ".nav-logo, .nav-items > li",
  //     { opacity: 0 },
  //     {
  //       opacity: 1,
  //       // stagger: 0.1,
  //       duration: 1,
  //     }
  //   );
  // }, []);

  return (
    <nav className={"nav-root"}>
      <TopNavBlackBar />
      {/*{windowSize.width > 800 && windowSize.height > 500 && <LeftNav />}*/}
      {window.innerWidth > 800 && window.innerHeight > 500 && <LeftNav />}
    </nav>
  );
}
