import { Ship } from './ship-factory';

const Gameboard = () => {
  const gameSpaces = () => {
    // creates coordinates for all grid spaces from 1, 1 - 8, 8
    const grid = [];
    for (let i = 1; i < 11; i += 1) {
      for (let j = 1; j < 11; j += 1) {
        grid.push({
          coordinates: `[${j},${i}]`,
          hasShip: false,
        });
      }
    }
    return grid;
  };

  const gameSpace = gameSpaces();

  const placeCarrier = (placeCoordinates, xOrY = 0) => {
    const carrier = Ship(5);
    let placement = gameSpace.findIndex((ship) => ship.coordinates === placeCoordinates);
    for (let i = placement; i < 5; i += 1) {
      gameSpace[placement].hasShip = carrier;
      const tempArray = JSON.parse(gameSpace[placement].coordinates);
      tempArray[xOrY] += 1;
      const newPlaceCoordinates = JSON.stringify(tempArray);
      placement = gameSpace.findIndex((ship) => ship.coordinates === newPlaceCoordinates);
    }
    return gameSpace[placement];
  };
  return { gameSpace, placeCarrier };
};
// eslint-disable-next-line import/prefer-default-export
export { Gameboard };
