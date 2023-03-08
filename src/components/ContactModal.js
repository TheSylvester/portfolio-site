import { Modal } from "./Modal";
import githubMark from "../assets/github-mark.png";
import linkedInMark from "../assets/LI-In-Bug.png";

const EMAIL_ADDRESS = "sylvester@thesylvester.ca";
const MESSAGE_EMAIL_DEFAULT = "click to copy email address";
const MESSAGE_EMAIL_COPIED = "Copied!";

export const ContactModal = ({ shouldShow, onRequestClose }) => {
  const handleCopyEmail = () => {
    document.querySelector(".tooltip-text").textContent = MESSAGE_EMAIL_COPIED;
    navigator.clipboard.writeText(EMAIL_ADDRESS).then();
  };

  const resetEmailTooltip = () => {
    document.querySelector(".tooltip-text").textContent = MESSAGE_EMAIL_DEFAULT;
  };

  return (
    <Modal shouldShow={shouldShow} onRequestClose={onRequestClose}>
      <div className={"contact"}>
        <h1>&nbsp;&nbsp;Say hello! 👋</h1>
        <div>
          You can reach me at:{" "}
          <button onClick={handleCopyEmail} onMouseLeave={resetEmailTooltip}>
            <span className={"tooltip-text"}>click to copy email address</span>
            sylvester@thesylvester.ca
          </button>
        </div>
        <div>
          I'm also on:
          <div className={"socials"}>
            <a href={"https://www.linkedin.com/in/sylvester-wong-41552256/"}>
              <img src={linkedInMark} alt={"LinkedIn Logo"} />
              LinkedIn
            </a>
            <a href={"https://github.com/TheSylvester/"}>
              <img src={githubMark} alt={"GitHub Logo"} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
