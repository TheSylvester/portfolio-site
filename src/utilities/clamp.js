export const clamp = (min, mid, max) =>
  Math.floor(Math.min(Math.max(mid, min), max));
