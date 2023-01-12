const Ship = (length) => {
  let hits = 0;
  const hit = () => {
    hits += 1;
    return hits;
  };
  const isSunk = () => length === hits;
  return { length, hit, isSunk };
};
// eslint-disable-next-line import/prefer-default-export
export { Ship };
