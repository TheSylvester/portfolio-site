import { useEffect } from "react";
import { wrap } from "../utilities/wrap";
import { clamp } from "../utilities/clamp";

const FONT_SIZE_MIN = 15;
const FONT_SIZE_MAX = 39;
const FONT_SIZE_MID_VW = window.innerWidth > 799 ? 3 : 5;
const LINE_HEIGHT = 1.2;

const LETTER_TRANSITION_DURATION_S = 1;
const DELAY_CHANGE_LETTER_S = 0.2;

const DELAY_SPACER_CHARACTER_SWAP_MS = 500;
const WIDTH_CHANGE_DURATION_MS = 2000;
const INTERVAL_DURATION_MS = 4500;

const COLOUR_HOT = "#EAEAEA";
const COLOUR_COLD = "#777777";

export const FlipBanner = ({ bannerText = [] }) => {
  useEffect(() => {
    /* get max # of characters and make each text string padded "_____STRING" */
    const maxLength = Math.max(...bannerText.map((word) => word.length));
    const paddedStrings = bannerText.map((word) =>
      word.toUpperCase().padStart(maxLength, " ")
    );

    const letters = " ABCDEFGHIJKLMNOPQRSTUVWXYZ-";
    //  font-size: clamp(15px, 3vw, 39px);
    const vw = Math.floor(window.innerWidth / 100);
    const fontSize = clamp(FONT_SIZE_MIN, FONT_SIZE_MID_VW * vw, FONT_SIZE_MAX);

    const changeWidth = (width) => {
      const elements = document.querySelectorAll(".character");
      elements.forEach((el) => (el.style.minWidth = `${width}px`));
    };

    const changeLetter = (pillarElement, char, index) => {
      /* slide the letter-pillar into place for the new char */
      const topPosition = fontSize * -letters.indexOf(char) * LINE_HEIGHT;
      pillarElement.style.transitionDelay =
        // 1 - index * 0.1 + DELAY_CHANGE_LETTER_S + "s";
        LETTER_TRANSITION_DURATION_S -
        (LETTER_TRANSITION_DURATION_S * index) / maxLength +
        DELAY_CHANGE_LETTER_S +
        "s";
      pillarElement.style.top = topPosition + "px";

      /* change the spacer element */
      const parent = pillarElement.parentElement;
      // delay required to not spaz out the box spacing prematurely
      setTimeout(
        () => (parent.querySelector(".character-spacer").textContent = char),
        DELAY_SPACER_CHARACTER_SWAP_MS
      );
    };

    const changeWord = (word) => {
      const elements = document.querySelectorAll(".letter-pillar");
      [...elements].forEach((el, i) => {
        changeLetter(el, word[i], i);
      });
    };

    const container = document.querySelector(".banner-container");
    container.style.setProperty("--fontSize", fontSize + "px");

    /* make [maxLength] boxes for characters */
    Array.from({ length: maxLength }).forEach(() => {
      const charDiv = document.createElement("div");
      charDiv.className = "character";
      document.querySelector(".banner-container").append(charDiv);

      /* make A-Z letter pillars that scroll into place to make the word */
      const pillar = document.createElement("div");
      pillar.className = "letter-pillar";
      const letterDivs = letters.split("").map((letter) => {
        const letterDiv = document.createElement("div");
        letterDiv.className = "letter";
        letterDiv.innerHTML = letter === " " ? "&nbsp;" : letter;
        return letterDiv;
      });
      pillar.append(...letterDivs);

      // add a div an invisible letter spacer to prevent collapse of spaces when min-width: 0
      const charSpacer = document.createElement("div");
      charSpacer.className = "character-spacer";
      charDiv.append(charSpacer);
      charDiv.append(pillar);
    });

    let wordIndex = 0;

    /* set the initial word */
    setTimeout(() => {
      changeColor(COLOUR_HOT);
      changeWord(paddedStrings[wordIndex]);
      setTimeout(() => changeColor(COLOUR_COLD), WIDTH_CHANGE_DURATION_MS);
    }, 100);

    const changeColor = (color) => {
      const elements = document.querySelectorAll(".letter-pillar");
      elements.forEach((el) => (el.style.color = color));
    };

    const interval = setInterval(() => {
      changeColor(COLOUR_HOT);
      changeWidth(fontSize * 0.8);
      wordIndex = wrap(wordIndex + 1, 0, paddedStrings.length);
      changeWord(paddedStrings[wordIndex]);
      setTimeout(() => {
        changeColor(COLOUR_COLD);
        changeWidth(Math.floor(fontSize / 5));
      }, WIDTH_CHANGE_DURATION_MS);
    }, INTERVAL_DURATION_MS);

    return () => clearInterval(interval);
  }, [bannerText]);

  return (
    <>
      <div className={"relative-anchor"}>
        <div className={"absolute-wrapper"}>
          <div className={"banner-container"}></div>
        </div>
      </div>
    </>
  );
};
