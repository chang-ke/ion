import { resolve } from '../helper';

describe('test helper', () => {
  test('require.resolve', () => {
    expect(resolve('path')).toBe(require.resolve('path'));
  });
});
