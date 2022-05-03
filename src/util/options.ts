
import * as path from 'path'
import * as fs from 'fs'
/* model */
import { DefaultCIOptions, DefaultOptions } from '@src/model/options'
/* types */
import { Options } from '@src/types'

const configFileName = 'auto.released.config.js'

function getLocalFileOptions(options: Options, isCI: boolean): Options {
  
  const configFilePath = path.resolve(options.projectRootPath, configFileName)
  
  if (!fs.existsSync(configFilePath)) {
    return isCI ? DefaultCIOptions : DefaultOptions
  }
  
  const config = require(options.projectRootPath + '/' + configFileName)
  
  return config
}

function mergeOptions(option1: Options, options2: Options) {
  //
}

export {
  getLocalFileOptions,
  mergeOptions
}

export default {
  getLocalFileOptions,
  mergeOptions
}
