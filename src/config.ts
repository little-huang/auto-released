
import * as path from 'path'
import * as fs from 'fs'
/* model */
import { DefaultOptions } from '@src/model/options'
/* types */
import { Options } from '@src/types'

const configFileName = 'auto.released.config.js'

function getConfig(options: Options): Options {
  
  const configFilePath = path.resolve(options.projectRootPath, configFileName)
  
  if (!fs.existsSync(configFilePath)) {
    return DefaultOptions
  }
  
  const config = require(options.projectRootPath + '/' + configFileName)
  
  return config
}

export {
  getConfig
}

export default {
  getConfig
}
