var animation = anime({
  targets: '.modal',
  states: {
    closed: {
      width: 100,
      height: 100,
      easing: 'easeInOutExpo'
    },
    opened: {
      width: '100vw',
      height: '100vh'
    }
  },
  duration: 2000,
  easing: 'easeOutExpo'
})

animation.goTo('closed');

animation.animateTo('open');