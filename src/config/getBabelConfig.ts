import { resolve } from '../util/helper';
import { IonConfig } from '../util/resolveConfig';

export default function getBabelConfig({ babel = {} }: IonConfig) {
  const plugins = [
    resolve('@babel/plugin-transform-property-literals'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
        regenerator: true,
      },
    ],
    resolve('@babel/plugin-transform-spread'),
    resolve('@babel/plugin-transform-template-literals'),
    [resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    resolve('@babel/plugin-proposal-export-default-from'),
    resolve('@babel/plugin-proposal-export-namespace-from'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    resolve('@babel/plugin-syntax-dynamic-import'),
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        decoratorsBeforeExport: true,
      },
    ],
  ];
  if (process.env.NODE_ENV === 'development') {
    plugins.push(resolve('../ion-hmr'), resolve('react-hot-loader/babel'));
  } else {
    plugins.push(resolve('react-hot-loader/babel'));
  }
  if (babel) {
    if (babel.plugins) {
      plugins.push(...babel.plugins);
    }
  }
  return {
    cacheDirectory: true,
    babelrc: false,
    presets: [
      resolve('@babel/preset-react'),
      resolve('@babel/preset-typescript'),
      [
        resolve('@babel/preset-env'),
        {
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
    ],
    plugins,
  };
}
