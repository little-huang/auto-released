
require('module-alias/register')

import * as _ from 'lodash'

/* model */
import { DefaultOptions } from '@src/model/options'
import { AUTO_RELEASE_MESSAGE } from '@src/model/message'
/* types */
import { Options, PowerPartial } from '@src/types'
/* utils */
import { exit, setChildProcessExecOptions } from '@src/util/command'
import { checkWorkSpaceClean, push, tag } from '@src/util/git'
import Log from '@src/util/log'
import { getCIReleaseVersionData, modifyVersion, releaseVersion } from '@src/util/version'
import { getPackageJSONData } from '@src/util/packageJSON'
import { getArgvData } from '@src/util/argv'
import { assignOptions, setDefaultValue } from '@src/util/assign'
import { getLocalFileOptions } from '@src/util/options'
import { isTrue, isUndefined, isNotFalse } from '@src/util/type'
/* build */
import build from '@src/build'
/* publish */
import publish from '@src/publish'
/* webhook */
import webhook from '@src/webhook'
/* question */
import { confirmBuild, confirmPublish, confirmPush, confirmTag, selectBuildScript } from '@src/util/question'

async function run(options: Partial<Options>) {
  
  try {
    
    const newOptions: Options = Object.assign({}, options, DefaultOptions)
    
    setChildProcessExecOptions(newOptions.projectRootPath)
    
    if (isUndefined(newOptions.git.checkClean) || isTrue(newOptions.git.checkClean)) {
      await checkWorkSpaceClean()
    }
    
    const versionData = await releaseVersion(newOptions, false)
    modifyVersion(newOptions.projectRootPath, versionData.newVersion, versionData.originVersion)
    
    const isConfirmBuild = confirmBuild()
    if (isConfirmBuild) {
      await build(newOptions, versionData)
    }
    
    const isConfirmPush = confirmPush()
    if (isConfirmPush) {
      await push(versionData.newVersion)
    }
    
    const isConfirmPublish = confirmPublish()
    if (isConfirmPublish) {
      await publish()
    }
    
    const isConfirmTag = confirmTag()
    if (isConfirmTag) {
      await tag(versionData.newVersion)
    }
    
    const isConfirmWebhook = newOptions.webhook.enabled && newOptions.webhook.url
    if (isConfirmWebhook) {
      await webhook(newOptions, versionData)
    }
    
    Log.info(AUTO_RELEASE_MESSAGE)
    
  } catch (error) {
    
    Log.error(error)
    
    exit()
    
  }
  
}

async function commandLineRun() {
  try {
    
    const localFileOptions = getLocalFileOptions(DefaultOptions, false)
    const newOptions: Options = assignOptions(DefaultOptions, localFileOptions)
    
    if (isNotFalse(newOptions.git.checkClean)) {
      await checkWorkSpaceClean()
    }
    
    const versionData = await releaseVersion(newOptions, false)
    modifyVersion(newOptions.projectRootPath, versionData.newVersion, versionData.originVersion)
    
    const isConfirmBuild = isNotFalse(newOptions.npm.build) ? await confirmBuild() : newOptions.npm.build
    const packageJSONData = getPackageJSONData(newOptions.projectRootPath)
    const packageJSONScriptData = packageJSONData?.scripts ?? {}
    
    if (isConfirmBuild) {
      
      let buildCommand
      
      if (newOptions.npm.buildCommand) {
        buildCommand = newOptions.npm.buildCommand
      }
      
      if (Object.keys(packageJSONData).length && Object.keys(packageJSONScriptData).length) {
        buildCommand = await selectBuildScript(packageJSONScriptData)
      }
      
      if (buildCommand) {
        await build(newOptions, versionData, buildCommand)
      }
      
    }
    
    const isConfirmPush = isNotFalse(newOptions.git.push) ? await confirmPush() : newOptions.git.push
    if (isConfirmPush) {
      await push(versionData.newVersion)
    }
    
    const isConfirmPublish = isNotFalse(newOptions.npm.publish) ? await confirmPublish() : newOptions.npm.publish
    if (isConfirmPublish) {
      await publish()
    }
    
    const isConfirmTag = isNotFalse(newOptions.git.tag) ? await confirmTag() : newOptions.git.tag
    if (isConfirmTag) {
      await tag(versionData.newVersion)
    }
    
    const isConfirmWebhook = newOptions.webhook.enabled && newOptions.webhook.url
    if (isConfirmWebhook) {
      await webhook(newOptions, versionData)
    }
    
    Log.info(AUTO_RELEASE_MESSAGE)
    
  } catch (error) {
    
    Log.error(error)
    
    exit()
    
  }
}

async function CIRun() {
  try {
    
    const localFileOptions = getLocalFileOptions(DefaultOptions, true)
    const argvOptions: PowerPartial<Options> = getArgvData()
    let newOptions: Options = assignOptions(DefaultOptions, localFileOptions, argvOptions)
    
    newOptions = setDefaultValue(newOptions)
    
    if (newOptions.git.checkClean) {
      await checkWorkSpaceClean()
    }
    
    const versionData = await getCIReleaseVersionData(newOptions)
    modifyVersion(newOptions.projectRootPath, versionData.newVersion, versionData.originVersion)
    
    const isConfirmBuild = newOptions.npm.build
    const buildCommand = newOptions.npm.buildCommand
    
    if (isConfirmBuild && buildCommand) {
      await build(newOptions, versionData, buildCommand)
    }
    
    const isConfirmPush = newOptions.git.push
    if (isConfirmPush) {
      await push(versionData.newVersion)
    }
    
    const isConfirmPublish = newOptions.npm.publish
    if (isConfirmPublish) {
      await publish()
    }
    
    const isConfirmTag = newOptions.git.tag
    if (isConfirmTag) {
      await tag(versionData.newVersion)
    }
    
    const isConfirmWebhook = newOptions.webhook.enabled && newOptions.webhook.url
    if (isConfirmWebhook) {
      await webhook(newOptions, versionData)
    }
    
    Log.info(AUTO_RELEASE_MESSAGE)
    
  } catch (error) {
    
    Log.error(error)
    
    exit()
    
  }
}

export {
  commandLineRun,
  CIRun,
  run
}
