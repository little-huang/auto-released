import { Options, PowerPartial } from '@src/types'
import { isPlainObject, isUndefined } from '@src/util/type'
import { assign } from 'lodash'

function assignOptions(defaultOptions: Options, localFileOptions: Options, argvOptions?: PowerPartial<Options>): Options {
  
  let options = {} as Options;
  
  options = assign({}, defaultOptions, localFileOptions, argvOptions);
  
  Object.keys(defaultOptions).forEach(key => {
    
    if (isPlainObject(defaultOptions[key])) {
      options[key] = assignOptions(defaultOptions?.[key], localFileOptions?.[key], argvOptions?.[key])
    } else {
      options[key] = isUndefined(argvOptions?.[key]) 
        ? isUndefined(localFileOptions?.[key])
          ? defaultOptions[key]
          : localFileOptions[key]
        : argvOptions[key]
    }
    
  })
  
  return options
}

function setDefaultValue(options: Options): Options {
  
  if (isUndefined(options.npm.versionType)) {
    options.npm.versionType = 'patch'
  }
  
  return options
}

export {
  assignOptions,
  setDefaultValue
}

export default {
  assignOptions,
  setDefaultValue
}