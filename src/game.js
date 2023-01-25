// eslint-disable-next-line import/extensions
import { Players } from './factories/players.js';

const makePlayers = () => {
  const playerPlayer = Players();
  const cpuPlayer = Players();

  return { playerPlayer, cpuPlayer };
};

const getPlayerName = () => {
  console.log(true);
};

const placeShips = () => {
  const test = (coordinateX, coordinateY, direction, usedIndices, length) => {
    // TODO: refactor, rename this, arr, some key, maybe i too.
    const arr = [];
    if (!direction) {
      for (let x = coordinateX; x < coordinateX + length; x += 1) {
        arr.push(`[${x},${coordinateY}]`);
      }
    } else {
      for (let y = coordinateY; y < coordinateY + length; y += 1) {
        arr.push(`[${coordinateX},${y}]`);
      }
    }
    const found = usedIndices.some((r) => arr.indexOf(r) >= 0);
    return found;
  };
  const playerGrid = document.getElementById('player').childNodes;
  const placeCpuShips = (cpuPlayer) => {
    const unavailableCpuIndices = [];
    for (let j = 1; j <= 5; j += 1) {
      // also exists in computerAttack function.
      const makeCoordinates = () => Math.floor(Math.random() * (10 - j)) + 1;
      const direction = Math.round(Math.random());
      const newCoordinates = () => {
        let coordinateX = null;
        let coordinateY = null;
        if (!direction) {
          coordinateX = makeCoordinates(j);
          coordinateY = makeCoordinates(0);
        } else {
          coordinateX = makeCoordinates(0);
          coordinateY = makeCoordinates(j);
        }
        return { coordinateX, coordinateY };
      };

      let coordinates = newCoordinates();
      while (test(
        coordinates.coordinateX,
        coordinates.coordinateY,
        direction,
        unavailableCpuIndices,
        j,
      )) {
        coordinates = newCoordinates();
      }
      const coordinatesString = `[${coordinates.coordinateX},${coordinates.coordinateY}]`;
      unavailableCpuIndices.push(coordinatesString);
      if (!direction) {
        for (let x = coordinates.coordinateX; x < coordinates.coordinateX + j; x += 1) {
          unavailableCpuIndices.push(`[${x},${coordinates.coordinateY}]`);
        }
      } else {
        for (let y = coordinates.coordinateY; y < coordinates.coordinateY + j; y += 1) {
          unavailableCpuIndices.push(`[${coordinates.coordinateX},${y}]`);
        }
      }
      if (j < 2) {
        const length = 2;
        cpuPlayer.playerBoard.placeShip(coordinatesString, length, direction);
      } else {
        cpuPlayer.playerBoard.placeShip(coordinatesString, j, direction);
      }
    }
  };
  let i = 5;
  const usedPlayerIndices = [];
  const placePlayerShips = (gridSquare, playerPlayer, index, cpuPlayer) => {
    const { coordinates } = playerPlayer.playerBoard.gameSpace[index];
    const coordinatesArray = JSON.parse(coordinates);
    let coordinateX = coordinatesArray[0];
    let coordinateY = coordinatesArray[1];
    const direction = 0;
    let incrementIndex = index;
    let k = i;
    if (k < 2) {
      k = 2;
    }

    if ((!test(
      coordinateX,
      coordinateY,
      direction,
      usedPlayerIndices,
      k,
    ))
     && (k > 0)
     && ((!direction && (coordinateX + k <= 10))
     || (direction && (coordinateY + k <= 10)))) {
      playerPlayer.playerBoard.placeShip(coordinates, i, direction);
      for (let j = k; j > 0; j -= 1) {
          if (!direction) {
            playerGrid[incrementIndex].setAttribute('class', 'grid-square blue');
            usedPlayerIndices.push(playerPlayer.playerBoard.gameSpace[incrementIndex].coordinates);
            incrementIndex += 1;
          }
      }

      i -= 1;
      if (i === 0) {
        const oldElement = gridSquare.parentNode;
        const newElement = oldElement.cloneNode(true);
        oldElement.parentNode.replaceChild(newElement, oldElement);
        // eslint-disable-next-line no-restricted-syntax
        for (const square of newElement.children) {
          if (square.classList.contains('clickable')) {
            square.classList.remove('clickable');
          }
        }
        placeCpuShips(cpuPlayer);
      }
    }
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
  return { placePlayerShips, placeCpuShips };
};

const gameLoop = (playerPlayer, cpuPlayer, index) => {
  /*
  step 1: get player name.
  step 2: let player place ships.
  step 3: place cpu ships randomly.
  */
  if (playerPlayer.playerBoard.isAllShipsSunk() || cpuPlayer.playerBoard.isAllShipsSunk()) {
    return;
  }

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

export {
  makePlayers, gameLoop, placeShips,
};
