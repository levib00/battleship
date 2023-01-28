import { gameLoop, placeShips, makePlayers } from './game.js';

const variables = (() => ({
  placePlayerShips: placeShips(),
  playerBoard: document.getElementById('player'),
  cpuBoard: document.getElementById('cpu'),
}))();

const resetGame = () => {
  document.getElementById('player').replaceChildren(); // TODO: change to a more efficient solution
  variables.cpuBoard.replaceChildren();

  document.getElementById('winner-popup').classList.add('no-display');
  document.getElementById('placement-info').classList.remove('hide');
  document.getElementById('ship2').classList.add('no-display');
  document.getElementById('ship5').classList.remove('no-display');
  variables.placePlayerShips = placeShips();
  assignGrids(makePlayers());
};

const drawGrids = (current, madePlayers, board) => {
  const cpu = madePlayers.cpuPlayer;
  const human = madePlayers.playerPlayer;
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
      variables.placePlayerShips.placePlayerShips(gridSquare, human, index, cpu);
    };
    if (current === 'cpu') {
      gridSquare.addEventListener('click', cpuEvent);
    } else {
      gridSquare.addEventListener('click', placeTheShips);
    }
  }
  document.getElementById('reset').addEventListener('click', resetGame);
};

const assignGrids = (madePlayers) => {
  const playerBoard = document.getElementById('player');

  const playerGrid = drawGrids('player', madePlayers, playerBoard);
  const cpuGrid = drawGrids('cpu', madePlayers, variables.cpuBoard);

  return { playerGrid, cpuGrid };
};

export { assignGrids };
