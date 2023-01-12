/* eslint-disable */
import { Gameboard, placeCarrier } from '../factories/gameboard';

test('test grid has all spaces', () => {
  const gameSpaces = Gameboard().gameSpace;
  expect(gameSpaces[0].coordinates).toBe('[1,1]');
  expect(gameSpaces[99].coordinates).toBe('[10,10]');
});

test('has ship is assigned ship info', () => {
  const game = Gameboard()
  const board = game.gameSpace
  game.placeCarrier('[1,1]')
  expect(board[0]).toBeTruthy();
});

test('All spaces of a horizontal ship has hasShip is assigned ship info', () => {
  const game = Gameboard()
  const board = game.gameSpace
  game.placeCarrier('[1,1]')
  expect(board[0].hasShip).toBeTruthy();
  expect(board[1].hasShip).toBeTruthy();
  expect(board[2].hasShip).toBeTruthy();
  expect(board[3].hasShip).toBeTruthy();
  expect(board[4].hasShip).toBeTruthy();
  expect(board[5].hasShip).toBeFalsy();
});

test('All spaces of a vertical ship has hasShip is assigned ship info', () => {
  const game = Gameboard()
  const board = game.gameSpace
  game.placeCarrier('[1,1]', 1)
  expect(board[0].hasShip).toBeTruthy();
  expect(board[10].hasShip).toBeTruthy();
  expect(board[20].hasShip).toBeTruthy();
  expect(board[30].hasShip).toBeTruthy();
  expect(board[40].hasShip).toBeTruthy();
  expect(board[50].hasShip).toBeFalsy();
});
