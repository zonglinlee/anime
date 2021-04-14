import {
  is,
} from './helpers.js';

import {
  parseEasings,
} from './easings.js';

import {
  getFunctionValue,
  getOriginalTargetValue,
  getRelativeValue,
  decomposeValue,
} from './values.js';

import {
  getUnit,
} from './units.js';

// Tweens

function normalizeTweenValues(tween, animatable) {
  const t = {};
  for (let p in tween) {
    let value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(v => getFunctionValue(v, animatable));
      if (value.length === 1) {
        value = value[0];
      }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

export function normalizeTweens(prop, animatable) {
  let previousTween;
  return prop.tweens.map(t => {
    const tween = normalizeTweenValues(t, animatable);
    const tweenValue = tween.value;
    let to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    const toUnit = getUnit(to);
    const originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    const previousValue = previousTween ? previousTween.to.original : originalValue;
    const from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    const fromUnit = getUnit(from) || getUnit(originalValue);
    const unit = toUnit || fromUnit;
    if (is.und(to)) to = previousValue;
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    // TODO use a map for easings instead of 
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) {
      tween.round = 1;
    }
    previousTween = tween;
    return tween;
  });
}
