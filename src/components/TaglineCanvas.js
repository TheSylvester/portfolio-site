import { animateTaglineCanvas } from "./animations/animateTaglineCanvas";
import { useScrollAnimations } from "../hooks/ScrollAnimations";

export const TaglineCanvas = ({ animations }) => {
  useScrollAnimations(animations);

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

export const AnimatedTaglineCanvas = () => (
  <TaglineCanvas animations={[animateTaglineCanvas]} />
);
