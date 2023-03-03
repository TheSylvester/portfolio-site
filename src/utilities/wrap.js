/* Utilities - wrap number code */
export const wrap = (num, min, max) =>
  ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;