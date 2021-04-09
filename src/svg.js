import {
  pi,
} from './consts.js';

import {
  selectString,
  is,
} from './helpers.js';

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return pi * 2 * el.getAttribute('r');
}

function getRectLength(el) {
  return (el.getAttribute('width') * 2) + (el.getAttribute('height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: el.getAttribute('x1'), y: el.getAttribute('y1')}, 
    {x: el.getAttribute('x2'), y: el.getAttribute('y2')}
  );
}

function getPolylineLength(el) {
  const points = el.points;
  if (is.und(points)) return;
  let totalLength = 0;
  let previousPos;
  for (let i = 0 ; i < points.numberOfItems; i++) {
    const currentPos = points.getItem(i);
    if (i > 0) totalLength += getDistance(previousPos, currentPos);
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  const points = el.points;
  if (is.und(points)) return;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

function getTotalLength(el) {
  if (el.getTotalLength) return el.getTotalLength();
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  const pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

function getParentSvgEl(el) {
  let parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    const parentNode = parentEl.parentNode;
    if (!is.svg(parentNode)) break;
    parentEl = parentNode;
  }
  return parentEl;
}

// SVG Responsive utils

function getParentSvg(pathEl, svgData) {
  const svg = svgData || {};
  const parentSvgEl = svg.el || getParentSvgEl(pathEl);
  const rect = parentSvgEl.getBoundingClientRect();
  const viewBoxAttr = parentSvgEl.getAttribute('viewBox');
  const width = rect.width;
  const height = rect.height;
  const viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  }
}

// Path animation

function getPath(path, percent) {
  const pathEl = is.str(path) ? selectString(path)[0] : path;
  const p = percent || 100;
  return function(property) {
    return {
      property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathPoint(pathEl, progress, offset = 0) {
  const length = progress + offset >= 1 ? progress + offset : 0;
  return pathEl.getPointAtLength(length);
}

function getPathProgress(pathObject, progress, isPathTargetInsideSVG) {
  const pathEl = pathObject.el;
  const parentSvg = getParentSvg(pathEl, pathObject.svg);
  const p = getPathPoint(pathEl, progress, 0);
  const p0 = getPathPoint(pathEl, progress, -1);
  const p1 = getPathPoint(pathEl, progress, +1);
  const scaleX = isPathTargetInsideSVG ? 1 : parentSvg.w / parentSvg.vW;
  const scaleY = isPathTargetInsideSVG ? 1 : parentSvg.h / parentSvg.vH;
  switch (pathObject.property) {
    case 'x': return (p.x - parentSvg.x) * scaleX;
    case 'y': return (p.y - parentSvg.y) * scaleY;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / pi;
  }
}

export {
  setDashoffset,
  getPath,
  getPathProgress,
}
