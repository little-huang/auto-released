
import * as fs from 'fs'
import * as path from 'path'
import * as semver from 'semver'
import * as inquirer from 'inquirer'

import { isEmpty } from 'lodash'

/* types */
import { Options } from './..//types'
/* model */
import { MANUALLY_CANCEL_RELEASE_VERSION_ERROR_MESSAGE, MODIFY_VERSION_MESSAGE } from '@src/model/message'
/* question */
import { confirmReleaseVersion } from '@src/util/question'
/* util */
import { readFileSync, writeFileSync } from '@src/util/file'
import Log from '@src/util/log'

export interface VersionData {
  newVersion: string
  originVersion: string
}

const prompt = inquirer.createPromptModule({ output: process.stderr })
const releaseType = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease']

function getPackageVersion(projectRootPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    
    const packageJSONFilePath = path.resolve(projectRootPath, 'package.json')
    
    if (!fs.existsSync(packageJSONFilePath)) {
      reject(new Error(`${packageJSONFilePath} doesn't exist package.json`))
    }
    
    const originVersion = require(packageJSONFilePath).version
    
    if (!originVersion) {
      reject(new Error(`${packageJSONFilePath}/package.json doesn't exist version property`))
    }
    
    resolve(originVersion)
    
  })
}

async function getCIReleaseVersionData(options: Options): Promise<VersionData> {
  try {
    
    const originVersion = await getPackageVersion(options.projectRootPath)
    let newVersion = semver.inc(originVersion, options.npm.versionType)
    
    if (isEmpty(options.npm.versionType)) {
      newVersion = originVersion
      
      Log.warn(`npm.versionType is empty, use origin version ${originVersion}`)
    }
    
    return { 
      newVersion,
      originVersion 
    }
    
  } catch (error) {
    throw error;
  }
}

async function getReleaseVersionData(projectRootPath: string): Promise<VersionData> {
  
  try {
    
    const originVersion = await getPackageVersion(projectRootPath)
    const choices = releaseType.map(item => `${item}: ${semver.inc(originVersion, item)}`)
    
    const { version } = await prompt([{
      name: 'version',
      type: 'list',
      message: 'Please select the release version',
      choices
    }])
    
    const newVersion = version.split(':')[1].trim()
    
    return { 
      newVersion,
      originVersion 
    }
    
  } catch (error) {
    throw error;
  }
  
}

async function releaseVersion(options: Options, isCI: boolean): Promise<VersionData> {
  
  try {
    
    const { newVersion, originVersion } = await getReleaseVersionData(options.projectRootPath)
    const isConfirmReleaseVersion = await confirmReleaseVersion(newVersion)
    
    if (!isConfirmReleaseVersion && !isCI) {
      throw new Error(MANUALLY_CANCEL_RELEASE_VERSION_ERROR_MESSAGE)
    }
    
    return {
      newVersion,
      originVersion
    }
    
  } catch (error) {
    throw error;
  }
  
}

function modifyVersion(projectRootPath: string, version: string, originVersion: string) {
  
  const PackagePath = `${projectRootPath}/package.json`
  
  let packageString = readFileSync(PackagePath)
  packageString = packageString.replace(originVersion, version)
  writeFileSync(PackagePath, packageString)
  
  modifyVersionLog(version)
}

function modifyVersionLog(version, success = true) {
  Log.info(`${version} ${MODIFY_VERSION_MESSAGE}`)
}

export {
  getReleaseVersionData,
  getCIReleaseVersionData,
  releaseVersion,
  modifyVersion,
  getPackageVersion,
  releaseType
}

export default {
  getReleaseVersionData,
  getCIReleaseVersionData,
  releaseVersion,
  modifyVersion,
  getPackageVersion,
  releaseType
}
