describe('Tweens', () => {
  test('Single tween timings', () => {
    const delay = 200;
    const duration = 300;
    const endDelay = 400;

    const animation = anime({
      targets: '#target-id',
      translateX: '100%',
      delay: delay,
      duration: duration,
      endDelay: endDelay
    });

    const tween = animation.animations[0].tweens[0];
    expect(tween.start).toBe(0);
    expect(tween.end).toBe(delay + duration + endDelay);
  });

  test('Keyframes tween timings', () => {
    const delay1 = 200;
    const duration1 = 300;
    const endDelay1 = 400;

    const delay2 = 300;
    const duration2 = 400;
    const endDelay2 = 500;

    const animation = anime({
      targets: '#target-id',
      translateX: [
        {value: '100%', delay: delay1, duration: duration1, endDelay: endDelay1},
        {value: '200%', delay: delay2, duration: duration2, endDelay: endDelay2}
      ],
    });

    const tween1 = animation.animations[0].tweens[0];
    expect(tween1.start).toBe(0);
    expect(tween1.end).toBe(delay1 + duration1 + endDelay1);

    const tween2 = animation.animations[0].tweens[1];
    expect(tween2.start).toBe(delay1 + duration1 + endDelay1);
    expect(tween2.end).toBe((delay1 + duration1 + endDelay1) + (delay2 + duration2 + endDelay2));
  });

  test('Simple tween easing', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: '100%',
      easing: 'linear'
    });

    const tween = animation.animations[0].tweens[0];
    expect(tween.easing(.5)).toBe(.5);
  });

  // Can't be tested in Jest...

  // test('Path tween', () => {
  //   const animation = anime({
  //     targets: '#path',
  //     translateX: '100%',
  //   });

  //   const tween = animation.animations[0].tweens[0];
  //   expect(tween.isPath).toBe(true);
  // });

  test('Color tween', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: '100%',
      backgroundColor: '#000',
    });

    const tween1 = animation.animations[0].tweens[0];
    expect(tween1.isColor).toBe(false);

    const tween2 = animation.animations[1].tweens[0];
    expect(tween2.isColor).toBe(true);
  });
});
