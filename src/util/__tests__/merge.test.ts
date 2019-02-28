import merge from '../merge';
import webpackMerge from 'webpack-merge';

test('test merge webpack configuration file', () => {
  expect(
    merge(
      {
        entry: {
          app: ['./src/index.js'],
        },
      },
      {}
    )
  ).toEqual(
    webpackMerge(
      {
        entry: {
          app: ['./src/index.js'],
        },
      },
      {}
    )
  );
});
