
import * as inquirer from 'inquirer'

const prompt = inquirer.createPromptModule({ output: process.stderr })

async function confirmReleaseVersion(version: string) {
  
  const promptList = [{
    type: 'confirm',
    message: `Confirm to publish this (${version}) Version? `,
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}

async function confirmBuild() {
  
  const promptList = [{
    type: 'confirm',
    message: 'Do you need to build?',
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}

async function confirmPublish() {
  
  const promptList = [{
    type: 'confirm',
    message: 'Do you need to publish?',
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}


async function confirmCommit() {
  
  const promptList = [{
    type: 'confirm',
    message: 'Do you need to commit?',
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}

async function confirmPush() {
  
  const promptList = [{
    type: 'confirm',
    message: 'Do you need to push?',
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}

async function confirmTag() {
  
  const promptList = [{
    type: 'confirm',
    message: 'Do you need to tag?',
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}

async function confirmWebhook() {
  
  const promptList = [{
    type: 'confirm',
    message: 'Do you need to webhook?',
    name: 'confirm'
  }]
  
  return (
    inquirer
      .prompt(promptList)
      .then((answers: { confirm: boolean }) => {
        return answers.confirm
      })
  )
  
}

async function selectBuildScript(scriptData: Record<string, any>) {
  
  const scripts = Object.keys(scriptData).map(key => {
    return `${key}: ${scriptData[key]}`
  })
  
  return (
    prompt([
      {
        name: 'buildScript',
        type: 'list',
        message: 'Please select the build script',
        choices: scripts
      }
    ])
    .then(({ buildScript }) => {
      return `npm run ${buildScript.split(':')[0]}`
    })
  )
  
}

export {
  confirmBuild,
  confirmCommit,
  confirmPublish,
  confirmTag,
  confirmReleaseVersion,
  confirmWebhook,
  confirmPush,
  selectBuildScript
}

export default {
  confirmBuild,
  confirmTag,
  confirmPublish,
  confirmReleaseVersion,
  confirmPush,
  confirmWebhook,
  selectBuildScript
}
