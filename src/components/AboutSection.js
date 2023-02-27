import { useScrollAnimations } from "../hooks/ScrollAnimations";
import bioPic from "../assets/pic-bio-1200p.png";
import astraPic from "../assets/astra1.png";
import lunaPic from "../assets/luna-pic-1200p.png";
import { fadeInAbout } from "./animations/fadeInAbout";

export const AboutSection = ({ animations }) => {
  useScrollAnimations(animations);
  return (
    <section className={"section-about"}>
      <div className={"about-frame"}>
        <div className={"about-grid pic"}>
          <img className={"bio-pic"} src={bioPic} alt={"Sylvester bio pic"} />
        </div>
        <div className={"about-grid canvas"}></div>
        <div className={"about-grid animal-pics"}>
          <img
            className={"luna-pic"}
            src={lunaPic}
            alt={"Luna the German Shepherd"}
          />
          <img
            className={"astra-pic"}
            src={astraPic}
            alt={"Astra the black kitten"}
          />
        </div>
        <div className={"about-grid paragraph-1"}>
          <p>
            Hi 👋. I'm <em>Sylvester Wong</em>, a full stack web developer from
            Toronto with a passion for technology, video games, and furry
            friends.
            <br /> <span className={"red-heart"}>♥</span> 🎮 🐱 🐶
          </p>
        </div>
        <div className={"about-grid paragraph-2"}>
          <p>
            When I'm not building web apps and learning new things, I spend my
            free time mastering video games, playing fetch with the cat, and
            touching grass with the dog.
          </p>
        </div>
        <div className={"about-grid paragraph-3"}>
          <p>
            If you’re looking for a friendly Full-Stack developer with
            experience in Javascript or Unity 3D, I got you! 🙂 👍
          </p>
        </div>
        <div className={"about-grid bottom-spacer"}></div>
      </div>
    </section>
  );
};

export const AnimatedAboutSection = () => (
  <AboutSection animations={[fadeInAbout]} />
);
