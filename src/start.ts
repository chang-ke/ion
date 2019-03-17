import debug from 'debug';
import webpack from 'webpack';
import { CommanderStatic } from 'commander';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';

import merge from './util/merge';
import resolveConfig from './util/resolveConfig';
import getWebpackConfig from './config/getWebpackConfig';
import getDevServerConfig from './config/getDevServerConfig';
import { resolve } from './util/helper';

export default function start(program: CommanderStatic) {
  process.env.HOST = 'localhost';
  const HOST = process.env.HOST || '0.0.0.0';
  const userConfig = resolveConfig(program.config);
  const serverConfig = getDevServerConfig(userConfig);

  process.env.NODE_ENV = 'development';

  const webpackConfig = merge(getWebpackConfig(userConfig), {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|less)/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new ErrorOverlayPlugin(),
      new webpack.HotModuleReplacementPlugin({
        // multiStep: true, // 开启多通道编译，获得更好的性能, 但是会引起html-webpack-plugin出错，see: https://github.com/jantimon/html-webpack-plugin/issues/716
      }),
    ],
  });
  const port = userConfig.port || program.port || 8080;

  debug(webpackConfig);

  choosePort(HOST, port).then(port => {
    if (port === null) {
      return;
    }
    webpackConfig.entry.app.unshift(
      // resolve(`webpack-dev-server/client`) + `?http://${HOST}:${port}`, due to addDevServerEntrypoints
      resolve('webpack/hot/dev-server') // see: https://github.com/webpack/webpack-dev-server/issues/1377#issuecomment-407374530
      // webpack/hot/dev-server 和 webpack/hot/only-dev-server 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败。
    );
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverConfig);
    const compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, serverConfig).listen(port, HOST, err => {
      if (err) {
        throw err;
      }
      openBrowser(`http://${HOST}:${port}`);
    });
  });
}
