import {
  defaultInstanceSettings,
  defaultTweenSettings,
} from './consts.js';

import {
  replaceObjectProps,
  mergeObjects,
} from './helpers.js';

import {
  getKeyframesFromProperties,
} from './keyframes.js';

import {
  getAnimatables,
} from './animatables.js';

import {
  getAnimations,
} from './animations.js';

import {
  getTimingsFromAnimations,
} from './timings.js';

let instancesId = 0;

export function createInstance(params) {
  const instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  const tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  const properties = getKeyframesFromProperties(tweenSettings, params);
  const animatables = getAnimatables(params.targets);
  const animations = getAnimations(animatables, properties);
  const timings = getTimingsFromAnimations(animations, tweenSettings);
  return mergeObjects(instanceSettings, {
    id: instancesId++,
    children: [],
    animatables: animatables,
    animations: animations,
    delay: timings.delay,
    duration: timings.duration,
    endDelay: timings.endDelay,
  });
}
