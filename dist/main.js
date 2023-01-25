import { assignGrids } from '../src/dom-manipulation.js';
import { makePlayers } from '../src/game.js';

window.onload = () => {
  assignGrids(makePlayers());
};
