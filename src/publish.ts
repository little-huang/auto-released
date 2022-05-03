/* model */
import { NPM_PUBLISH_COMMAND, NPM_WHO_AM_I } from '@src/model/command'
import { NPM_PUBLISH_SUCCESS_MESSAGE } from '@src/model/message'
/* util */
import { execCommand } from '@src/util/command'
import Log from '@src/util/log'

async function publish() {
  
  execCommand(NPM_PUBLISH_COMMAND)
  
  Log.info(NPM_PUBLISH_SUCCESS_MESSAGE)
  
}

async function checkIsNpmLogin(): Promise<boolean> {
  const result = await execCommand(NPM_WHO_AM_I)
  return result.includes('npm ERR! code ENEEDAUTH')
}

export default publish
