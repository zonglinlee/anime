import anime from '../../../src/index.js';

/* Ontersection observer */

!function(t,e){"use strict";function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||a(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,o=i.width*i.height;n?this.intersectionRatio=o/n:this.intersectionRatio=this.isIntersecting?1:0}function i(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=r(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function o(){return t.performance&&performance.now&&performance.now()}function r(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function s(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function h(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function c(t,e){var n=Math.max(t.top,e.top),i=Math.min(t.bottom,e.bottom),o=Math.max(t.left,e.left),r=Math.min(t.right,e.right),s=r-o,h=i-n;return s>=0&&h>=0&&{top:n,bottom:i,left:o,right:r,width:s,height:h}}function u(t){var e;try{e=t.getBoundingClientRect()}catch(n){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):a()}function a(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(t,e){for(var n=e;n;){if(n==t)return!0;n=p(n)}return!1}function p(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)return void("isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}));var f=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.observe=function(t){var e=this._observationTargets.some(function(e){return e.element==t});if(!e){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||0>t||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,h(t,"resize",this._checkForIntersections,!0),h(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():a();this._observationTargets.forEach(function(i){var r=i.element,s=u(r),h=this._rootContainsTarget(r),c=i.entry,a=t&&h&&this._computeTargetAndRootIntersection(r,e),l=i.entry=new n({time:o(),target:r,boundingClientRect:s,rootBounds:e,intersectionRect:a});c?t&&h?this._hasCrossedThreshold(c,l)&&this._queuedEntries.push(l):c&&c.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,i){if("none"!=t.getComputedStyle(n).display){for(var o=u(n),r=o,s=p(n),h=!1;!h;){var a=null,l=1==s.nodeType?t.getComputedStyle(s):{};if("none"==l.display)return;if(s==this.root||s==e?(h=!0,a=i):s!=e.body&&s!=e.documentElement&&"visible"!=l.overflow&&(a=u(s)),a&&(r=c(a,r),!r))break;s=p(s)}return r}},i.prototype._getRootRect=function(){var t;if(this.root)t=u(this.root);else{var n=e.documentElement,i=e.body;t={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var o=0;o<this.thresholds.length;o++){var r=this.thresholds[o];if(r==n||r==i||n>r!=i>r)return!0}},i.prototype._rootIsInDom=function(){return!this.root||l(e,this.root)},i.prototype._rootContainsTarget=function(t){return l(this.root||e,t)},i.prototype._registerInstance=function(){f.indexOf(this)<0&&f.push(this)},i.prototype._unregisterInstance=function(){var t=f.indexOf(this);-1!=t&&f.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=n}(window,document);

function isElementInViewport(el, inCB, outCB, rootMargin) {
  var margin = rootMargin || '-10%';
  function handleIntersect(entries, observer) {
    var entry = entries[0];
    if (entry.isIntersecting) {
      if (inCB && typeof inCB === 'function') inCB(el, entry);
    } else {
      if (outCB && typeof outCB === 'function') outCB(el, entry);
    }
  }
  var observer = new IntersectionObserver(handleIntersect, {rootMargin: margin});
  observer.observe(el);
}

function fitElToParent(el, padding) {
  function resize() {
    anime.setValue(el, {scale: 1});
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    anime.setValue(el, {scale: ratio});
  }
  resize();
  window.addEventListener('resize', resize);
}

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');
  var versionNumerEl = document.querySelector('.version-number');

  fitElToParent(logoAnimationEl, 20);

  versionNumerEl.innerHTML = anime.version;

  anime.setValue(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.setValue('.letter-e', {translateX: -56});
  anime.setValue('.dot', { translateX: 448, translateY: -100 });

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: true
  })
  .add({
    targets: '.letter-i .line',
    duration: 0,
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, 0)
  .add({
    targets: '.bounced',
    transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
    translateY: [
      {value: [100, -152], duration: 190, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
      {value: 4, duration: 120, easing: 'easeInQuad'},
      {value: 0, duration: 120, easing: 'easeOutQuad'}
    ],
    scaleX: [
      {value: [.35, .85], duration: 190, easing: 'easeOutQuad'},
      {value: 1.1, duration: 120, delay: 85, easing: 'easeInOutSine'},
      {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
    ],
    scaleY: [
      {value: [.8, 1.3], duration: 120, easing: 'easeOutSine'},
      {value: .75, duration: 120, delay: 180, easing: 'easeInOutSine'},
      {value: 1.07, duration: 180, delay: 25, easing: 'easeOutQuad'},
      {value: 1, duration: 250, delay: 15, easing: 'easeOutQuad'}
    ],
    delay: anime.stagger(90)
  }, 500)
  .add({
    targets: '.dot',
    opacity: { value: 1, duration: 100 },
    translateY: 270,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200},
    duration: 320,
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)'
  }, '-=490')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 },
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, '-=330')
  .add({
    targets: ['.letter-a', '.letter-n', '.letter-i', '.letter-e'],
    translateX: 0,
    easing: 'easeOutElastic(1, .6)',
    duration: 800,
    delay: anime.stagger(40, {from: 2.5}),
    change: function(a) { a.animatables[2].target.removeAttribute('stroke-dasharray'); }
  }, '-=600')
  .add({
    targets: '.dot',
    translateX: bouncePath('x'),
    translateY: bouncePath('y'),
    rotate: '1turn',
    scaleX: { value: 1, duration: 50, easing: 'easeOutSine' },
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutExpo' }
    ],
    easing: 'cubicBezier(0, .74, 1, .255)',
    duration: 800
  }, '-=660')
  .add({
    targets: '.letter-i rect',
    opacity: 0.001,
    duration: 1
  })
  .add({
    targets: '.dot',
    scaleY: 1,
    scaleX: 1,
    translateY: [
      {value: 262, duration: 100, easing: 'easeOutSine'},
      {value: 244, duration: 1000, easing: 'easeOutElastic(1, .8)'}
    ]
  })
  .add({
    targets: '.letter-m .line',
    d: function(el) { return el.dataset.d3 },
    easing: 'spring(.2, 200, 3, 60)',
  }, '-=1908')
  .add({
    targets: '.letter-i .line',
    transformOrigin: ['50% 100% 0', '50% 100% 0'],
    d: function(el) { return el.dataset.d2 },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    duration: 80
  }, '-=1100')
  .add({
    targets: '.logo-letter',
    translateY: [
      {value: 33, duration: 150, easing: 'easeOutQuart'},
      {value: 0, duration: 800, easing: 'easeOutElastic(1, .5)'}
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: anime.stagger(35, {from: 'center'})
  }, '-=1100')
  .add({
    targets: '.logo-text',
    translateY: [
      {value: 20, easing: 'easeOutQuad', duration: 100},
      {value: 0, easing: 'easeOutElastic(1, .9)', duration: 450}
    ],
    opacity: {value: [0.001, 1], duration: 50},
    duration: 500
  }, '-=970')
  .add({
    targets: ['.description-title','.description-paragraph'],
    translateY: {value: ['80px', 0], easing: 'cubicBezier(0.175, 0.865, 0.245, 0.840)'},
    opacity: {value: [0.001, 1], easing: 'cubicBezier(0.175, 0.865, 0.245, 0.840)'},
    duration: 3500,
    delay: anime.stagger(75)
  }, '-=700')
  .add({
    targets: '.top-header',
    opacity: {value: [0.001, 1], easing: 'linear'},
    duration: 700,
    begin: function(anim) {
      document.body.classList.add('intro-played');
    }
  }, '-=3550')

  //logoAnimationTL.seek(1400);
  // anime.speed = .1;

  return logoAnimationTL;

})();

var sphereAnimation = (function() {

  var sphereEl = document.querySelector('.sphere-animation');
  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElToParent(sphereEl);

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          stroke: {value: '#F6F4F2', duration: 150},
          translateX: [1, -2],
          translateY: [1, -2],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var introAnimation = anime.timeline({
    autoplay: false
  })
  .add({
    targets: sphereEl,
    translateX: [60, 0],
    translateY: [60, 0],
    duration: 4000,
    easing: 'easeOutSine',
  }, 0)
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 2000,
      easing: 'easeInOutCirc',
      delay: anime.stagger(80, {direction: 'reverse'})
    },
    fill: {
      value: 'rgba(37,36,35,.6)',
      delay: anime.stagger(60, {start: 2000, direction: 'reverse'})
    },
    opacity: [.001, 1],
    duration: 1000,
    delay: anime.stagger(60, {direction: 'reverse'}),
    easing: 'linear'
  }, 0);

  function play() {
    introAnimation.play();
    breathAnimation.play();
  }

  isElementInViewport(sphereEl, play, breathAnimation.pause);

})();

var builtInEasingsAnimation = (function() {

  var easingVisualizerEl = document.querySelector('.easing-visualizer');
  var barsWrapperEl = easingVisualizerEl.querySelector('.bars-wrapper');
  var dotsWrapperEl = easingVisualizerEl.querySelector('.dots-wrapper');
  var barsFragment = document.createDocumentFragment();
  var dotsFragment = document.createDocumentFragment();
  var numberOfBars = 89;
  var duration = 450;
  var animation;
  var paused = true;

  fitElToParent(easingVisualizerEl);

  for (var i = 0; i < numberOfBars; i++) {
    var barEl = document.createElement('div');
    var dotEl = document.createElement('div');
    barEl.classList.add('bar');
    dotEl.classList.add('dot');
    dotEl.classList.add('color-red');
    barsFragment.appendChild(barEl);
    dotsFragment.appendChild(dotEl);
  }

  barsWrapperEl.appendChild(barsFragment);
  dotsWrapperEl.appendChild(dotsFragment);

  var defaultEase = 'easeOutElastic';

  function play() {

    paused = false;

    if (animation) animation.pause();

    var easings = [];
    for (let ease in anime.penner) easings.push(ease);
    easings.push('steps('+anime.random(5, 20)+')');
    easings.push('cubicBezier(0.545, 0.475, 0.145, 1)');
    var ease = easings[anime.random(0, easings.length - 1)];

    animation = anime.timeline({
      duration: duration,
      easing: ease,
      complete: play
    })
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 100], {easing: ease, from: 'center', direction: 'reverse'}),
      delay: anime.stagger(7, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-200px', '200px'], {easing: ease, from: 'last'}),
      delay: anime.stagger(7, {from: 'center'})
    }, 0);

  }

  function pause() {

    if (paused) return;
    paused = true;
    if (animation) animation.pause();

    animation = anime.timeline({
      easing: 'easeInOutQuad'
    })
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 88], {easing: defaultEase, from: 'center', direction: 'reverse'}),
      duration: duration,
      delay: anime.stagger(7, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-144px', '144px'], {easing: defaultEase, from: 'last'}),
      duration: duration,
      delay: anime.stagger(7, {from: 'center'})
    }, 0);

  }

  isElementInViewport(easingVisualizerEl, play, pause);

  return {
    play: play,
    pause: pause
  }

})();

var advancedStaggeringAnimation = (function() {

  var staggerVisualizerEl = document.querySelector('.stagger-visualizer');
  var fragment = document.createDocumentFragment();
  var grid = [18, 24];
  var cell = 30;
  var numberOfElements = grid[0] * grid[1];
  var animation;
  var paused = true;

  fitElToParent(staggerVisualizerEl);

  for (var i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    fragment.appendChild(dotEl);
  }

  staggerVisualizerEl.appendChild(fragment);

  var index = anime.random(0, numberOfElements-1);
  var nextIndex = 0;

  anime.setValue('.stagger-visualizer .cursor', {
    translateX: anime.stagger(-cell, {grid: grid, from: index, axis: 'x'}),
    translateY: anime.stagger(-cell, {grid: grid, from: index, axis: 'y'}),
    translateZ: 0,
    scale: 1.25,
  });

  function play() {

    paused = false;
    if (animation) animation.pause();

    nextIndex = anime.random(0, numberOfElements-1);

    animation = anime.timeline({
      easing: 'easeInOutQuad',
      complete: play
    })
    .add({
      targets: '.stagger-visualizer .cursor',
      keyframes: [
        { scale: .625, duration: 150}, 
        { scale: 1.5, duration: 200},
        { scale: 1.25, duration: 350},
      ],
      duration: 300
    })
    .add({
      targets: '.stagger-visualizer .dot',
      keyframes: [
        {
          translateX: anime.stagger('-1.5px', {grid: grid, from: index, axis: 'x'}),
          translateY: anime.stagger('-1.5px', {grid: grid, from: index, axis: 'y'}),
          duration: 100
        }, {
          translateX: anime.stagger('1.5px', {grid: grid, from: index, axis: 'x'}),
          translateY: anime.stagger('1.5px', {grid: grid, from: index, axis: 'y'}),
          scale: anime.stagger([6.5, .5], {grid: grid, from: index}),
          duration: 225
        }, {
          translateX: 0,
          translateY: 0,
          scale: 1,
          duration: 300,
        }
      ],
      delay: anime.stagger(80, {grid: grid, from: index})
    }, 0)
    .add({
      targets: '.stagger-visualizer .cursor',
      translateX: { value: anime.stagger(-cell, {grid: grid, from: nextIndex, axis: 'x'}) },
      translateY: { value: anime.stagger(-cell, {grid: grid, from: nextIndex, axis: 'y'}) },
      scale: 1.25,
      easing: 'cubicBezier(.075, .2, .165, 1)'
    }, '-=800')

    index = nextIndex;

  }

  function pause() {

    if (paused) return;
    paused = true;
    if (animation) animation.pause();

    animation = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 300
    })
    .add({
      targets: '.cursor',
      translateX: { value: anime.stagger(-cell, {grid: grid, from: index, axis: 'x'}) },
      translateY: { value: anime.stagger(-cell, {grid: grid, from: index, axis: 'y'}) },
      scale: 1,
    })
    .add({
      targets: '.stagger-visualizer .dot',
      translateX: 0,
      translateY: 0,
      scale: 1,
      delay: anime.stagger(50, {grid: grid, from: index})
    }, 0)

  }

  isElementInViewport(staggerVisualizerEl, play, pause);

  return {
    play: play,
    pause: pause
  }

})();

var timeControlAnimation = (function() {

  var timeControlEl = document.querySelector('.time-control');
  var rullerEl = document.querySelector('.ruller');
  var timeEl = document.querySelector('.time-cursor input');
  var infoEls = document.querySelectorAll('.info');
  var fragment = document.createDocumentFragment();
  var numberOfElements = 136;

  for (let i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement('div');
    dotEl.classList.add('line');
    fragment.appendChild(dotEl);
  }

  rullerEl.appendChild(fragment);

  var animationPXOffset = (timeControlEl.offsetWidth - (timeControlEl.parentNode.offsetWidth - 32)) / 2;
  if (animationPXOffset < 0) animationPXOffset = 0;

  var timelineAnimation = anime.timeline({
    easing: 'linear',
    autoplay: false
  })
  .add({
    targets: timeControlEl,
    translateX: [animationPXOffset, -animationPXOffset],
    duration: 1500
  }, 0)
  .add({
    targets: '.time-cursor',
    keyframes: [
      { translateY: [-24, 0], duration: 100, easing: 'easeInQuad' },
      { translateX: 810, duration: 1500 },
      { translateY: -24, duration: 100, easing: 'easeOutQuad' }
    ],
    duration: 1500,
    update: function(anim) {
      timeEl.value = Math.round(anim.currentTime);
    }
  }, -100)
  .add({
    targets: '.ruller .line',
    translateY: [ {value: 24}, {value: 0} ],
    duration: 200,
    delay: anime.stagger([0, 1500]),
    easing: 'easeInOutSine'
  }, -100)

  for (var i = 0; i < infoEls.length; i++) {
    var infoEl = infoEls[i];
    var delay = parseFloat(anime.getValue(infoEl, 'data-delay'));
    var direction = infoEl.classList.contains('info-bottom') ? -1 : 1;
    timelineAnimation
    .add({
      targets: infoEl.querySelector('.info-bar'),
      scaleY: [0, 1],
      duration: 250,
      easing: 'easeOutCirc'
    }, delay)
    .add({
      targets: infoEl.querySelectorAll('.info .feature-caption'),
      opacity: [0, 1],
      translateY: [direction * 10, 0],
      duration: 50,
      delay: anime.stagger(50, {start: 10, direction: direction > 0 ? 'reverse' : 'normal'}),
      easing: 'easeOutSine'
    }, delay)
  }

  var controlAnimationCanMove = false;

  function moveControlAnimation() {
    var rect = timeControlEl.getBoundingClientRect();
    var top = rect.top;
    var height = rect.height;
    var windowHeight = window.innerHeight;
    var scrolled = (top - windowHeight) * -1;
    timelineAnimation.seek((scrolled * 2));
    if (controlAnimationCanMove) requestAnimationFrame(moveControlAnimation);
  }

  isElementInViewport(timeControlEl, function(el, entry) {
    controlAnimationCanMove = true;
    requestAnimationFrame(moveControlAnimation);
  }, function(el, entry) {
    controlAnimationCanMove = false;
  }, '0%');

})();

var layeredAnimation = (function() {

  var layeredAnimationEl = document.querySelector('.layered-animations');
  var shapeEls = layeredAnimationEl.querySelectorAll('.shape');
  var triangleEl = layeredAnimationEl.querySelector('polygon');
  var trianglePoints = triangleEl.getAttribute('points').split(' ');
  var easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine', 'spring'];

  fitElToParent(layeredAnimationEl);

  function animateShape(el) {

    var circleEl = el.querySelector('circle');
    var rectEl = el.querySelector('rect');
    var polyEl = el.querySelector('polygon');

    function createKeyframes(total, min, max, unit) {
      var keyframes = [];
      var unit = unit || 0;
      for (var i = 0; i < total; i++) keyframes.push({ value: function() { return anime.random(min, max) + unit; } });
      return keyframes;
    }

    function createKeyframes(value) {
      var keyframes = [];
      for (var i = 0; i < 30; i++) keyframes.push({ value: value });
      return keyframes;
    }

    var animation = anime.timeline({
      targets: el,
      duration: function() { return anime.random(800, 2000); },
      easing: function() { return easings[anime.random(0, easings.length - 1)]; },
      complete: function(anim) { animateShape(anim.animatables[0].target); },
    })
    .add({
      translateX: createKeyframes(function(el) { 
        return el.classList.contains('large') ? anime.random(-320, 320) : anime.random(-500, 500);
      }),
      translateY: createKeyframes(function(el) { 
        return el.classList.contains('large') ? anime.random(-200, 200) : anime.random(-380, 380);
      }),
      rotate: createKeyframes(function() { return anime.random(-220, 220); }),
    }, 0);
    if (circleEl) {
      animation.add({
        targets: circleEl,
        r: createKeyframes(function() { return anime.random(24, 56); }),
      }, 0);
    }
    if (rectEl) {
      animation.add({
        targets: rectEl,
        width: createKeyframes(function() { return anime.random(56, 96); }),
        height: createKeyframes(function() { return anime.random(56, 96); }),
      }, 0);
    }
    if (polyEl) {
      animation.add({
        targets: polyEl,
        points: createKeyframes(function() { 
          var scale = anime.random(64, 148) / 100;
          return trianglePoints.map(function(p) { return p * scale; }).join(' ');
        }),
      }, 0);
    }

    isElementInViewport(layeredAnimationEl, animation.play, animation.pause);

  }

  for (var i = 0; i < shapeEls.length; i++) {
    animateShape(shapeEls[i]);
  }

})();