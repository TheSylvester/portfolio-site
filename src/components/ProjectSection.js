import chromaGalleryPic from "../assets/chromagallery_1920.png";
import chromaGalleryScreenshot from "../assets/chromagallery_screenshot.png";
import { AddScrollAnimations } from "../utilities/AddScrollAnimations";
import { transitionToChromaGallery } from "./animations/transitionToChromaGallery";
import { revealProjectsTitleAndImage } from "./animations/revealProjectsTitleAndImage";

export function ProjectSection() {
  return (
    <section className={"section-projects"}>
      <h1 className={"projects-header"}>Recent Projects</h1>
      <div className={"pic-container yellow-border"}>
        <img
          className={"chroma-gallery-pic"}
          src={chromaGalleryPic}
          alt="Chroma Gallery pic"
        />
      </div>

      <div className={"chrome-gallery-title-container"}>
        <h1 className={"chroma-gallery-title"}>Chroma Gallery</h1>
        <p className={"chroma-gallery-paragraph"}>
          Video gallery and file repository for Razer RGB lighting profiles
          collected from Reddit via REST API and analyzed for searchability
        </p>
      </div>
      <div className={"chroma-gallery-paragraph-container"}></div>
      <div className={"chroma-gallery-screenshot-container"}>
        <img
          src={chromaGalleryScreenshot}
          alt={"chroma gallery screenshot"}
          className={"chroma-gallery-screenshot"}
        />
      </div>
    </section>
  );
}

export const AnimatedProjectSection = () =>
  AddScrollAnimations({
    Component: ProjectSection,
    animations: [revealProjectsTitleAndImage, transitionToChromaGallery],
  });
