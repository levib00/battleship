import { Players } from '../factories/players.js';

const makePlayers = () => {
  const playerPlayer = Players();
  const cpuPlayer = Players();

  return { playerPlayer, cpuPlayer };
};

const placeShips = () => {
  const rotateButton = document.getElementById('rotate');

  let playerDirection = 0;
  const rotateShip = () => {
    if (playerDirection) {
      playerDirection = 0;
    } else {
      playerDirection = 1;
    }
    const exampleShips = document.getElementsByClassName('ship');

    for (let ship of exampleShips) {
      ship.classList.toggle('down')
    }
  };

  rotateButton.addEventListener('click', rotateShip);

  const testValidPosition = (coordinateX, coordinateY, direction, usedIndices, length) => {
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
      while (testValidPosition(
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
  const resetI = () => {
    i = 5;
  };

  const usedPlayerIndices = [];
  const placePlayerShips = (gridSquare, playerPlayer, index, cpuPlayer) => {
    const { coordinates } = playerPlayer.playerBoard.gameSpace[index];
    const coordinatesArray = JSON.parse(coordinates);
    const coordinateX = coordinatesArray[0];
    const coordinateY = coordinatesArray[1];
    let incrementIndex = index;
    let k = i;
    if (k < 2) {
      k = 2;
    }

    if ((!testValidPosition(
      coordinateX,
      coordinateY,
      playerDirection,
      usedPlayerIndices,
      k,
    ))
     && (k > 0)
     && ((!playerDirection && (coordinateX + k <= 10))
     || (playerDirection && (coordinateY + k <= 10)))) {
      playerPlayer.playerBoard.placeShip(coordinates, k, playerDirection);
      for (let j = k; j > 0; j -= 1) {
        playerGrid[incrementIndex].setAttribute('class', 'grid-square blue');
        usedPlayerIndices.push(playerPlayer.playerBoard.gameSpace[incrementIndex].coordinates);
        if (!playerDirection) {
          incrementIndex += 1;
        } else {
          incrementIndex += 10;
        }
      }

      if (k > 2) {
        const currentShip = document.getElementById(`ship${k}`);
        currentShip.classList.toggle('no-display');
        const nextShip = document.getElementById(`ship${k - 1}`);
        nextShip.classList.toggle('no-display');
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
        document.getElementById('placement-info').classList.add('hide');
        rotateButton.removeEventListener('click', rotateShip);
        placeCpuShips(cpuPlayer);
      }
    }
  };
  return {
    placePlayerShips, placeCpuShips, rotateShip, resetI,
  };
};

const endgamePop = (name) => {
  document.getElementById('winner-popup').classList.remove('no-display');
  document.getElementById('winner-text').textContent = `${name} has won the game!`;
};

const gameLoop = (playerPlayer, cpuPlayer, index) => {
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
      endgamePop('Player');
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
        endgamePop('CPU');
      }
    } else if (Loop.isHit === false) {
      playerSquare.style.backgroundColor = 'grey';
    }
  } while (Loop.isHit || Loop.isHit === null);
};

export {
  makePlayers, gameLoop, placeShips,
};
