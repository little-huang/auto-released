/* model */
import { GIT_STATUS_NOT_CLEAN_MESSAGE } from '@src/model/message'
import { 
  GIT_ADD_ALL_COMMAND, 
  GIT_ADD_DOT_COMMAND, 
  GIT_CHECKOUT_COMMAND, 
  GIT_CHECKOUT_DOT_COMMAND, 
  GIT_COMMIT_COMMAND, 
  GIT_PUSH_COMMAND, 
  GIT_RESTORE_DOT_COMMAND, 
  GIT_STATUS_PORCELAIN_COMMAND, 
  GIT_TAG,
  GIT_TAG_DELETE,
  GIT_TAG_DELETE_ORIGIN,
  GIT_TAG_ORIGIN
} from '@src/model/command'
/* util */
import { execCommand } from '@src/util/command'
import Log from '@src/util/log'

async function checkWorkSpaceClean(): Promise<void> {
  
  const stdout = await execCommand(GIT_STATUS_PORCELAIN_COMMAND)
  
  if (stdout) {
    throw new Error(GIT_STATUS_NOT_CLEAN_MESSAGE)
  }
  
}

function switchToMasterBranch(masterBranch: string): Promise<string[]> {
  
  const checkoutMasterBranchCommand = `${GIT_CHECKOUT_COMMAND} ${masterBranch}`
  
  return execCommand(checkoutMasterBranchCommand)
}

async function push(version: string) {
  
  const stdout = await execCommand(GIT_STATUS_PORCELAIN_COMMAND)
  
  await execCommand(GIT_ADD_ALL_COMMAND)
  await execCommand(GIT_ADD_DOT_COMMAND)
  
  if (stdout) {
    await execCommand(`${GIT_COMMIT_COMMAND} 'release: [${version}]'`)
  }
  
  await execCommand(GIT_PUSH_COMMAND)
  
  Log.info(`Pushed to origin ${version} success ✅`)
}

async function tag(version: string) {
  
  try {
    await execCommand(`${GIT_TAG_DELETE} ${version}`)
    await execCommand(`${GIT_TAG_DELETE_ORIGIN}${version}`)
  } catch (error) {
    
  }
  
  await execCommand(`${GIT_TAG} ${version}`)
  await execCommand(`${GIT_TAG_ORIGIN} ${version}`)
  
  Log.info(`Pushed to origin tag ${version} success ✅`)
}

async function restore() {
  await execCommand(GIT_RESTORE_DOT_COMMAND)
  await execCommand(GIT_CHECKOUT_DOT_COMMAND)
}

async function deleteTag(version: string) {
  try {
    await execCommand(`${GIT_TAG} -d ${version}`)
    await execCommand(`${GIT_TAG_ORIGIN} :refs/tags/${version}`)
  } catch (error) {
    Log.warn(error)
  }
}

export {
  push,
  checkWorkSpaceClean,
  switchToMasterBranch,
  tag,
  deleteTag,
  restore
}

export default {
  push,
  checkWorkSpaceClean,
  switchToMasterBranch,
  tag,
  deleteTag,
  restore
}