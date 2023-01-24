import { Navbar } from "./components/Navbar";
import { NameAndTitle } from "./components/NameAndTitle";
import { Headshot } from "./components/Headshot";
import { ScrollDownIndicator } from "./components/ScrollDownIndicator";
import { Tagline } from "./components/Tagline";
import { siteAnimations } from "./SiteAnimations";

import { useEffect } from "react";
import chromaGalleryPic from "./assets/chromagallery_1920.png";

const App = () => {
  useEffect(() => {
    window.addEventListener("resize", (event) => {});
    document.fonts.ready.then(siteAnimations);
  }, []);

  return (
    <div className={"app-container"}>
      <Navbar />
      <section className={"section-hero"}>
        <NameAndTitle />
        <Headshot />
        <ScrollDownIndicator />
      </section>
      {/* tagline */}
      <section className={"section-revealTagline"}>
        <Tagline />
      </section>
      <section className={"section-zoomTagline"}></section>
      {/* work */}
      <section className={"section-projects"}>
        <div className={"projects-container"}>
          <h1 className={"projects-header projects-fade-in"}>
            Recent Projects
          </h1>
        </div>
      </section>
      <section className={"section-chromaGallery"}>
        <img
          className={"chroma-gallery-pic projects-fade-in"}
          src={chromaGalleryPic}
          alt="Chroma Gallery pic"
        />
        <div className={"chroma-gallery-block"}>
          <h1 className={"chroma-gallery-title"}>Chroma Gallery</h1>
          <p className={"chroma-gallery-paragraph"}>
            Video gallery and file repository for Razer RGB lighting profiles
            collected from Reddit via REST API and analyzed for searchability
          </p>
          <h2 className={"chroma-gallery-subheading"}>Built With:</h2>
          <ul>
            <li>React</li>
            <li>NodeJS</li>
            <li>Express</li>
            <li>MongoDB</li>
          </ul>
          <div className={"chroma-gallery-footer"}>
            <a href={"https://www.reddit.com"}>visit page</a> |{" "}
            <a href={"https://www.reddit.com"}>source on Github</a>
          </div>
        </div>
      </section>
      <section style={{ height: "500vh", scrollSnapAlign: "start" }}>
        <h1>Next Section</h1>
      </section>
    </div>
  );
};

export default App;
