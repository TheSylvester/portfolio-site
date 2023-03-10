import portfolioScreenshot from "../assets/portfolio-screenshot.png";
import { revealPortfolio } from "./animations/revealPortfolio";
import { useScrollAnimations } from "../hooks/ScrollAnimations";
import { fadeToBlack } from "./animations/fadeToBlack";

export const PortfolioSection = ({ animations }) => {
  useScrollAnimations(animations);
  return (
    <section className={"section-portfolio"}>
      <div className={"portfolio-container"}>
        <div className={"portfolio-frame"}>
          <h1>
            <span>The</span>
            <span>Sylvester.ca</span>
          </h1>
          <p>
            Personal portfolio website showcasing front-end development and
            other full-stack projects
          </p>
          <img
            src={portfolioScreenshot}
            alt={"TheSylvester.ca Portfolio Screenshot"}
            className={"portfolio-screenshot"}
          />
          <div className={"portfolio built-panel"}>
            <h3>&lt; Built with /&gt;</h3>
            <ul>
              <li>React</li>
              <li>GSAP</li>
              <li>ScrollTrigger</li>
              <li>HTML Canvas</li>
            </ul>
            <a
              href={"https://github.com/TheSylvester/portfolio-site"}
              target={"_blank"}
              rel={"noreferrer"}
            >
              source on Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AnimatedPortfolioSection = () => (
  <PortfolioSection animations={[revealPortfolio, fadeToBlack]} />
);
