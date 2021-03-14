import {
  unitsExecRgx,
} from './consts.js';

import {
  stringContains,
} from './helpers.js';

export function getUnit(val) {
  const split = unitsExecRgx.exec(val);
  if (split) return split[1];
}

export function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') return 'px';
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
}
