
/* process */
import * as ChildProcess from 'child_process'
import * as process from 'process'
/* util */
import { isString } from '@src/util/type'

let childProcessExecOptions = {
  cwd: process.cwd(),
  encoding: 'utf-8'
}

function execCommand(command: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(
      command,
      childProcessExecOptions, 
      (error, stdout, status) => {
        
        let stdoutString = stdout.toString()
        let stdoutStrings = stdoutString && stdoutString.split('\n').filter(line => !!line).map(line => line.trim());
        
        error ? reject(error) : resolve(stdoutStrings)
        
      }
    )
  })
}

function exit(): void {
  process.exit(1)
}

function setChildProcessExecOptions(projectRootPath: string | undefined | null): void {
  
  if (isString(projectRootPath)) {
    childProcessExecOptions.cwd = projectRootPath
  }
  
}

export {
  exit,
  execCommand,
  setChildProcessExecOptions,
  childProcessExecOptions
}

export default {
  exit,
  execCommand,
  setChildProcessExecOptions,
  childProcessExecOptions
}
