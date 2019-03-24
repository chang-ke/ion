import fs from 'fs-extra';
import { exec } from 'child_process';
import { resolve } from 'path';
import { CommanderStatic } from 'commander';

export default function create(program: CommanderStatic) {
  const cwdPath = process.cwd();
  const name = program.args[0] || 'ion-starter';

  fs.copy(
    resolve(
      __dirname,
      `../template/${program.typescript ? 'app-typescript' : 'app'}`
    ),
    resolve(cwdPath, name)
  )
    .then(result => {
      console.log('create successed');
      exec(`cd ${name}`);
    })
    .catch(error => {
      console.log(error);
    });
}
