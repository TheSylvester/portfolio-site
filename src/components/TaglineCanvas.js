import { AddScrollAnimations } from "../utilities/AddScrollAnimations";
import { animateTaglineCanvas } from "./animations/animateTaglineCanvas";

export const TaglineCanvas = () => {
  return (
    <section className={"section-tagline"}>
      <canvas
        id="taglineCanvas"
        className={"tagline-canvas"}
        width={`${window.innerWidth}`}
        height={`${window.innerHeight}`}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </section>
  );
};

export const AnimatedTaglineCanvas = () =>
  AddScrollAnimations({
    Component: TaglineCanvas,
    animations: [animateTaglineCanvas],
  });
