
import * as minimist from 'minimist'
import { Options, PowerPartial } from '@src/types'

function argv(argv: string[]): PowerPartial<Options> {
  
  const args = minimist(argv)
  
  return {
    npm: {
      versionType: args.npmVersionType,
    }
  }
}

export function getArgvData() {
  return argv(process.argv.slice(2))
}

export default {
  getArgvData
}
