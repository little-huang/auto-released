
import * as fs from 'fs'

function readFileSync(path: string): string {
  
  let data = fs.readFileSync(path, { encoding: 'utf-8' })
  
  return data
}

function writeFileSync(path, data) {
  fs.writeFileSync(path, data)
}

function removeFileSync(path) {
  fs.unlinkSync(path)
}

export {
  readFileSync,
  writeFileSync,
  removeFileSync
}

export default {
  readFileSync,
  writeFileSync,
  removeFileSync
}