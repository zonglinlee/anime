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

let instancesId = 0;

export function getInstanceTimings(animations, tweenSettings) {
  const animLength = animations.length;
  const timings = {
    delay: tweenSettings.delay,
    duration: tweenSettings.duration,
    endDelay: tweenSettings.endDelay
  }

  if (!animLength) return timings;

  for (let i = 0; i < animLength; i++) {
    const anim = animations[i];
    const tlOffset = anim.timelineOffset;

    const delay = tlOffset + anim.delay;
    if (!timings.delay || delay < timings.delay) {
      timings.delay = delay;
    }

    const duration = tlOffset + anim.duration;
    if (!timings.duration || duration > timings.duration) {
      timings.duration = duration;
    }

    const endDelay = tlOffset + anim.duration - anim.endDelay;
    if (!timings.endDelay || endDelay > timings.endDelay) {
      timings.endDelay = endDelay;
    }
  }

  timings.endDelay = timings.duration - timings.endDelay;

  return timings;
}

export function createInstance(params) {
  const instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  const tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  const properties = getKeyframesFromProperties(tweenSettings, params);
  const animatables = getAnimatables(params.targets);
  const animations = getAnimations(animatables, properties);
  const timings = getInstanceTimings(animations, tweenSettings);
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
