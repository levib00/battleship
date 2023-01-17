import { assignGrids } from '../src/dom-manipulation.js';
import { makePlayers } from '../src/game-loop.js';

window.onload = () => {
  assignGrids(makePlayers());
};
