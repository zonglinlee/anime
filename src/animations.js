import {
  getAnimationType,
} from './values.js';

import {
  normalizeTweens,
} from './tweens.js';

function createAnimation(animatable, prop) {
  const animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    const tweens = normalizeTweens(prop, animatable);
    const firstTween = tweens[0];
    const lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      delay: firstTween.delay,
      duration: lastTween.end,
      endDelay: lastTween.endDelay
    }
  }
}

export function getAnimations(animatables, properties) {
  const animations = [];
  for (let a = 0, aLength = animatables.length; a < aLength; a++) {
    const animatable = animatables[a];
    if (animatable) {
      for (let p = 0, pLength = properties.length; p < pLength; p++) {
        animations.push(createAnimation(animatable, properties[p]));
      }
    }
  }
  return animations;
}
