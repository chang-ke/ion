import { existsSync } from 'fs';
import { resolve } from 'path';
import { Entry } from 'webpack/declarations/WebpackOptions';
import chalk from 'chalk';

export interface IonConfig {
  entry?: Entry;
  publicPath?: string;
  port?: number;
  proxy?: {
    [k: string]: {};
  };
  alias?: {
    [k: string]: string;
  };
  externals?: {
    [k: string]: string;
  };
  lib?: false | string[];
  hash?: number;
  cssModule?: false | string;
  sourceMap?: boolean;
  babel?: {
    presets?: string[];
    plugins?: (string | string[])[];
  };
  postcss?: {
    autoprefixer?: {
      browsers?: string[];
    };
    pxtorem?: {
      remUnit?: number;
      exclude?: RegExp;
    };
  };
}

export default function resolveConfig(configRelativePath: string): IonConfig {
  const cwdPath = process.cwd();
  const configPath = resolve(cwdPath, configRelativePath || 'ion.config.js');
  if (!existsSync(configPath)) {
    console.warn(chalk.yellow(`${configPath} does not exits`));
  }
  return existsSync(configPath) ? require(configPath) : {};
}
