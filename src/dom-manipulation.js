// eslint-disable-next-line import/extensions
import { gameLoop, placePlayerShips } from './game.js';

const drawGrids = (current, makePlayers, board) => {
  // playerboard shuoldn't have event lsiteners
  const cpu = makePlayers.cpuPlayer;
  const human = makePlayers.playerPlayer;
  for (let i = 0; i < 100; i += 1) {
    const gridSquare = document.createElement('div');
    gridSquare.setAttribute('class', 'grid-square clickable');
    gridSquare.style.width = '55px';
    gridSquare.style.height = '55px';
    board.appendChild(gridSquare);
    const index = Array.prototype.indexOf.call(gridSquare.parentNode.children, gridSquare);
    if (current === 'cpu') {
      gridSquare.addEventListener('click', () => {
        gameLoop(human, cpu, index);
      });
    } else {
      gridSquare.addEventListener('click', () => {
        placePlayerShips(gridSquare, human, index);
      });
    }
  }
};

const assignGrids = (makePlayers) => {
  const playerBoard = document.getElementById('player');
  const cpuBoard = document.getElementById('cpu');

  const playerGrid = drawGrids(makePlayers, playerBoard);
  const cpuGrid = drawGrids(makePlayers, cpuBoard);

  return { playerGrid, cpuGrid };
};

// eslint-disable-next-line import/prefer-default-export
export { assignGrids };
