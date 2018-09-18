import anime from '../../../src/index.js';

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

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');
  var versionNumerEl = document.querySelector('.version-number');

  fitElToParent(logoAnimationEl, 20);

  versionNumerEl.innerHTML = 'V' + anime.version;

  anime.setValue(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.setValue('.letter-e', {translateX: -56});
  anime.setValue('.dot', { translateX: 448, translateY: -100 });

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
      {value: [128, -128], duration: 200, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
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
    delay: anime.stagger(40, {from: 'center'})
  }, '-=1100')
  .add({
    targets: ['.logo-text span'],
    translateY: [-20, 0],
    opacity: [0, 1],
    easing: 'easeOutElastic(1, .6)',
    duration: 500,
    delay: anime.stagger(30, {from: 1})
  }, '-=1010');

  return logoAnimationTL;

})();

window.builtInEasingsAnimation = (function() {

  var easingVisualizerEl = document.querySelector('.easing-visualizer');
  var fragment = document.createDocumentFragment();
  var numberOfBars = 63;
  var duration = 450;
  var animation;
  var paused = false;

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

    var easings = [];
    for (var ease in anime.penner) easings.push(ease);
    easings.push('steps('+anime.random(5, 20)+')');
    easings.push('cubicBezier(0.545, 0.475, 0.145, 1)');
    var ease = easings[anime.random(0, easings.length - 1)];

    animation = anime.timeline({
      easing: 'easeInOutQuad',
      complete: function() {
        if (!paused) play();
      }
    })
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 88], {easing: ease, from: 'center', direction: 'reverse'}),
      easing: ease,
      duration: duration,
      delay: anime.stagger(16, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-6rem', '6rem'], {easing: ease, from: 'last'}),
      easing: ease,
      duration: duration,
      delay: anime.stagger(8, {from: 'center'})
    }, 0);

  }

  function pause() {

    paused = true;

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

  return {
    play: play,
    pause: pause
  }

})();

var advancedStaggeringAnimation = (function() {

  var staggerVisualizerEl = document.querySelector('.stagger-visualizer');
  var fragment = document.createDocumentFragment();
  var numberOfElements = 16*16;

  for (var i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    fragment.appendChild(dotEl);
  }

  staggerVisualizerEl.appendChild(fragment);

  var index = anime.random(0, numberOfElements);
  var nextIndex = 0;

  function animateGrid() {

    nextIndex = anime.random(0, numberOfElements);

    anime.setValue('.stagger-visualizer .cursor', {
      translateX: anime.stagger('-1rem', {grid: [16, 16], from: index, axis: 'x'}),
      translateY: anime.stagger('-1rem', {grid: [16, 16], from: index, axis: 'y'})
    });

    var animation = anime.timeline({
      easing: 'easeInOutQuad',
      complete: animateGrid
    })
    .add({
      targets: '.cursor',
      keyframes: [
        { scale: .625 }, 
        { scale: 1.125 },
        { scale: 1 }
      ],
      duration: 600
    })
    .add({
      targets: '.stagger-visualizer .dot',
      keyframes: [
        {
          translateX: anime.stagger('-.175rem', {grid: [16, 16], from: index, axis: 'x'}),
          translateY: anime.stagger('-.175rem', {grid: [16, 16], from: index, axis: 'y'}),
          duration: 200
        }, {
          translateX: anime.stagger('.125rem', {grid: [16, 16], from: index, axis: 'x'}),
          translateY: anime.stagger('.125rem', {grid: [16, 16], from: index, axis: 'y'}),
          scale: 2,
          duration: 500
        }, {
          translateX: 0,
          translateY: 0,
          scale: 1,
          duration: 600,
        }
      ],
      delay: anime.stagger(50, {grid: [16, 16], from: index})
    }, '-=600')
    .add({
      targets: '.stagger-visualizer .cursor',
      translateX: { value: anime.stagger('-1rem', {grid: [16, 16], from: nextIndex, axis: 'x'}), duration: anime.random(400, 1200) },
      translateY: { value: anime.stagger('-1rem', {grid: [16, 16], from: nextIndex, axis: 'y'}), duration: anime.random(400, 1200) },
      easing: 'easeOutSine'
    }, '-=1100')

    index = nextIndex;

    console.log(animation);

  }

  return {
    play: animateGrid
  }

})();

logoAnimation.play();
builtInEasingsAnimation.play();
advancedStaggeringAnimation.play();