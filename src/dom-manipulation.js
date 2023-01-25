// eslint-disable-next-line import/extensions
import { gameLoop, placeShips } from './game.js';

const placePlayerShips = placeShips();

const drawGrids = (current, makePlayers, board) => {
  // playerboard shuoldn't have event lsiteners
  const cpu = makePlayers.cpuPlayer;
  const human = makePlayers.playerPlayer;
  for (let i = 0; i < 100; i += 1) {
    const gridSquare = document.createElement('div');
    gridSquare.setAttribute('class', 'grid-square clickable');
    gridSquare.style.width = '50px';
    gridSquare.style.height = '50px';
    board.appendChild(gridSquare);
    const index = Array.prototype.indexOf.call(gridSquare.parentNode.children, gridSquare);
    const cpuEvent = () => {
      gameLoop(human, cpu, index);
    };
    const placeTheShips = () => {
      placePlayerShips.placePlayerShips(gridSquare, human, index, cpu);
    };
    if (current === 'cpu') {
    // TODO: isolate even listeners into their own functions so parameters can be passed,
    // TODO: but listeners can be removed.
      gridSquare.addEventListener('click', cpuEvent);
    } else {
      gridSquare.addEventListener('click', placeTheShips);
    }
  }
};

const assignGrids = (makePlayers) => {
  const playerBoard = document.getElementById('player');
  const cpuBoard = document.getElementById('cpu');

  const playerGrid = drawGrids('player', makePlayers, playerBoard);
  const cpuGrid = drawGrids('cpu', makePlayers, cpuBoard);

  return { playerGrid, cpuGrid };
};

// eslint-disable-next-line import/prefer-default-export
export { assignGrids };
