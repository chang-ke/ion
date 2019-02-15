import webpack from 'webpack';
import { CommanderStatic } from 'commander';
import getDllConfig from './config/getDllConfig';
import resolveConfig from './util/resolveConfig';
import chalk from 'chalk';

export default function buildDll(program: CommanderStatic) {
  const { lib } = resolveConfig(program.config);
  if (lib) {
    const config = getDllConfig(lib);
    webpack(config, function(err, stats) {
      if (err) {
        console.log(chalk.red(err));
        return;
      }

      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        })
      );
    });
  } else {
    console.log(
      chalk.yellow(
        'You may not configure lib proptry, check you configuration file'
      )
    );
  }
}
