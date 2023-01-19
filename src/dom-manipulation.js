import { gameLoop } from "./game-loop.js";

const drawGrids = (makePlayers, board) => {
  const cpu = makePlayers.cpuPlayer;
  const human = makePlayers.playerPlayer;
  const buttonArray = [];
  for (let i = 0; i < 100; i += 1) {
    const gridSquare = document.createElement('div');
    buttonArray.push(gridSquare);
    gridSquare.setAttribute('class', 'grid-square clickable');
    gridSquare.style.width = '55px';
    gridSquare.style.height = '55px';
    board.appendChild(gridSquare);
    const index = Array.prototype.indexOf.call(gridSquare.parentNode.children, gridSquare);
    gridSquare.addEventListener('click', () => {
      gameLoop(human, cpu, index);
    });
  }
  return { buttonArray };
};

const assignGrids = (makePlayers) => {
  const playerBoard = document.getElementById('player');
  const cpuBoard = document.getElementById('cpu');

  const playerGrid = drawGrids(makePlayers, playerBoard);
  const cpuGrid = drawGrids(makePlayers, cpuBoard);

  return { playerGrid, cpuGrid };
};

export { assignGrids };
