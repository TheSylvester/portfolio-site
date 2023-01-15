export function Navbar() {
  return (
    <nav className={"nav-desktop"}>
      <div className={"nav-top-bar"}></div>
      <ul className={"flex flex-col align-center"}>
        <li className={"nav-logo"}>
          <span className={"nav-logo-bracket nav-no-focus"}>[</span>
          <span className={"nav-logo-letters nav-focus"}>SW</span>
          <span className={"nav-logo-bracket nav-no-focus"}>]</span>
        </li>
        <li className={"nav-item-vertical nav-no-focus"}>
          <div>work</div>
        </li>
        <li className={"nav-item-vertical nav-no-focus"}>
          <div>about</div>
        </li>
        <li className={"nav-item-vertical nav-no-focus"}>
          <div>contact</div>
        </li>
      </ul>
    </nav>
  );
}
