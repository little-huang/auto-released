/* types */
import { Options } from '@src/types'
/* process */
import * as process from 'process'

const DefaultCIOptions: Options = {
  projectRootPath: process.cwd(),
  git: {
    tag: true,
    push: true,
    checkClean: true
  },
  npm: {
    buildCommand: '',
    build: true,
    publish: true,
    versionType: 'patch'
  },
  webhook: {
    enabled: false,
    url: '',
    body: {}
  }
}

const DefaultOptions: Options =  {
  projectRootPath: process.cwd(),
  git: {
    tag: undefined,
    push: undefined,
    checkClean: undefined
  },
  npm: {
    buildCommand: undefined,
    build: undefined,
    publish: undefined,
    versionType: undefined
  },
  webhook: {
    enabled: false,
    url: '',
    body: {}
  }
}

export {
  DefaultCIOptions,
  DefaultOptions
}

export default {
  DefaultCIOptions,
  DefaultOptions
}