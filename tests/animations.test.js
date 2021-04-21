describe('Animations', () => {
  test('Animation\'s tweens timing inheritance', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [
        {
          value: 50,
          delay: 150,
          duration: 100,
          endDelay: 200
        }, {
          value: 200,
          delay: 350,
          duration: 300,
          endDelay: 400
        }, {
          value: 350,
          delay: 150,
          duration: 100,
          endDelay: 500
        }
      ]
    });

    expect(animation.animations[0].delay).toBe(150);
    expect(animation.animations[0].duration).toBe(150 + 100 + 200 + 350 + 300 + 400 + 150 + 100 + 500);
    expect(animation.animations[0].endDelay).toBe(500);
  });

  test('Mixed target animations', () => {
    // Make sure animations don't return undefined when mixing types
    anime({
      targets: ['#polygon', 'feTurbulence', 'feDisplacementMap'],
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      baseFrequency: 0,
      scale: 1,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutExpo'
    });
  });
});
