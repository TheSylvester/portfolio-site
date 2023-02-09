// import headshot from "../assets/headshot.png";
const headshot =
  "https://s.studiobinder.com/wp-content/uploads/2021/01/Best-black-and-white-portraits-by-Platon.jpg?resolution=2560,1";

export const Headshot = () => (
  <div className={"headshot-container"}>
    <img className={"headshot"} src={headshot} alt="Sylvester headshot pic" />
  </div>
);
