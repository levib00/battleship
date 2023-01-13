/* eslint-disable */
import { Gameboard } from '../factories/gameboard';

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

test('space with ship receives hit on ship', () => {
  const game = Gameboard()
  const carrier = game.placeCarrier('[1,1]')
  expect(game.receiveAttack('[1,1]')).toBeTruthy()
})

test('space without ship receives misses', () => {
  const game = Gameboard()
  const carrier = game.placeCarrier('[1,1]')
  expect(game.receiveAttack('[1,2]')).toBeFalsy()
})

test('hit counter increments every time it is hit', () => {
  const game = Gameboard()
  const carrier = game.placeCarrier('[1,1]')
  expect(game.receiveAttack('[1,1]')).toBe(1)
  expect(game.receiveAttack('[2,1]')).toBe(2)
})

test('Can place multiple ships', () => {  
  const game = Gameboard()
  
  const board = game.gameSpace
  const carrier = game.placeCarrier('[1,1]')
  const uBoat = game.placeCarrier('[1,2]')
  expect(board[0].hasShip).toBeTruthy();
  expect(board[1].hasShip).toBeTruthy();
  expect(board[2].hasShip).toBeTruthy();
  expect(board[3].hasShip).toBeTruthy();
  expect(board[4].hasShip).toBeTruthy();
  expect(board[5].hasShip).toBeFalsy();
  expect(board[10].hasShip).toBeTruthy();
  expect(board[11].hasShip).toBeTruthy();
  expect(board[12].hasShip).toBeTruthy();
  expect(board[13].hasShip).toBeTruthy();
  expect(board[14].hasShip).toBeTruthy();
  expect(board[15].hasShip).toBeFalsy();
})

test('Each ship has its own hit counter.', () => {  
  const game = Gameboard()
  const carrier = game.placeCarrier('[1,1]')
  const frigate = game.placeCarrier('[1,2]')

  expect(game.receiveAttack('[1,1]')).toBe(1)
  expect(game.receiveAttack('[2,1]')).toBe(2)
  expect(game.receiveAttack('[1,2]')).toBe(1)
  expect(game.receiveAttack('[2,2]')).toBe(2)
})

test('test that ships sink', () => {
  const game = Gameboard()
  const carrier = game.placeCarrier('[1,1]')
  const frigate = game.placeCarrier('[1,2]')

  expect(game.receiveAttack('[1,1]')).toBe(1)
  expect(game.receiveAttack('[2,1]')).toBe(2)
  expect(game.receiveAttack('[3,1]')).toBe(3)
  expect(game.receiveAttack('[4,1]')).toBe(4)
  expect(game.receiveAttack('[5,1]')).toBe(5)
  expect(carrier.isSunk).toBeTruthy()
  expect(game.receiveAttack('[1,2]')).toBe(1)
  expect(game.receiveAttack('[2,2]')).toBe(2)
  expect(game.receiveAttack('[3,2]')).toBe(3)
  expect(game.receiveAttack('[4,2]')).toBe(4)
  expect(game.receiveAttack('[5,2]')).toBe(5)
  expect(carrier.isSunk).toBeTruthy()
})

test('Gameboard knows that all ships are sunk', () => {
  const game = Gameboard()
  const carrier = game.placeCarrier('[1,1]')
  const frigate = game.placeCarrier('[1,2]')

  game.receiveAttack('[1,1]')
  game.receiveAttack('[2,1]')
  game.receiveAttack('[3,1]')
  game.receiveAttack('[4,1]')
  game.receiveAttack('[5,1]')
  expect(game.isAllShipsSunk()).toBeFalsy()
  game.receiveAttack('[1,2]')
  game.receiveAttack('[2,2]')
  game.receiveAttack('[3,2]')
  game.receiveAttack('[4,2]')
  game.receiveAttack('[5,2]')
  expect(game.isAllShipsSunk()).toBeTruthy()
})
