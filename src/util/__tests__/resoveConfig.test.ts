import resolveConfig from '../resolveConfig';

describe('test resolve user config file', () => {
  test('test error file path', () => {
    expect(resolveConfig('./ion.confi.js')).toEqual({});
  });
  test('test correct file path and default configuration file path', () => {
    const config = {
      port: 8000,
      entry: {
        app: ['./src/index.js'],
      },
      dllEntry: ['react', 'react-dom'],
      cssModule: true,
      sourceMap: true,
      babel: {},
      postcss: {
        autoprefixer: {
          browsers: ['iOS >= 8', 'Android >= 4'],
        },
        pxtorem: { remUnit: 75, exclude: /node_module/, baseDpr: 2 },
      },
      copy: {
        from: './public',
        to: './dist',
      },
    };

    expect(resolveConfig('./ion.config.js')).toStrictEqual(config);
    expect(resolveConfig()).toStrictEqual(config);
  });
});
