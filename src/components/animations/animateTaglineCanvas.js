import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useState } from "react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const containerWidth = 353;
const containerHeight = 264;
const nudgeX = 12.5;
const nudgeY = 30;
const SCALE_MAX = 200;
const SCALE_LINEAR_BOOST_TO = 0.0;
const dark = "#9E9E9E";
const white = "#EAEAEA";

let startScale = () =>
  Math.min(
    (window.innerWidth * 0.7) / containerWidth,
    (window.innerHeight * 0.5) / containerHeight,
    1
  );

/* Draws the whole Tagline on the screen */
function draw({ context, canvas, startX, startY, scale }) {
  context.save();
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);
  // context.scale(scale, scale);

  context.setTransform(
    scale,
    0,
    0,
    scale,
    (-(scale - 1) * canvas.width) / 2,
    (-(scale - 1) * canvas.height) / 2
  );

  // set letterSpacing only if feature is available
  !!context.letterSpacing && (context.letterSpacing = "-2px");

  // Writes a word to canvas, returns pixel width of word
  function writeWord({ text, x, y, font, colour }) {
    context.font = font;
    context.fillStyle = colour;
    context.fillText(text, x, y);
    return context.measureText(text).width;
  }

  /* writes words in a line, each word is measured, properly spaced from the previous */
  /* returns total line width in pixels */
  const writeLine = (words) =>
    words.reduce(
      (currentX, word) => currentX + writeWord({ ...word, x: currentX }),
      startX
    );

  writeLine([
    {
      text: "I build ",
      x: startX,
      y: startY,
      font: "40px Montserrat",
      colour: dark,
    },
    {
      text: "full stack",
      x: startX,
      y: startY,
      font: "800 40px Montserrat",
      colour: white,
    },
  ]);
  writeLine([
    {
      text: "web applications ",
      x: startX,
      y: startY + 56,
      font: "40px Montserrat",
      colour: white,
    },
    {
      text: "with",
      x: startX,
      y: startY + 56,
      font: "20px Montserrat",
      colour: dark,
    },
  ]);
  writeLine([
    {
      text: "aesthetic ",
      x: startX,
      y: startY + 112,
      font: "800 40px Montserrat",
      colour: white,
    },
    {
      text: "designs",
      x: startX,
      y: startY + 112,
      font: "40px Montserrat",
      colour: white,
    },
  ]);
  writeLine([
    {
      text: "clean ",
      x: startX,
      y: startY + 168,
      font: "bold 40px Montserrat",
      colour: white,
    },
    {
      text: "code, ",
      x: startX,
      y: startY + 168,
      font: "40px Montserrat",
      colour: white,
    },
    {
      text: "and",
      x: startX,
      y: startY + 168,
      font: "20px Montserrat",
      colour: dark,
    },
  ]);
  writeLine([
    {
      text: "lots ",
      x: startX,
      y: startY + 224,
      font: "bold 40px Montserrat",
      colour: white,
    },
    {
      text: "of ",
      x: startX,
      y: startY + 224,
      font: "20px Montserrat",
      colour: dark,
    },
    {
      text: " love ",
      x: startX,
      y: startY + 224,
      font: "bold 40px Montserrat",
      colour: white,
    },
    {
      text: "❤ ",
      x: startX,
      y: startY + 224,
      font: "bold 40px Montserrat",
      colour: "#FF0000",
    },
  ]);

  context.restore();
}

/* Draws Tagline in Center of Canvas */
const drawInCenter = (context, canvas, scale = startScale()) => {
  const isLetterSpacingSupported = !!context.letterSpacing;

  const adjustForLetterSpacing = isLetterSpacingSupported ? 0 : -16; // -2 x 8chars

  console.log(isLetterSpacingSupported);

  draw({
    context,
    canvas,
    startX:
      canvas.width / 2 - containerWidth / 2 + nudgeX + adjustForLetterSpacing,
    startY: canvas.height / 2 - containerHeight / 2 + nudgeY,
    scale: scale,
  });
};

export const animateTaglineCanvas = ({ isDesktop, isTablet, isMobile }) => {
  let start = (x) => update(x);

  let canvas = document.getElementById("taglineCanvas");
  let ctx = canvas.getContext("2d");

  let update = (s) => {
    drawInCenter(ctx, canvas, s);
    // requestAnimFrame(update);
  };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = `${window.innerWidth}`;
  canvas.style.height = `${window.innerHeight}`;

  ScrollTrigger.create({
    trigger: ".section-tagline",
    start: window.innerHeight / 3 + " bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => update(self.progress * startScale()),
    immediateRender: false,
  });

  /* pin tagline and tell canvas to zoom */
  ScrollTrigger.create({
    trigger: ".section-tagline",
    start: "1px top",
    end: "bottom bottom",
    pin: ".tagline-canvas",
    pinSpacing: false,
    scrub: true,
    onLeave: () =>
      gsap.set(".section-tagline", { backgroundColor: "var(--white)" }),
    onEnterBack: () =>
      gsap.set(".section-tagline", { backgroundColor: "transparent" }),
    onUpdate: (self) => {
      const delta = Math.pow(self.progress, 4); // actual scale function
      const boosted_scale_max = Math.pow(SCALE_LINEAR_BOOST_TO, 4); // linear boost bc scale too small
      const slope = boosted_scale_max / SCALE_LINEAR_BOOST_TO; // linear slope to SCALE_LINEAR_BOOST_TO

      update(
        startScale() +
          (delta < boosted_scale_max
            ? self.progress * slope * SCALE_MAX // linear until boost_to
            : delta * SCALE_MAX)
      );
    },
    immediateRender: false,
  });

  start(0);
};