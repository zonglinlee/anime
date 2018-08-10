import anime from '../../src/index.js';

var keyframesAnimation = anime.timeline({
  loop: true
})
.add({
  targets: '.key-box',
  transformOrigin: [
    {value: ['50% 100% 0px', '50% 50% 0px'], duration: 100, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: '50% 100% 0px', duration: 250, delay: 500, easing: 'cubicBezier(.77,.01,.99,.78)'}
  ],
  translateY: [
    {value: '-6rem', duration: 600, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: '0rem', duration: 250, delay: 100, easing: 'cubicBezier(.77,.01,.99,.78)'}
  ],
  translateZ: [0, 0],
  rotate: [
    {value: 360, easing: 'cubicBezier(.17,.67,.5,.97)', duration: 900}
  ],
  scaleX: [
    {value: 1, duration: 700, easing: 'easeOutQuad'},
    {value: .9, duration: 200, easing: 'easeInQuad'},
    {value: 1.4, duration: 300, easing: 'easeOutQuad'},
  ],
  scaleY: [
    {value: [.5, 1], duration: 300, easing: 'easeOutQuad'},
    {value: .5, duration: 150, delay: 650, endDelay: 50, easing: 'easeOutCirc'},
  ]
})
.add({
  targets: '.key-box-shadow',
  scaleX: [
    {value: [1.2, .2], duration: 600, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: 1.2, duration: 300, delay: 100, easing: 'cubicBezier(.77,.01,.99,.78)'},
  ]
}, 0);

// anime.speed = .5;

var CSSTransformsAnimation = (function() {

  var shapeEls = document.querySelectorAll('.CSS-transforms-shape');
  var triangleEl = document.querySelector('.CSS-transforms-shape polygon');
  var trianglePoints = triangleEl.getAttribute('points').split(' ');
  var bezierCurves = ['.98,-0.07,.24,1.07', '1,.22,.09,.81', '.88,.02,0,1.29']

  function animateShape(el) {

    var animation = anime.timeline({
      targets: el,
      easing: 'easeOutQuad',
      complete: function(anim) { animateShape(anim.animatables[0].target); }
    })
    .add({
      translateX: function() { return (anime.random(-25, 25) / 10) + 'rem'; },
      translateY: function() { return (anime.random(-25, 25) / 10) + 'rem'; },
      translateZ: [0, 0],
      rotate: function() { return anime.random(-180, 180); },
      duration: function() { return anime.random(1000, 2000); },
      delay: function() { return anime.random(0, 1000); },
      easing: function() { return 'cubicBezier('+bezierCurves[anime.random(0, bezierCurves.length-1)]+')'}
    }, 0)
    .add({
      targets: el.querySelector('circle'),
      r: function() { return anime.random(10, 24); }
    }, 0)
    .add({
      targets: el.querySelector('rect'),
      width: function() { return anime.random(17, 49); },
      height: function() { return anime.random(17, 49); }
    }, 0)
    .add({
      targets: el.querySelector('polygon'),
      points: function() { 
        var scale = anime.random(50, 150) / 100;
        return trianglePoints.map(function(p) { return p * scale; }).join(' ');
      },
    }, 0);

  }

  for (var i = 0; i < shapeEls.length; i++) animateShape(shapeEls[i]);

})();

var clock = (function() {
  var parentEl = document.querySelector('.time-control-clock');
  var fragment = document.createDocumentFragment();
  var totalLines = 48;
  function createLine(angle) {
    var el = document.createElement('div');
    el.classList.add('clock-dial-line');
    anime.setValue(el, {rotate: angle, translateY: '-3rem'});
    fragment.appendChild(el);
  }
  for (var i = 0; i < totalLines; i++) {
    var angle = (i / totalLines) * 360;
    createLine(angle);
  }
  parentEl.appendChild(fragment);
})();

var timeControlAnimation = anime.timeline({
  loop: true,
  easing: 'linear',
  duration: 12000,
  autoplay: false
})
.add({
  targets: '.long-needle',
  translateY: ['-50%', '-50%'],
  rotate: 4320,
}, 0)
.add({
  targets: '.small-needle',
  translateY: ['-50%', '-50%'],
  rotate: 360,
}, 0);

function animateNeedles() {
  anime({
    targets: timeControlAnimation,
    currentTime: anime.random(0, timeControlAnimation.duration),
    duration: anime.random(1000, 3000),
    complete: animateNeedles,
    easing: 'easeInOutQuad',
    update: function(anim) {
      timeControlAnimation.seek(anim.animations[0].currentValue);
    }
  })
}

animateNeedles();

var statesAnimation = anime({
  targets: '.states-box',
  rotate: function() {
    return anime.random(-10, 10)
  },
  easing: 'easeOutQuad',
  states: {
    shuffled: {
      translateX: 100
    }
  }
});

console.log(statesAnimation);