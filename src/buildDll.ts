import webpack from 'webpack';
import { CommanderStatic } from 'commander';
import getDllConfig from './config/getDllConfig';
import resolveConfig from './util/resolveConfig';
import chalk from 'chalk';

export default function buildDll(program: CommanderStatic) {
  const { dllEntry } = resolveConfig(program.config);
  if (dllEntry) {
    const config = getDllConfig(dllEntry);
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
        'You may not configure dllEntry property, check you configuration file'
      )
    );
  }
}
