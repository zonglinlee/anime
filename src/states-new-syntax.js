var modal = anime({
  targets: '.modal',
  states: {
    close: {
      width: 100,
      height: 100,
      easing: 'easeInOutExpo'
    },
    open: {
      width: 500,
      height: 500
    }
  },
  duration: 2000,
  easing: 'easeOutExpo'
});

modal.goTo('close');

modal.animateTo('open');
