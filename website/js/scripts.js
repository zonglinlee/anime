/* Ontersection observer */

!function(t,e){"use strict";function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||a(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,o=i.width*i.height;n?this.intersectionRatio=o/n:this.intersectionRatio=this.isIntersecting?1:0}function i(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=r(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function o(){return t.performance&&performance.now&&performance.now()}function r(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function s(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function h(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function c(t,e){var n=Math.max(t.top,e.top),i=Math.min(t.bottom,e.bottom),o=Math.max(t.left,e.left),r=Math.min(t.right,e.right),s=r-o,h=i-n;return s>=0&&h>=0&&{top:n,bottom:i,left:o,right:r,width:s,height:h}}function u(t){var e;try{e=t.getBoundingClientRect()}catch(n){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):a()}function a(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(t,e){for(var n=e;n;){if(n==t)return!0;n=p(n)}return!1}function p(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)return void("isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}));var f=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.observe=function(t){var e=this._observationTargets.some(function(e){return e.element==t});if(!e){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||0>t||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,h(t,"resize",this._checkForIntersections,!0),h(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():a();this._observationTargets.forEach(function(i){var r=i.element,s=u(r),h=this._rootContainsTarget(r),c=i.entry,a=t&&h&&this._computeTargetAndRootIntersection(r,e),l=i.entry=new n({time:o(),target:r,boundingClientRect:s,rootBounds:e,intersectionRect:a});c?t&&h?this._hasCrossedThreshold(c,l)&&this._queuedEntries.push(l):c&&c.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,i){if("none"!=t.getComputedStyle(n).display){for(var o=u(n),r=o,s=p(n),h=!1;!h;){var a=null,l=1==s.nodeType?t.getComputedStyle(s):{};if("none"==l.display)return;if(s==this.root||s==e?(h=!0,a=i):s!=e.body&&s!=e.documentElement&&"visible"!=l.overflow&&(a=u(s)),a&&(r=c(a,r),!r))break;s=p(s)}return r}},i.prototype._getRootRect=function(){var t;if(this.root)t=u(this.root);else{var n=e.documentElement,i=e.body;t={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var o=0;o<this.thresholds.length;o++){var r=this.thresholds[o];if(r==n||r==i||n>r!=i>r)return!0}},i.prototype._rootIsInDom=function(){return!this.root||l(e,this.root)},i.prototype._rootContainsTarget=function(t){return l(this.root||e,t)},i.prototype._registerInstance=function(){f.indexOf(this)<0&&f.push(this)},i.prototype._unregisterInstance=function(){var t=f.indexOf(this);-1!=t&&f.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=n}(window,document);

/* Helpers */

function isElementInViewport(el, inFunc, outFunc) {
  function handleIntersect(entries, observer) {
    var entry = entries[0];
    if (entry.isIntersecting) {
      inFunc();
    } else {
      outFunc();
    }
  }
  var observer = new IntersectionObserver(handleIntersect);
  observer.observe(el);
}

function getPathDuration(el, speed) {
  return anime.setDashoffset(el) * speed;
}

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');
  var spherePathEls = logoAnimationEl.querySelectorAll('.sphere path');

  anime.set('.fill', {opacity: 0});
  anime.set(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.set('.letter-e', {translateX: -56});
  anime.set('.dot', {
    translateX: 448,
    translateY: -100
  });
  anime.set('.sphere path', {opacity: 0});
  anime.set('.logo-nav a', {
    transformOrigin: '100% 0%',
    scaleX: 0
  });
  anime.set('.logo-nav a span', {opacity: 0});

  function sphereAnimation() {

    anime({
      targets: '.sphere path',
      opacity: 1,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 550,
      easing: 'easeInOutCirc',
      delay:  function(el, i) {
        return i * 35
      }
    });

    var pathLenght = spherePathEls.length;

    for (var i = 0; i < pathLenght; i++) {
      anime({
        targets: spherePathEls[i],
        strokeWidth: [
          {value: [4, 16]},
          {value: 4, delay: 150 }
        ],
        translateX: [
          {value: 20},
          {value: 0, delay: 150 }
        ],
        translateY: [
          {value: 20},
          {value: 0, delay: 150 }
        ],
        translateZ: 0,
        easing: 'easeOutSine',
        duration: 3000,
        loop: true,
        startTime: i * 100
      })
    }

  }

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: false
  });

  logoAnimationTL
  .add({
    targets: '.line',
    strokeWidth: function() { return [anime.random(1, 12), 4] },
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: function(el) { return getPathDuration(el, 2) },
    delay: function(el, i) { return anime.random(0, 200) }
  })
  .add({
    targets: '#blur feGaussianBlur',
    stdDeviation: 0,
    easing: 'linear',
    duration: 500,
  }, '-=750')
  .add({
    targets: ['.logo-letter', '.dot'],
    translateZ: [.1, 0],
    duration: 500
  }, '-=500')
  .add({
    targets: '.letter-m .line',
    strokeDasharray: 0,
    duration: 1,
  }, '-=100')
  .add({
    targets: '.dot',
    easing: 'easeOutSine',
    duration: 300,
    translateY: 260,
    translateZ: 0,
    scaleY: [4, 1]
  }, '-=100')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 }
  }, '-=120')
  .add({
    targets: ['.letter-a', '.letter-n', '.letter-i'],
    translateX: 0,
    easing: 'easeOutElastic(1, .7)',
    duration: 800,
    delay: function(el, i, t) { return (t - i) * 20 }
  }, '-=600')
  .add({
    targets: '.letter-e',
    translateX: 0,
    easing: 'easeOutElastic(1, .7)',
    duration: 800,
  }, '-=840')
  .add({
    targets: '.dot',
    translateX: bouncePath('x'),
    translateY: bouncePath('y'),
    translateZ: 0,
    rotate: 360,
    easing: 'cubicBezier(0.000, 0.740, 1.000, 0.255)',
    duration: 600,
  }, '-=350')
  .add({
    targets: '.dot',
    translateY: [
      {value: 262, duration: 100, easing: 'easeOutSine'},
      {value: 242, duration: 1000, easing: 'easeOutElastic(1, .8)'}
    ],
    complete: sphereAnimation
  })
  .add({
    targets: '.letter-m .line',
    easing: 'spring(1, 80, 10, 30)',
    d: function(el) { return el.dataset.d3 }
  }, '-=1700')
  .add({
    targets: ['.letter-i .fill', '.letter-n .fill', '.letter-m .fill', '.letter-a .fill', '.letter-e .fill'],
    opacity: { value: [0, 1], duration: 1},
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: function(el) { return getPathDuration(el, 1.5) },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    delay: function(el, i) { return Math.round(i / 2) * 150 }
  }, '-=1100')
  .add({
    targets: '.letter-i .line',
    strokeDashoffset: anime.setDashoffset,
    duration: 200,
  }, '-=1100')
  .add({
    targets: ['.letter-i', '.letter-n', '.letter-m', '.letter-a', '.letter-e'],
    translateY: [
      {value: 25, duration: 150},
      {value: 0, duration: 800, easing: 'easeOutElastic(1, .6)'}
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: function(el, i) { return Math.round(i / 2) * 30 }
  }, '-=1100')
  .add({
    targets: ['.anime-logo h2'],
    translateY: [-20, 0],
    opacity: 1,
    easing: 'easeOutElastic(1, .6)',
    duration: 1000
  }, '-=1000')
  .add({
    targets: ['.logo-nav a'],
    skew: [-45, 0],
    scaleX: 1,
    easing: 'easeInOutCirc',
    duration: 500,
    delay: function(el, i, t) { return (t - i) * 100 }
  }, '-=250')
  .add({
    targets: ['.logo-nav a span'],
    opacity: 1,
    easing: 'linear',
    duration: 500,
    delay: function(el, i, t) { return (t - i) * 100 }
  }, '-=250');

  logoAnimationEl.classList.add('is-visible');

  isElementInViewport(logoAnimationEl, logoAnimationTL.play, logoAnimationTL.pause);

  return logoAnimationTL;

})();

var APIAnimation = (function() {

  var animationEl = document.querySelector('.api-illustration');
  var pathEls = animationEl.querySelectorAll('path');
  var pathsLength = pathEls.length;

  var APIAnimationTL = anime.timeline({
    easing: 'easeInOutQuad'
  });

  for (var i = 0; i < pathsLength; i++) {
    APIAnimationTL
    .add({
      targets: pathEls[i],
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 250
    }, '-=75')
  }

  animationEl.classList.add('is-visible');

  isElementInViewport(animationEl, APIAnimationTL.play, APIAnimationTL.pause);

  return APIAnimationTL;

})();

var swissKnifeAnimation = (function() {

  var animationEl = document.querySelector('.swissknife-illustration');
  var pathEls = animationEl.querySelectorAll('path');
  var pathsLength = pathEls.length;

  var SKAnimations = [];

  for (var i = 0; i < pathsLength; i++) {
    SKAnimations.push(anime({
      targets: pathEls[i],
      easing: 'easeInOutSine',
      autoplay: false,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: function(el) { return getPathDuration(el, 3); },
      delay: anime.random(0, 1000),
      loop: true,
      direction: 'alternate'
    }));
  }

  animationEl.classList.add('is-visible');

  function play() {
    for (var i = 0; i < pathsLength; i++) SKAnimations[i].play();
  }

  function pause() {
    for (var i = 0; i < pathsLength; i++) SKAnimations[i].pause();
  }

  isElementInViewport(animationEl, play, pause);

  return SKAnimation;

})();