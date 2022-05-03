
import * as path from 'path'
import * as fs from 'fs'
/* util */
import { readFileSync } from '@src/util/file'

function getPackageJSONData(projectRootPath: string) {
  
  const packageJSONFilePath = path.resolve(projectRootPath, 'package.json')
  
  if (!fs.existsSync(packageJSONFilePath)) {
    return {}
  }
  
  const packageJSONString = readFileSync(packageJSONFilePath)
  const packageJSONObject = JSON.parse(packageJSONString)
  
  return packageJSONObject
}

export {
  getPackageJSONData
}

export default {
  getPackageJSONData
}
