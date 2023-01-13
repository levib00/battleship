import { Ship } from './ship-factory';
// TODO: prevent attacking the same spot twice.
const Gameboard = () => {
  let numberOfShips = 0;
  let sunkShips = 0;
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

  const missedAttacks = [];

  return {
    gameSpace,

    placeCarrier(placeCoordinates, xOrY = 0) {
      numberOfShips += 1;
      const carrier = Ship(5);
      let placement = gameSpace.findIndex((ship) => ship.coordinates === placeCoordinates);
      for (let i = 0; i < 5; i += 1) {
        gameSpace[placement].hasShip = carrier;
        const tempArray = JSON.parse(gameSpace[placement].coordinates);
        tempArray[xOrY] += 1;
        const newPlaceCoordinates = JSON.stringify(tempArray);
        placement = gameSpace.findIndex((ship) => ship.coordinates === newPlaceCoordinates);
      }
      return carrier;
    },

    receiveAttack(attackCoordinates) {
      const attackSpace = gameSpace.findIndex((ship) => ship.coordinates === attackCoordinates);

      if (gameSpace[attackSpace].hasShip) {
        const hits = gameSpace[attackSpace].hasShip.hit();
        if (gameSpace[attackSpace].hasShip.isSunk()) {
          sunkShips += 1;
        }
        return hits;
      }
      missedAttacks.push(attackCoordinates);
      return false;
    },

    isAllShipsSunk() {
      return numberOfShips === sunkShips;
    },
  };
};
// eslint-disable-next-line import/prefer-default-export
export { Gameboard };
