import chromaGalleryPic from "../assets/chromagallery_1920.png";
import chromaGalleryScreenshot from "../assets/chromagallery_screenshot.png";
import { transitionToChromaGallery } from "./animations/transitionToChromaGallery";
import { revealProjectsTitleAndImage } from "./animations/revealProjectsTitleAndImage";
import { transitionToPortfolio } from "./animations/transitionToPortfolio";
import { useScrollAnimations } from "../hooks/ScrollAnimations";

export function ProjectSection({ animations = [] }) {
  useScrollAnimations(animations);

  return (
    <section className={"section-projects"}>
      <h1 className={"projects-header"}>Recent Projects</h1>
      <div className={"pic-container"}>
        <img
          className={"chroma-gallery-pic"}
          src={chromaGalleryPic}
          alt="Chroma Gallery pic"
        />
      </div>
      <div className={"chroma-gallery-container"}>
        <div className={"chroma-gallery-title-container"}>
          <a href={"https://razerchroma.gallery"}>
            <h1 className={"chroma-gallery-title"}>Chroma Gallery</h1>
          </a>
        </div>
        <p className={"chroma-gallery-paragraph"}>
          Video gallery and file repository for Razer RGB lighting profiles
          collected from Reddit via REST API and analyzed for searchability
        </p>
        <div className={"chroma-gallery-screenshot-container"}>
          <img
            src={chromaGalleryScreenshot}
            alt={"chroma gallery screenshot"}
            className={"chroma-gallery-screenshot"}
          />
          <div className={"chroma-gallery built-panel"}>
            <h3>&lt; Built with /&gt;</h3>
            <ul>
              <li>React</li>
              <li>NodeJS</li>
              <li>Express</li>
              <li>MongoDB</li>
            </ul>
            <a
              href={"https://github.com/TheSylvester/Kung-Fu-Lighting-frontend"}
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
}

export const AnimatedProjectSection = () => (
  <ProjectSection
    animations={[
      revealProjectsTitleAndImage,
      transitionToChromaGallery,
      transitionToPortfolio,
    ]}
  />
);
