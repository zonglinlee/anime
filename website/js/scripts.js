function fitToScreen(el, margins) {
  var elWidth = el.offsetWidth;
  var screenWidth = window.innerWidth;
  var limitWidth = screenWidth - margins;
  if (elWidth > limitWidth) {
    var scaleRatio = limitWidth / elWidth;
    console.log(scaleRatio);
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
        document.querySelector('.sphere').classList.add('blurred');
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
    delay: function(el, i) { return 250 + anime.random(0, 200) },
    begin: function() {
      document.querySelector('.anime-logo-signs').classList.add('blurred');
    }
  })
  .add({
    targets: '#blur feGaussianBlur',
    stdDeviation: 0,
    easing: 'linear',
    duration: 500,
    complete: function() {
      document.querySelector('.anime-logo-signs').classList.remove('blurred');
    }
  }, '-=750')
  .add({
    targets: ['.logo-letter', '.dot'],
    translateZ: [.1, 0],
    duration: 500
  }, '-=500')
  .add({
    targets: '.letter-m .line',
    strokeDasharray: 0,
    easing: 'linear',
    duration: .1,
  }, '-=100')
  .add({
    targets: '.dot',
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)',
    duration: 380,
    translateY: 268,
    translateZ: 0,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200},
  }, '-=100')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 }
  }, '-=190')
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
    scaleX: [
      { value: 1, duration: 50, easing: 'easeOutSine' }
    ],
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutSine' }
    ],
    // easing: 'cubicBezier(0.000, 0.740, 1.000, 0.255)',
    easing: 'cubicBezier(0.000, 0.740, 1.000, 0.255)',
    duration: 800,
  }, '-=650')
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
    duration: 1000,
  }, '-=1000')
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
  }, '-=1000')

  // logoAnimationTL.seek(1600);
  // anime.speed = .1;

  logoAnimationEl.classList.add('is-visible');

  return logoAnimationTL;

})();

logoAnimation.play();