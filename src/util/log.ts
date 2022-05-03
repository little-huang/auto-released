
import * as colors from 'colors'

function error(message: string, data?: any): void {
  console.log(`${colors.red(`ERROR: ${message}`)}`, data || '')
}

function warn(message: string, data?: any): void {
  console.log(`${colors.yellow(`WARN: ${message}`)}`, data || '')
}

function info(message: string, data?: any): void {
  console.log(`${colors.green(`INFO: ${message}`)}`, data || '')
}

function output(message: string, data?: any): void {
  console.log(`${colors.gray(`LOG: ${message}`)}`, data || '')
}

export {
  error,
  warn,
  info,
  output
}

export default {
  error,
  warn,
  info,
  output
}