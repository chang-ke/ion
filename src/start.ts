import debug from 'debug';
import webpack from 'webpack';
import { CommanderStatic } from 'commander';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';

import merge from './util/merge';
import resolveConfig from './util/resolveConfig';
import getWebpackConfig from './config/getWebpackConfig';
import getDevServerConfig from './config/getDevServerConfig';

export default function start(program: CommanderStatic) {
  process.env.HOST = 'localhost';
  const HOST = process.env.HOST || '0.0.0.0';
  const userConfig = resolveConfig(program.config);
  const serverConfig = getDevServerConfig(userConfig);

  process.env.NODE_ENV = 'development';

  const webpackConfig = merge(getWebpackConfig(userConfig), {
    devtool: 'source-map',
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
    // plugins: [
    //   new webpack.HotModuleReplacementPlugin({
    //     multiStep: true, // 开启多通道编译，获得更好的性能, 但是会引起html-webpack-plugin出错，see: https://github.com/jantimon/html-webpack-plugin/issues/716
    //   }),
    // ],
  });
  const port = userConfig.port || program.port || 8080;
  (webpackConfig.entry as any).app.unshift(
    `webpack-dev-server/client?http://localhost:${port}`
  );

  debug(webpackConfig);
  const compiler = webpack(webpackConfig);

  choosePort(HOST, port).then(port => {
    if (port === null) {
      return;
    }
    new WebpackDevServer(compiler, serverConfig).listen(port, HOST, err => {
      if (err) {
        throw err;
      }
      openBrowser(`http://${HOST}:${port}`);
    });
  });
}
