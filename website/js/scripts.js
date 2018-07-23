function fitToScreen(el, marginX, marginY) {
  var elWidth = el.offsetWidth;
  var elHeight = el.offsetHeight;
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var limitWidth = screenWidth - marginX;
  var limitHeight = screenHeight - marginY;
  if (elWidth > limitWidth) {
    var scaleRatio = limitWidth / elWidth;
    anime.setValue(el, { scale: scaleRatio });
  }
  if (elHeight > limitHeight) {
    var scaleRatio = limitHeight / elHeight;
    anime.setValue(el, { scale: scaleRatio });
  }
}

function getPathDuration(el, speed) {
  return anime.setDashoffset(el) * speed;
}

function sphereAnimation() {

  var sphereEl = document.querySelector('.sphere');
  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;
  var aimations = [];

  for (var i = 0; i < pathLength; i++) {
    aimations.push(anime({
      targets: spherePathEls[i],
      translateX: [3, -3],
      translateY: [3, -3],
      easing: 'easeOutQuad',
      autoplay: false
    }));
  }



  var introAnimation = anime.timeline()
  .add({
    targets: sphereEl,
    translateX: [40, 0],
    translateY: [40, 0],
    translateZ: [0, 0],
    duration: 2500,
    easing: 'easeOutQuad',
  }, 0)
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 1500,
      easing: 'easeInOutCirc',
    },
    opacity: 1,
    duration: 750,
    delay:  function(el, i, t) {
      return i * 50
    },
    easing: 'linear'
  }, 0);

  var sphereAnimation = anime({
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0020 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity
  });

}

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');

  fitToScreen(logoAnimationEl, 64, 16);

  var resizeTimeout = null;

  window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      fitToScreen(logoAnimationEl, 64, 16);
    }, 100);
  });

  anime.setValue('.fill', {opacity: 0.001});
  anime.setValue(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.setValue('.letter-e', {translateX: -56});
  anime.setValue('.dot', {
    translateX: 448,
    translateY: -100
  });

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: false
  });

  logoAnimationTL
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
      {value: 1, duration: 120, easing: 'easeOutQuad'}
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
    translateZ: 0,
    delay: function(el, i) { return i * 45 }
  }, 300)
  .add({
    targets: '.dot',
    opacity: {
      value: 1,
      duration: 100
    },
    translateY: 268,
    translateZ: 0,
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
    targets: ['.letter-a', '.letter-n', '.letter-i'],
    translateX: 0,
    easing: 'easeOutElastic(1, .8)',
    duration: 800,
    delay: function(el, i, t) { return (t - i) * 20 },
    change: function(a) {  a.animatables[2].target.removeAttribute('stroke-dasharray'); }
  }, '-=600')
  .add({
    targets: '.letter-e',
    translateX: 0,
    easing: 'easeOutElastic(.8, .7)',
    duration: 800
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
    duration: 800
  }, '-=660')
  .add({
    targets: '.letter-i rect',
    opacity: 0.001,
    duration: 1,
    complete: sphereAnimation
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
    targets: ['.letter-i', '.letter-n', '.letter-m', '.letter-a', '.letter-e'],
    translateY: [
      {value: 33, duration: 150},
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
  }, '-=1010');

  //anime.speed = .1;
  // logoAnimationTL.seek(3000);

  logoAnimationEl.classList.add('is-visible');

  return logoAnimationTL;

})();

// demo
window.onload = logoAnimation.play;
document.body.onclick = function() { location.reload() };
document.body.ontouchend = function() { location.reload() };