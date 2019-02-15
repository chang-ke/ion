/*eslint-disable */
const toString = Object.prototype.toString;

export function isArray(param: any) {
  return param !== null && typeof param === 'object' && param instanceof Array;
}

export function isObject(param: any) {
  return param !== null && !isArray(param) && typeof param === 'object';
}

export function isString(param: any) {
  return typeof param === 'string';
}