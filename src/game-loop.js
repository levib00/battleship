// eslint-disable-next-line import/extensions
import { Players } from './factories/players.js';

const makePlayers = () => {
  const playerPlayer = Players();
  const cpuPlayer = Players();

  playerPlayer.playerBoard.placeShip('[1,1]', 4);
  cpuPlayer.playerBoard.placeShip('[1,1]', 4);

  return { playerPlayer, cpuPlayer };
};

const gameLoop = (playerPlayer, cpuPlayer, index) => {
  const playerBoard = playerPlayer.playerBoard.gameSpace;
  const playerGrid = document.getElementById('player').childNodes;
  const cpuGridSquare = document.getElementById('cpu').childNodes[index];
  let Loop = false;
  const cpuCoordinates = cpuPlayer.playerBoard.gameSpace[index].coordinates;
  const playerAttack = playerPlayer.sendAttacks(cpuPlayer, cpuCoordinates);
  if (playerAttack) {
    cpuGridSquare.style.backgroundColor = 'red';
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
    } else if (Loop.isHit === false) {
      playerSquare.style.backgroundColor = 'grey';
    }
  } while (Loop.isHit || Loop.isHit === null);
  /*
  step 1: get player name.
  step 2: let player place ships.
  step 3: place cpu ships randomly.
    *happens multiple times*
  step 4: player fires.
  if (player hits) {
    cpuPlayer.isAllShipsSunk
    player fires.
  } else
  step 5: cpu fires.
    if (cpu hits) {
      cpuPlayer.isAllShipsSunk
      cpu fires.
    } else {
      player fires
    }
  */
};

export { makePlayers, gameLoop };
