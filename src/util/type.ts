
const OBJECT_TO_STRING = Object.prototype.toString

function getObjectTag(value: unknown): string{
  
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  
  return OBJECT_TO_STRING.call(value)
}

function isString(value: unknown): boolean {
  return typeof value === 'string' 
}

function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined'
}

function isNotUndefined<T>(value: unknown): value is T {
  return value !== undefined
}

function isTrue(value: unknown): boolean {
  return value === true
}

function isNotFalse(value: unknown): boolean {
  return value !== false
}

function isFunction(value: unknown): boolean {
  return value && getObjectTag(value) === '[object Function]'
}

function isPlainObject<T>(value: unknown): value is T{
  
  if (value == null || typeof value != 'object' || getObjectTag(value) != '[object Object]') {
    return false
  }
  
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  
  return Object.getPrototypeOf(value) === proto
}

export {
  isString,
  isUndefined,
  isPlainObject,
  isTrue,
  isFunction,
  isNotUndefined,
  isNotFalse
}

export default {
  isString,
  isUndefined,
  isPlainObject,
  isTrue,
  isFunction,
  isNotUndefined,
  isNotFalse
}
