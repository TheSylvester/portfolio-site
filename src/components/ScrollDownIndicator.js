import { ReactComponent as DownArrow } from "../assets/down-arrow-7357.svg";

export function ScrollDownIndicator() {
  return (
    <div id="down-arrow" className={"down-arrow-container show-on-load"}>
      <DownArrow className={"down-arrow"} />
    </div>
  );
}
