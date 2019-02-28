import { existsSync } from 'fs';
import { resolve } from 'path';
import { Entry } from 'webpack/declarations/WebpackOptions';
import chalk from 'chalk';

export interface IonConfig {
  entry?: Entry & {
    app: string[];
  };
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
  lib?: string[];
  hash?: number;
  cssModule?: boolean | string;
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

export default function resolveConfig(
  configRelativePath: string = 'ion.config.js'
): IonConfig {
  const cwdPath = process.cwd();
  const configPath = resolve(cwdPath, configRelativePath);
  if (!existsSync(configPath)) {
    console.warn(chalk.yellow(`file ${configPath} does not exits`));
  }
  return existsSync(configPath) ? require(configPath) : {};
}
