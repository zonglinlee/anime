import {
  rgbExecRgx,
  hslExecRgx,
  hslaExecRgx
} from './consts.js';

import {
  round,
  is
} from './helpers.js';

// RGB / RGBA -> RGBA

function rgbToRgba(rgbValue) {
  const rgb = rgbExecRgx.exec(rgbValue);
  return rgb ? `rgba(${rgb[1]},1)` : rgbValue;
}

// HEX3 / HEX3A / HEX6 / HEX6A -> RGBA

function hexToRgba(hexVal) {
  const hexLength = hexVal.length;
  const isShort = hexLength === 4 || hexLength === 5;
  const isAlpha = hexLength === 5 || hexLength === 9;
  const hexPrefix = '0x';
  const r = +(hexPrefix + hexVal[1] + hexVal[isShort ? 1 : 2]);
  const g = +(hexPrefix + hexVal[isShort ? 2 : 3] + hexVal[isShort ? 2 : 4]);
  const b = +(hexPrefix + hexVal[isShort ? 3 : 5] + hexVal[isShort ? 3 : 6]);
  const a = isAlpha ? +((hexPrefix + hexVal[isShort ? 4 : 7] + hexVal[isShort ? 4 : 8]) / 255).toFixed(3) : 1;
  return `rgba(${r},${g},${b},${a})`;
}

// HSL / HSLA -> RGBA

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgba(hslVal) {
  const hsl = hslExecRgx.exec(hslVal) || hslaExecRgx.exec(hslVal);
  const h = hsl[1] / 360;
  const s = hsl[2] / 100;
  const l = hsl[3] / 100;
  const a = hsl[4] || 1;
  let r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  return `rgba(${round(r * 255)},${round(g * 255)},${round(b * 255)},${a})`;
}

function normalizeColorToRgba(colorValue) {
  if (is.rgb(colorValue)) return rgbToRgba(colorValue);
  if (is.hex(colorValue)) return hexToRgba(colorValue);
  if (is.hsl(colorValue)) return hslToRgba(colorValue);
}

export {
  normalizeColorToRgba
}
