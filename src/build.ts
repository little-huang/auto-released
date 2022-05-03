/* model */
import { BUILDING_MESSAGE, BUILD_ERROR_MESSAGE, BUILD_SUCCESS_MESSAGE } from '@src/model/message'
/* types */
import { Options } from '@src/types'
/* util */
import { execCommand } from '@src/util/command'
import { modifyVersion, VersionData } from '@src/util/version'
import Log from '@src/util/log'

async function build(options: Options, versionData: VersionData, buildScript?: string) {
  try {
    
    Log.info(BUILDING_MESSAGE)
    
    await execCommand(buildScript ?? options.npm.buildCommand)
    
    Log.info(BUILD_SUCCESS_MESSAGE)
    
  } catch (error) {
    
    modifyVersion(options.projectRootPath, versionData.originVersion, versionData.originVersion)
    
    Log.error(BUILD_ERROR_MESSAGE)
    
    throw new Error(error)
    
  }
  
  return null
}

export default build
