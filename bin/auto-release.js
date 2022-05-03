#!/usr/bin/env node

const minimist = require('minimist')
const { commandLineRun, CIRun } = require('./../dist')
const { isNotUndefined } = require('./../dist/util/type')
const { createInitConfigFile } = require('./../dist/init')
const { getPackageVersion } = require('./../dist/util/version')

const args = process.argv.slice(2);
const argv = minimist(args);

if (isNotUndefined(argv.init)) {
  createInitConfigFile();
  return
}

if (isNotUndefined(argv.version)) {
  console.log('0.0.2')
  return
}
else if(isNotUndefined(argv.ci) || isNotUndefined(argv.CI)) {
  CIRun();
} 
else {
  commandLineRun();
}
