import {
  is,
  stringContains,
  arrayContains,
} from './helpers.js';

import {
  convertPxToUnit,
  getTransformUnit,
  getUnit,
} from './units.js';

import {
  lowerCaseRgx,
  transformsExecRgx,
  relativeValuesExecRgx,
  whiteSpaceTestRgx,
  validTransforms,
} from './consts.js';

export function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) return val;
  return val(animatable.target, animatable.id, animatable.total);
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    const uppercasePropName = prop.replace(lowerCaseRgx, '$1-$2').toLowerCase();
    const value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

export function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(el.getAttribute(prop)) || (is.svg(el) && el[prop]))) return 'attribute';
  if (is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
  if (el[prop] != null) return 'object';
}

export function getElementTransforms(el) {
  if (!is.dom(el)) return;
  const str = el.style.transform || '';
  const transforms = new Map();
  let m;
  while (m = transformsExecRgx.exec(str)) transforms.set(m[1], m[2]);
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  const defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  const value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

export function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return target.getAttribute(propName);
    default: return target[propName] || 0;
  }
}

export function getRelativeValue(to, from) {
  const operator = relativeValuesExecRgx.exec(to);
  if (!operator) return to;
  const u = getUnit(to) || 0;
  const x = parseFloat(from);
  const y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

export function validateValue(val, unit) {
  if (is.col(val)) return normalizeColorToRgba(val);
  if (whiteSpaceTestRgx.test(val)) return val;
  const originalUnit = getUnit(val);
  const unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) return unitLess + unit;
  return unitLess;
}
