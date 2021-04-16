// Default animation parameters

export const defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0,
}

export const defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0,
}

// Global settings

export const settings = {
  speed: 1,
  suspendWhenDocumentHidden: true,
}

// Transforms

export const validTransforms = [
  'translateX',
  'translateY',
  'translateZ',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skew',
  'skewX',
  'skewY',
  'perspective',
  'matrix',
  'matrix3d',
];

// Regex

export const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
export const rgbTestRgx = /^rgb/i;
export const hslTestRgx = /^hsl/i;
export const rgbExecRgx = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/i;
export const hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
export const hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
export const springTestRgx = /^spring/;
export const easingsExecRgx = /\(([^)]+)\)/;
export const unitsExecRgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/;
export const digitWithExponentRgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
export const lowerCaseRgx = /([a-z])([A-Z])/g;
export const transformsExecRgx = /(\w+)\(([^)]*)\)/g;
export const relativeValuesExecRgx = /^(\*=|\+=|-=)/;
export const whiteSpaceTestRgx = /\s/g;

// Math variables

export const pi = Math.PI;

// Misc

export const emptyString = '';

