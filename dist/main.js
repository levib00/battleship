import { assignGrids } from '../src/scripts/dom-manipulation.js';
import { makePlayers } from '../src/scripts/game.js';

window.onload = () => {
  assignGrids(makePlayers());
};
