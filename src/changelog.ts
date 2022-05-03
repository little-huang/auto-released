import * as conventionalChangelogCore from 'conventional-changelog-core'
import * as fs from 'fs'

import { readFileSync, removeFileSync, writeFileSync } from '@src/util/file'

const TempFileName = 'node_modules/temp.text'

function getChangeLog(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    
    const data = conventionalChangelogCore()
    const writable = fs.createWriteStream(TempFileName)
    
    data.pipe(writable)
    
    data.on('end', () => {
      
      const changeLog: string = readFileSync(TempFileName)
      
      writeFileSync(TempFileName, '')
      
      removeFileSync(TempFileName)
      
      resolve(changeLog)
    })
    
  })
}

export {
  getChangeLog
}

export default {
  getChangeLog
}
