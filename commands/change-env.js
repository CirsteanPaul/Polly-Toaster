/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const _ = require('lodash');
const replace = require('replace-in-file');

const enviorments = ['acceptance', 'production'];
const env = _.get(process, 'argv[2]');

if (enviorments.indexOf(env) < 0) {
  console.log(`Please use one of the following env arguments: ${enviorments.join(' ,')}.`);
  console.log('\nExample: "npm run change-env acceptance"\n');
  console.log("Please if you're not a programmer don't use this");
  process.exit(0);
}

console.log(`Changing environment to: ${env}`);

fs.copyFileSync(`./env/${env}.ts`, `./src/config/environment.ts`);
replace.sync({
  files: './src/config/environment.ts',
  from: '../src/types/IConfig',
  to: '../../src/types/IConfig',
});
replace.sync({
  files: './src/config/environment.ts',
  from: '../src/env',
  to: '../env',
});
fs.copyFileSync(`./env/build-env/${env}.js`, './build-env.js');
