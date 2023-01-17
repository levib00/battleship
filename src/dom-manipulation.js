const drawGrids = (makePlayers, board) => {
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
      // ! Fix later. prolly just use variables to break up length.
      // eslint-disable-next-line max-len
      if (makePlayers.playerPlayer.sendAttacks(makePlayers.cpuPlayer, makePlayers.playerPlayer.playerBoard.gameSpace[index].coordinates)) {
        // ? can make this block into a function. to give it a board as parameter. the parameter can come from the id of the parent node (AKA the id of the board).
        gridSquare.style.backgroundColor = 'red';
      }
    });
  }
  return { buttonArray };
};

const assignGrids = (makePlayers) => {
  const playerBoard = document.getElementsByClassName('player')[0];
  const cpuBoard = document.getElementsByClassName('cpu')[0];

  const playerGrid = drawGrids(makePlayers, playerBoard);
  const cpuGrid = drawGrids(makePlayers, cpuBoard);

  return { playerGrid, cpuGrid };
};

export { assignGrids };
