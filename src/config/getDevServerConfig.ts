import { join } from 'path';
import bodyParser from 'body-parser';
import { getMockConfig } from './getMockConfig';
import { IonConfig } from '../util/resolveConfig';

export default function getDevServerConfig({
  port,
  proxy = {},
  publicPath = '/',
}: IonConfig) {
  const cwdPath = process.cwd();
  const HOST = process.env.HOST || 'localhost';

  return {
    contentBase: join(cwdPath, 'public'),
    publicPath,
    historyApiFallback: true,
    host: HOST,
    inline: true,
    hot: true,
    hotOnly: true,
    stats: 'errors-only',
    port,
    proxy,
    overlay: true,
    before(app) {
      const mockUrls = getMockConfig();

      Object.keys(mockUrls).forEach(key => {
        const [type, url] = key.split(' ');
        app.use(url, bodyParser.json());
        if (type === 'GET') {
          app.get(url, mockUrls[key]);
        } else if (type === 'POST') {
          app.post(url, mockUrls[key]);
        }
      });
    },
  };
}
