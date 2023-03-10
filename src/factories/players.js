import { Gameboard } from './gameboard.js';

const Players = () => {
  const attacks = [];
  const playerBoard = Gameboard();
  return {
    playerBoard,

    sendAttacks(gameboard, coordinates) {
      if (attacks.includes(coordinates)) {
        return null;
      }
      attacks.push(coordinates);
      return gameboard.playerBoard.receiveAttack(coordinates);
    },

    computerAttack(gameboard) {
      const makeCoordinates = () => Math.floor(Math.random() * 10) + 1;
      const coordinates = `[${makeCoordinates()},${makeCoordinates()}]`;
      const isHit = this.sendAttacks(gameboard, coordinates);
      return { isHit, coordinates };
    },
  };
};
// eslint-disable-next-line import/prefer-default-export
export { Players };
