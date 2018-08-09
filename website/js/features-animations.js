var keyframesAnimation = anime.timeline({

})
.add({
  targets: '.key-box',
  translateY: [
    {value: '-5rem', easing: 'cubicBezier(.17,.67,.5,.97)'},
    {value: 0, easing: 'cubicBezier(.67,.18,.99,.57)'},
  ]
})