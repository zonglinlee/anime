import anime from '../../src/index.js';

function fitToScreen(el, margins) {
  var elWidth = el.offsetWidth;
  var screenWidth = window.innerWidth;
  var limitWidth = screenWidth - margins;
  if (elWidth > limitWidth) {
    var scaleRatio = limitWidth / elWidth;
    anime.set(el, { scale: scaleRatio });
  }
}

var logoAnimation = (function() {

  function getPathDuration(el, speed) {
    return anime.setDashoffset(el) * speed;
  }

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');
  var spherePathEls = logoAnimationEl.querySelectorAll('.sphere path');
  var lineEls = document.querySelectorAll('.line');
  var strokeColors = ['#FF1461','#FF7C72','#FBF38C','#A6FF8F','#18FF92','#1CE2B2','#5EF3FB','#5A87FF','#B08CFF'];

  var colorKeyframes = strokeColors.reverse().map(function(color, i) {
    var value = strokeColors[i + 1] ? [color, strokeColors[i + 1]] : [color, strokeColors[0]];
    return {value: value, duration: 200}
  });

  var neonColorsAnimation = anime.timeline({
    easing: 'linear',
    loop: true,
    autoplay: false
  });

  for (var i = 0; i < lineEls.length; i++) {
    colorKeyframes.push(colorKeyframes.shift());
    neonColorsAnimation.add({
      targets: lineEls[i],
      stroke: colorKeyframes
    }, 0);
  }

  fitToScreen(logoAnimationEl, 64);

  anime.set('.fill', {opacity: 0});
  anime.set(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.set('.letter-e', {translateX: -56});
  anime.set('.dot', {
    translateX: 448,
    translateY: -100
  });
  anime.set('.sphere path', {opacity: 0});

  function sphereAnimation() {

    anime({
      targets: '.sphere path',
      opacity: 1,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 550,
      easing: 'easeInOutCirc',
      delay:  function(el, i) {
        return i * 35
      },
      begin: function() {
        anime({
          targets: '#blur feGaussianBlur',
          stdDeviation: [
            {value: 30, duration: 750, easing: 'easeOutSine'},
            {value: 10, duration: 800, easing: 'easeInOutSine'}
          ],
          delay: 950,
          begin: function() {
            document.querySelector('.sphere').classList.add('blurred');
          }
        })
      }
    });

    var pathLength = spherePathEls.length;

    var aimations = [];

    for (var i = 0; i < pathLength; i++) {
      aimations.push(anime({
        targets: spherePathEls[i],
        strokeWidth: [4, 16],
        translateX: [-10, 10],
        translateY: [-10, 10],
        translateZ: 0,
        easing: 'easeOutSine',
        delay: 150,
        duration: 1500,
        autoplay: false
      }))
    }

    anime({
      update: function(ins) {
        for (var i = 0; i < pathLength; i++) {
          var animation = aimations[i];
          var percent = (1 - Math.sin((i * .25) + (.0017 * ins.currentTime))) / 2;
          animation.seek(animation.duration * percent);
        }
      },
      duration: Infinity
    });

  }

  anime.speed = 1;

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: false,
    begin: neonColorsAnimation.play
  });

  logoAnimationTL
  .add({
    targets: '.logo-letter',
    translateX: function(el) {
      if (el.classList.contains('letter-a')) return [-256, 56];
      if (el.classList.contains('letter-n')) return [56, 56];
      if (el.classList.contains('letter-i')) return [56, 56];
      if (el.classList.contains('letter-m')) return [0, 0];
      if (el.classList.contains('letter-e')) return [256, -56];
    },
    translateY: function(el) {
      if (el.classList.contains('letter-a')) return [0, 0];
      if (el.classList.contains('letter-n')) return [200, 0];
      if (el.classList.contains('letter-i')) return [-200, 0];
      if (el.classList.contains('letter-m')) return [200, 0];
      if (el.classList.contains('letter-e')) return [0, 0];
    },
    easing: 'easeOutElastic(.8, 1.5)',
    duration: 1200,
    delay: function(el, i) { return i * 40 },
  })
  .add({
    targets: lineEls,
    strokeWidth: [0, 4],
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuad',
    duration: function(el) { return 200 + getPathDuration(el, 2) },
    delay: function(el, i, t) { return ((Math.ceil((i+1)/3) * 1) * 1) + (i * 10) },
  }, 0)
  .add({
    targets: '.letter-m .line',
    strokeDasharray: 0,
    easing: 'linear',
    duration: .1,
  }, '-=420')
  .add({
    targets: '.dot',
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)',
    duration: 380,
    translateY: 268,
    translateZ: 0,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200},
  }, '-=420')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 }
  }, '-=215')
  .add({
    targets: ['.letter-a', '.letter-n', '.letter-i'],
    translateX: 0,
    easing: 'easeOutElastic(1, .8)',
    duration: 800,
    delay: function(el, i, t) { return (t - i) * 20 }
  }, '-=600')
  .add({
    targets: '.letter-e',
    translateX: 0,
    easing: 'easeOutElastic(.8, .7)',
    duration: 800,
  }, '-=840')
  .add({
    targets: '.dot',
    translateX: bouncePath('x'),
    translateY: bouncePath('y'),
    translateZ: 0,
    rotate: 360,
    scaleX: [
      { value: 1, duration: 50, easing: 'easeOutSine' }
    ],
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutExpo' }
    ],
    easing: 'cubicBezier(0, .74, 1, .255)',
    duration: 800,
  }, '-=660')
  .add({
    targets: '.dot',
    scaleY: 1,
    scaleX: 1,
    translateY: [
      {value: 262, duration: 100, easing: 'easeOutSine'},
      {value: 244, duration: 1000, easing: 'easeOutElastic(1, .8)'}
    ],
  })
  .add({
    targets: '.letter-m .line',
    easing: 'spring(.2, 200, 3, 60)',
    d: function(el) { return el.dataset.d3 }
  }, '-=1904')
  .add({
    targets: ['.letter-i .fill', '.letter-n .fill', '.letter-m .fill', '.letter-a .fill', '.letter-e .fill'],
    opacity: { value: [0, 1], duration: 1},
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: function(el) { return getPathDuration(el, 1.5) },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    delay: function(el, i) { return Math.round(i / 2) * 150 },
    complete: neonColorsAnimation.pause
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
    duration: 1000,
  }, '-=1010')
  .add({
    duration: 1000,
    delay: 500,
    begin: sphereAnimation
  }, '-=1000')
  .add({
    targets: '.logo-links a',
    opacity: [0, 1],
    easing: 'linear',
    duration: 750,
    delay: function(el, i, t) { return (t - i) * 75 }
  }, '-=100')
  .add({
    targets: '.credits',
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutCubic'
  }, '-=500')
  .add({
    targets: '.version',
    innerHTML: parseFloat(anime.version, 10),
    duration: 2000,
    easing: 'easeOutCubic',
    update: function(a) {
      var value = a.animatables[0].target.innerHTML;
      value = parseFloat(value).toFixed(1);
      a.animatables[0].target.innerHTML = value;
    }
  }, '-=500')
  .add({
    targets: '.date',
    innerHTML: function() { 
      var d = new Date(); 
      return d.getFullYear(); 
    },
    round: 1,
    duration: 2500,
    easing: 'easeOutCubic'
  }, '-=1000');

  logoAnimationEl.classList.add('is-visible');

  return logoAnimationTL;

})();

logoAnimation.play();