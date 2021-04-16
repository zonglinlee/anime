import {
  transformsExecRgx,
} from './consts.js';

import {
  is,
} from './helpers.js';

function getElementTransforms(el) {
  if (!is.dom(el)) return;
  const str = el.style.transform;
  const transforms = new Map();
  if (!str) return transforms;
  let t;
  let index = 0;
  while (t = transformsExecRgx.exec(str)) {
    transforms.set(t[1], t[2]);
    index++;
  }
  return transforms;
}

function createTransforms(el) {
  const transforms = {
    map: {},
    array: [],
    length: 0
  }

  if (is.dom(el)) return transforms;

  const str = el.style.transform;

  if (!str) return transforms;

  let t;
  let index = 0;

  while (t = transformsExecRgx.exec(str)) {
    const name = t[1];
    const value = t[2];
    const arrayIndex = transforms.length * 4;
    transforms.map[name] = index;
    transforms.array[arrayIndex] = name;
    transforms.array[arrayIndex + 1] = '(';
    transforms.array[arrayIndex + 2] = value;
    transforms.array[arrayIndex + 3] = ')';
    transforms.length = index++;
  }

  return transforms;
}