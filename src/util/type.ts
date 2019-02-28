import { isArray } from 'util';

// eslint-disable-next-line
const toString = Object.prototype.toString;

export function isObject(param?: any) {
  return param !== null && !isArray(param) && typeof param === 'object';
}
