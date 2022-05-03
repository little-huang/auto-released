/* utils */
import { writeFileSync } from '@src/util/file'

function createInitConfigFile() {
  const config = `module.exports = {
  git: {
    checkClean: true,
    push: true,
    tag: true
  },
  npm: {
    build: true,
    publish: true,
    // buildCommand: '',
    // versionType: 'patch'
  },
  webhook: {
    enabled: false,
    url: '',
    body: {}
  },
}
`
  const filePath = `${process.cwd()}/auto.released.config.js`
  writeFileSync(filePath, config)
}

export {
  createInitConfigFile
}

export default {
  createInitConfigFile
}