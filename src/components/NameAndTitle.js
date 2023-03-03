import { FlipBanner } from "./FlipBanner";

export function NameAndTitle() {
  return (
    <div className={"dev-container"}>
      <div className={"dev-frame"}>
        <h1 className={"dev-name"}>Sylvester Wong</h1>
        <h5 className={"dev-title"}>
          <FlipBanner
            bannerText={[
              "Full-Stack",
              "Front-End",
              "Javascript",
              "React",
              "Mongo DB",
              "Unity Game",
            ]}
          />
          <div>&nbsp;Developer</div>
        </h5>
      </div>
    </div>
  );
}
