var keyframesAnimation = anime.timeline({
  loop: true
})
.add({
  targets: '.key-box',
  transformOrigin: [
    {value: ['50% 100% 0px', '50% 50% 0px'], duration: 300, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: '50% 100% 0px', duration: 300, delay: 400, easing: 'cubicBezier(.77,.01,.99,.78)'}
  ],
  translateY: [
    {value: '-6rem', duration: 600, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: '0rem', duration: 300, delay: 100, easing: 'cubicBezier(.77,.01,.99,.78)'}
  ],
  translateZ: [0, 0],
  rotate: [
    {value: 360, easing: 'cubicBezier(.17,.67,.5,.97)', duration: 1100}
  ],
  scaleX: [
    {value: [.8, 1], duration: 700, easing: 'easeOutQuad'},
    {value: .9, duration: 300, easing: 'easeInQuad'},
    {value: 1.2, duration: 200, easing: 'easeOutQuad'},
  ],
  scaleY: [
    {value: [.6, 1], duration: 200, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: .6, duration: 200, delay: 800, endDelay: 50, easing: 'cubicBezier(.17,.67,.5,.97)'},
  ],
})
.add({
  targets: '.key-box-shadow',
  scaleX: [
    {value: [1, .2], duration: 600, easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: 1, duration: 400, delay: 100, easing: 'cubicBezier(.77,.01,.99,.78)'},
  ]
}, 0);

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
      duration: function() { return anime.random(500, 2000); },
      delay: function() { return anime.random(0, 250); },
      endDelay: function() { return anime.random(0, 250); },
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

    isElementInViewport(el, animation.play, animation.pause);

  }

  for (var i = 0; i < shapeEls.length; i++) animateShape(shapeEls[i]);

})();

var timeControlAnimation = anime({
  targets: '.needle',
  translateY: ['50%', '50%'],
  rotate: 180,
  easing: 'steps(24)',
  duration: 2000,
  // loop: true,
  diretion: 'alternate'
});