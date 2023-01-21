// eslint-disable-next-line import/extensions
import { Players } from './factories/players.js';

const makePlayers = () => {
  const playerPlayer = Players();
  const cpuPlayer = Players();

  playerPlayer.playerBoard.placeShip('[1,1]', 4);
  cpuPlayer.playerBoard.placeShip('[1,1]', 4);

  return { playerPlayer, cpuPlayer };
};

const getPlayerName = () => {
  console.log(true);
};

const placePlayerShips = (button, playerPlayer, index) => {
  console.log(playerPlayer.playerBoard.gamepace[index].coordinates);
  /*
  placeShip on the coordinates of the clicked square.
  remove listeners from all tiles that have ships.
  prevent overlap
  ^^gonna need to make test() work with DI
  rename test()
  update ship tiles to be blue.
  get input for each ship one at a time
  */
};

const placeCpuShips = (cpuPlayer) => {
  const unavailableCpuIndices = [];
  for (let i = 1; i <= 5; i += 1) {
    // also exists in computerAttack function.
    const makeCoordinates = () => Math.floor(Math.random() * (10 - i)) + 1;
    const direction = Math.round(Math.random());
    const newCoordinates = () => {
      let coordinateX = null;
      let coordinateY = null;
      if (!direction) {
        coordinateX = makeCoordinates(i);
        coordinateY = makeCoordinates(0);
      } else {
        coordinateX = makeCoordinates(0);
        coordinateY = makeCoordinates(i);
      }
      return { coordinateX, coordinateY };
    };

    const test = (coordinateX, coordinateY) => {
      const arr = [];
      if (!direction) {
        for (let x = coordinateX; x < coordinateX + i; x += 1) {
          arr.push(`[${x},${coordinateY}]`);
        }
      } else {
        for (let y = coordinateY; y < coordinateY + i; y += 1) {
          arr.push(`[${coordinateX},${y}]`);
        }
      }
      const found = unavailableCpuIndices.some((r) => arr.indexOf(r) >= 0);
      return found;
    };

    /*
      while the coordinate or any of the ships coordinates overlaps with any of the
      coordinates/indices in unavailable indices, keep generating new coordinates.
      if horizontal, x needs to be <= 10 - x, if vertical y needs to be <= 10 - y
    */
    let coordinates = newCoordinates();
    while (test(coordinates.coordinateX, coordinates.coordinateY)) {
      coordinates = newCoordinates();
    }
    const coordinatesString = `[${coordinates.coordinateX},${coordinates.coordinateY}]`;
    unavailableCpuIndices.push(coordinatesString);
    if (i < 2) {
      const j = 2;
      cpuPlayer.placeShip(coordinatesString, j, direction);
    } else {
      cpuPlayer.placeShip(coordinatesString, i, direction);
    }
  }
};

const gameLoop = (playerPlayer, cpuPlayer, index) => {
  /*
  step 1: get player name.
  step 2: let player place ships.
  step 3: place cpu ships randomly.
  */

  const playerBoard = playerPlayer.playerBoard.gameSpace;
  const playerGrid = document.getElementById('player').childNodes;
  const cpuGridSquare = document.getElementById('cpu').childNodes[index];
  let Loop = false;
  const cpuCoordinates = cpuPlayer.playerBoard.gameSpace[index].coordinates;
  const playerAttack = playerPlayer.sendAttacks(cpuPlayer, cpuCoordinates);
  if (playerAttack) {
    cpuGridSquare.style.backgroundColor = 'red';
    if (cpuPlayer.playerBoard.isAllShipsSunk()) {
      console.log('endgame');
    }
    return;
  }
  if (playerAttack === null) {
    return;
  }
  cpuGridSquare.style.backgroundColor = 'grey';
  do {
    Loop = cpuPlayer.computerAttack(playerPlayer);
    // eslint-disable-next-line no-loop-func
    const squareIndex = playerBoard.findIndex((square) => square.coordinates === Loop.coordinates);
    const playerSquare = playerGrid[squareIndex];
    if (Loop.isHit) {
      playerSquare.style.backgroundColor = 'red';
      if (playerPlayer.playerBoard.isAllShipsSunk()) {
        console.log('endgame');
      }
    } else if (Loop.isHit === false) {
      playerSquare.style.backgroundColor = 'grey';
    }
  } while (Loop.isHit || Loop.isHit === null);
};

export { makePlayers, gameLoop, placeCpuShips };
