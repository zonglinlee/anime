import {
  is,
  flattenArray,
  filterArray,
  toArray,
} from './helpers.js';

import {
  getElementTransforms,
} from './values.js';

export function parseTargets(targets) {
  const targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, (item, pos, self) => self.indexOf(item) === pos);
}

export function getAnimatables(targets) {
  const parsed = parseTargets(targets);
  return parsed.map((t, i) => {
    return {
      target: t,
      id: i,
      total: parsed.length,
      transforms: {
        list: getElementTransforms(t)
      }
    }
  });
}
