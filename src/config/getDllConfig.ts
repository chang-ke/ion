import { join } from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

export default function getDllConfig(entry: string[] = ['react', 'react-dom']) {
  const cwdPath = process.cwd();
  return {
    mode: 'production',
    output: {
      path: join(cwdPath, './public/lib'),
      filename: '[name].dll.js',
      library: 'dll_[name]',
    },
    entry,
    plugins: [
      new webpack.DllPlugin({
        path: join(cwdPath, './public/lib/manifest.json'),
        name: 'dll_[name]',
        context: cwdPath,
      }),
      new WebpackBar({
        name: '🚚  Ion Tools',
      }),
    ],
  };
}
