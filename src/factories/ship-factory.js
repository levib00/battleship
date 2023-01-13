const Ship = (length) => {
  let hits = 0;

  return {
    length,
    hit() {
      hits += 1;
      return hits;
    },
    isSunk() {
      return length === hits;
    },
  };
};
// eslint-disable-next-line import/prefer-default-export
export { Ship };
