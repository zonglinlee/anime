// import anime from '../../../src/index.js';

function isElementInViewport(el, inCB, outCB) {
  function handleIntersect(entries, observer) {
    var entry = entries[0];
    if (entry.isIntersecting) {
      if (inCB && typeof inCB === 'function') inCB(el, entry);
    } else {
      if (outCB && typeof outCB === 'function') outCB(el, entry);
    }
  }
  var observer = new IntersectionObserver(handleIntersect, {rootMargin: '-30%'});
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
    if (ratio < 1) anime.setValue(el, {scale: ratio});
  }
  resize();
  window.addEventListener('resize', resize);
}

// anime.speed = .1;

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');
  var versionNumerEl = document.querySelector('.version-number');

  fitElToParent(logoAnimationEl, 20);

  versionNumerEl.innerHTML = 'V' + anime.version;

  anime.setValue(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.setValue('.letter-e', {translateX: -56});
  anime.setValue('.dot', { translateX: 448, translateY: -100 });

  var siteAnimation = anime.timeline({
    easing: 'easeOutQuad',
    duration: 500,
    autoplay: false
  })
  .add({
    targets: '.main-menu a',
    opacity: [0.001, 1],
    translateY: {value: [-20, 0], easing: 'easeOutElastic(.8,.5)', duration: 800 },
    delay: anime.stagger(20, {start: 100}),
  }, 0)
  .add({
    targets: '.separator',
    opacity: {value: [0.001, 1], duration: 100},
    translateX: {value: ['-4rem', 0], easing: 'easeInOutExpo', duration: 450, delay: 25 },
    scaleX: {value: [0, 1], easing: 'easeInOutSine', duration: 250},
  }, 200)
  .add({
    targets: ['.description-section', '.feature-section'],
    opacity: [0.001, 1],
    duration: 400,
    easing: 'linear'
  }, 300);

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: false
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
      {value: [100, -152], duration: 200, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
      {value: 4, duration: 120, easing: 'easeInQuad'},
      {value: 0, duration: 120, easing: 'easeOutQuad'}
    ],
    scaleX: [
      {value: [.55, .85], duration: 190, easing: 'easeOutSine'},
      {value: 1.076, duration: 120, delay: 85, easing: 'easeInOutSine'},
      {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
    ],
    scaleY: [
      {value: [.8, 1.3], duration: 120, easing: 'easeOutSine'},
      {value: .7, duration: 120, delay: 180, easing: 'easeInOutSine'},
      {value: 1.05, duration: 180, delay: 25, easing: 'easeOutQuad'},
      {value: 1, duration: 250, delay: 15, easing: 'easeOutQuad'}
    ],
    delay: anime.stagger(45)
  }, 300)
  .add({
    targets: '.dot',
    opacity: { value: 1, duration: 100 },
    translateY: 268,
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
    delay: anime.stagger(25, {from: 2.5}),
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
    complete: siteAnimation.play,
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
  }, '-=1904')
  .add({
    targets: '.letter-i .line',
    transformOrigin: ['50% 100% 0', '50% 100% 0'],
    d: function(el) { return el.dataset.d2 },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    duration: 80
  }, '-=1110')
  .add({
    targets: '.logo-letter',
    translateY: [
      {value: 33, duration: 150},
      {value: 0, duration: 800, easing: 'easeOutElastic(1, .6)'}
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: anime.stagger(20, {from: 'center'})
  }, '-=1100')
  .add({
    targets: ['.logo-text span'],
    translateY: [-20, 0],
    opacity: [0.001, 1],
    easing: 'easeOutElastic(1, .6)',
    duration: 500,
    delay: anime.stagger(20, {from: 1})
  }, '-=1010');

  return logoAnimationTL;

})();

var builtInEasingsAnimation = (function() {

  var easingVisualizerEl = document.querySelector('.easing-visualizer');
  var fragment = document.createDocumentFragment();
  var numberOfBars = 63;
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
    fragment.appendChild(barEl);
    fragment.appendChild(dotEl);
  }

  easingVisualizerEl.appendChild(fragment);

  anime.setValue('.easing-visualizer .dot', { translateX: anime.stagger(6) });

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
      scaleY: anime.stagger([1, 88], {easing: ease, from: 'center', direction: 'reverse'}),
      delay: anime.stagger(14, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-6rem', '6rem'], {easing: ease, from: 'last'}),
      delay: anime.stagger(10, {from: 'center'})
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
      scaleY: anime.stagger([1, 88], {easing: 'linear', from: 'center', direction: 'reverse'}),
      duration: duration,
      delay: anime.stagger(16, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-6rem', '6rem'], {easing: 'linear', from: 'last'}),
      duration: duration,
      delay: anime.stagger(8, {from: 'center'})
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
  var row = 15;
  var numberOfElements = row*row;
  var animation;
  var paused = true;

  fitElToParent(staggerVisualizerEl);

  for (var i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    fragment.appendChild(dotEl);
  }

  staggerVisualizerEl.appendChild(fragment);

  var index = anime.random(0, numberOfElements);
  var nextIndex = 0;

  anime.setValue('.stagger-visualizer .cursor', {
    translateX: anime.stagger('-1em', {grid: [row, row], from: index, axis: 'x'}),
    translateY: anime.stagger('-1em', {grid: [row, row], from: index, axis: 'y'})
  });

  function play() {

    paused = false;
    if (animation) animation.pause();

    nextIndex = anime.random(0, numberOfElements);

    animation = anime.timeline({
      easing: 'easeInOutQuad',
      complete: play
    })
    .add({
      targets: '.cursor',
      keyframes: [{ scale: .75 }, { scale: 1.125 }, { scale: 1 }],
      duration: 450
    })
    .add({
      targets: '.stagger-visualizer .dot',
      keyframes: [
        {
          translateX: anime.stagger('-.175em', {grid: [row, row], from: index, axis: 'x'}),
          translateY: anime.stagger('-.175em', {grid: [row, row], from: index, axis: 'y'}),
          duration: 200
        }, {
          translateX: anime.stagger('.125em', {grid: [row, row], from: index, axis: 'x'}),
          translateY: anime.stagger('.125em', {grid: [row, row], from: index, axis: 'y'}),
          scale: 4,
          duration: 350
        }, {
          translateX: 0,
          translateY: 0,
          scale: 1,
          duration: 400,
        }
      ],
      delay: anime.stagger(45, {grid: [row, row], from: index})
    }, 0)
    .add({
      targets: '.stagger-visualizer .cursor',
      translateX: { value: anime.stagger('-1em', {grid: [row, row], from: nextIndex, axis: 'x'}), duration: anime.random(400, 1200) },
      translateY: { value: anime.stagger('-1em', {grid: [row, row], from: nextIndex, axis: 'y'}), duration: anime.random(400, 1200) },
      easing: 'easeOutSine'
    }, 450)

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
      translateX: { value: anime.stagger('-1em', {grid: [row, row], from: index, axis: 'x'}) },
      translateY: { value: anime.stagger('-1em', {grid: [row, row], from: index, axis: 'y'}) },
      scale: 1,
    })
    .add({
      targets: '.stagger-visualizer .dot',
      translateX: 0,
      translateY: 0,
      scale: 1,
      delay: anime.stagger(50, {grid: [row, row], from: index})
    }, 0)

  }

  isElementInViewport(staggerVisualizerEl, play, pause);

  return {
    play: play,
    pause: pause
  }

})();

requestAnimationFrame(logoAnimation.play);