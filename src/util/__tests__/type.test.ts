import { isObject } from '../type';

describe('test type.ts', () => {
  test('object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject()).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(Symbol('ion'))).toBe(false);
  });
});
