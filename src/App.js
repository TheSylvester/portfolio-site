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
          <h1 className={"projects-header a"}>Recent Projects</h1>
          <img
            className={"chroma-gallery-pic a"}
            src={chromaGalleryPic}
            alt="Sylvester headshot pic"
          />
        </div>
      </section>
      <section className={"section-chromaGallery"}></section>
    </div>
  );
};

export default App;
