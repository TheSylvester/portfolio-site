import { staggeredReveal } from "./staggeredReveal";

export const revealNavItems = () => {
  staggeredReveal(".nav-logo, .nav-items > li");
};
