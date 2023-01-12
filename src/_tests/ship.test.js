/* eslint-disable */
import { Ship } from "../factories/ship-factory";

test('test ship length', () => {
  expect(Ship(5).length).toBe(5);
});

test('test that hits increases when hit is called', () => {
  expect(Ship(5).hit()).toBe(1);
});

test('test isSunk returns true when length equals hits', () => {
  expect(Ship(0).isSunk()).toBe(true);
});

test('test isSunk returns false when length doesn\'t equal hits', () => {
  expect(Ship(1).isSunk()).toBe(false);
});

test('comprehensive test of ship factory', () => {
  const testShip = Ship(2)
  expect(testShip.isSunk()).toBe(false);
  expect(testShip.hit()).toBe(1);
  expect(testShip.isSunk()).toBe(false);
  expect(testShip.hit()).toBe(2);
  expect(testShip.isSunk()).toBe(true);
});
