import { Players } from "./factories/players.js";

const makePlayers = () => {
  const playerPlayer = Players();
  const cpuPlayer = Players();

  playerPlayer.playerBoard.placeShip('[1,1]', 4);
  cpuPlayer.playerBoard.placeShip('[1,1]', 4);

  return { playerPlayer, cpuPlayer };
};

export { makePlayers }
