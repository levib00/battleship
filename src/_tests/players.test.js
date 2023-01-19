/* eslint-disable */
import { Players } from '../factories/players';

test('Players can be initialized', () => {
  const player = Players();
  expect(player).toBeTruthy();
});

test('Initializing players also creates a gameboard as that player', () => {
  const player = Players('dab');
  expect(player.playerBoard).toBeTruthy()
});

test('Players can send attacks', () => {
  const player = Players()
  const computer = Players()
  computer.playerBoard.placeShip('[1,1]', 4)

  expect(player.sendAttacks(computer, '[1,1]')).toBe(1)
});

test('computer player will select its own attacks', () => {
  const player = Players();
  const computer = Players()

  computer.playerBoard.placeShip('[1,1]');

  expect(computer.computerAttack(player)).toBe(false)
});

test('Players cannot attack the same coordinates twice', () => {
  const player = Players();
  const computer = Players();

  player.sendAttacks(computer, '[1,1]')
  expect(player.sendAttacks(computer, '[1,1]')).toBe(null)
});



