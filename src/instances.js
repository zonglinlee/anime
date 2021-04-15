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
  const animationsLength = animations.length;
  const { delay, duration, endDelay } = tweenSettings;

  if (!animationsLength) {
    return { delay, duration, endDelay };
  }

  const timings = {};

  for (let i = 0; i < animationsLength; i++) {
    const anim = animations[i];
    const animTlOffset = anim.timelineOffset;
    const delay = animTlOffset + anim.delay;
    if (!timings.delay || delay < timings.delay) {
      timings.delay = delay;
    }
    const duration = animTlOffset + anim.duration;
    if (!timings.duration || duration > timings.duration) {
      timings.duration = duration;
    }
    const endDelay = animTlOffset + anim.duration - anim.endDelay;
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
