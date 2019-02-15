import webpack from 'webpack';
import { join } from 'path';
import WebpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ErrorPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from '../util/helper';
import getBabelConfig from './getBabelConfig';
import { IonConfig } from '../util/resolveConfig';
import getPostcssConfig from './getPostcssConfig';
import { isString } from '../util/type';
import chalk from 'chalk';

function getCssOptions({ cssModule }: IonConfig) {
  const options: any = {
    sourceMap: true,
    importLoaders: 1,
  };
  if (cssModule) {
    options.modules = true;
    options.localIdentName = isString(cssModule)
      ? cssModule
      : '[local]-[hash:base64:5]';
  }
  return options;
}

function getHash({ hash = 8 }: IonConfig) {
  if (hash <= 0) {
    console.log(chalk.yellow('hash must be greater than 0'));
  }
  return hash;
}

export default function getWebpackConfig(ionConfig: IonConfig) {
  const cwdPath = process.cwd();

  const hash = getHash(ionConfig);
  const cssOptions = getCssOptions(ionConfig);
  const babelOptions = getBabelConfig(ionConfig);
  const postCssOptions = getPostcssConfig(ionConfig);

  const styleLoader =
    process.env.NODE_ENV === 'development'
      ? 'style-loader'
      : MiniCssExtractPlugin.loader;

  const {
    alias = {},
    entry = { app: './src/index.js' },
    publicPath = '/',
  } = ionConfig;

  return {
    context: cwdPath,
    entry,
    output: {
      path: join(cwdPath, './dist'),
      filename: `js/[name].[hash:${hash}].js`,
      publicPath,
      chunkFilename: `js/[name].[chunkhash:${hash}].async.js`,
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json',
    },
    resolve: {
      // modules: ['node_modules', join(cwdPath, './node_modules')],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: resolve('babel-loader'),
          options: babelOptions,
        },
        {
          test: /\.css$/,
          use: [
            styleLoader,
            {
              loader: resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: postCssOptions,
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            styleLoader,
            {
              loader: resolve('css-loader'),
              options: cssOptions,
            },
            {
              loader: resolve('less-loader'),
              options: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: postCssOptions,
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            styleLoader,
            {
              loader: resolve('css-loader'),
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: resolve('less-loader'),
              options: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: postCssOptions,
            },
          ],
          exclude: /src/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `main.[contenthash:${hash}].css`,
      }),
      // 防止每次文件hash都改变
      new webpack.HashedModuleIdsPlugin(),
      new ErrorPlugin(),
      new WebpackBar({
        name: '🚚  Ion Tools',
      }),
      new webpack.DllReferencePlugin({
        context: join(cwdPath, './public'),
        manifest: require(join(cwdPath, './public/lib/manifest.json')),
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: false,
        },
        template: join(cwdPath, './public/index.html'),
      }),
      new CleanWebpackPlugin(join(cwdPath, 'dist')),
    ],
  };
}
