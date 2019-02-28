import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { isObject } from '../util/type';
import chalk from 'chalk';

export function getMockConfig() {
  const cwdPath = process.cwd();
  if (!existsSync(resolve(cwdPath, 'mock'))) {
    return {};
  }
  return readdirSync(resolve(cwdPath, 'mock')).reduce((configs, file) => {
    const config = require(resolve(cwdPath, 'mock', file));
    if (!isObject(config)) {
      throw new Error(
        chalk.red(`${file} may export a ${typeof config} but not a object`)
      );
    }
    return Object.assign(configs, config);
  }, {});
}
