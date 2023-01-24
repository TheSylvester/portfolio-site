// import headshot from "../assets/headshot.png";
const headshot =
  "https://s.studiobinder.com/wp-content/uploads/2021/01/Best-black-and-white-portraits-by-Platon.jpg?resolution=2560,1";

export function Headshot() {
  return (
    <img
      className={"headshot show-on-load"}
      src={headshot}
      alt="Sylvester headshot pic"
    />
  );
}
