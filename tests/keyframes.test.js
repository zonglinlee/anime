describe('Keyframes', () => {
  test('An array of one raw value should be considered as a simple value', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [50]
    });

    expect(animation.animations[0].tweens[0].from.numbers[0]).toBe(0);
    expect(animation.animations[0].tweens[0].to.numbers[0]).toBe(50);
  });

  test('An array of two raw values should be converted to "From To" values', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [-100, 100]
    });

    expect(animation.animations[0].tweens[0].from.numbers[0]).toBe(-100);
    expect(animation.animations[0].tweens[0].to.numbers[0]).toBe(100);
  });

  test('An array of more than two raw values should be converted to keyframes', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [-100, 100, 50]
    });

    expect(animation.animations[0].tweens[0].from.numbers[0]).toBe(0);
    expect(animation.animations[0].tweens[0].to.numbers[0]).toBe(-100);
    expect(animation.animations[0].tweens[1].from.numbers[0]).toBe(-100);
    expect(animation.animations[0].tweens[1].to.numbers[0]).toBe(100);
    expect(animation.animations[0].tweens[2].from.numbers[0]).toBe(100);
    expect(animation.animations[0].tweens[2].to.numbers[0]).toBe(50);
  });

  test('An array of two object values should be converted to keyframes', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [
        { value: -100 },
        { value: 100 }
      ]
    });

    expect(animation.animations[0].tweens[0].from.numbers[0]).toBe(0);
    expect(animation.animations[0].tweens[0].to.numbers[0]).toBe(-100);
    expect(animation.animations[0].tweens[1].from.numbers[0]).toBe(-100);
    expect(animation.animations[0].tweens[1].to.numbers[0]).toBe(100);
  });

  test('Unspecified keyframe duration should be inherited from instance duration devided by the keyframes length', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [
        { value: -100, duration: 800 },
        { value: 100 },
        { value: 50 },
        { value: 0, duration: 1200 }
      ],
      duration: 2000
    });

    expect(animation.animations[0].tweens[0].duration).toBe(800); // Specified duration
    expect(animation.animations[0].tweens[1].duration).toBe(500); // 2000 / 4
    expect(animation.animations[0].tweens[2].duration).toBe(500); // 2000 / 4
    expect(animation.animations[0].tweens[3].duration).toBe(1200); // Specified duration
  });

  test('First keyframe should inherit instance\'s delay', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [
        { value: -100 },
        { value: 100 },
      ],
      delay: 200,
      endDelay: 400
    });

    expect(animation.animations[0].tweens[0].delay).toBe(200);
    expect(animation.animations[0].tweens[1].delay).toBe(0);
  });

  test('Last keyframe should inherit instance\'s endDelay', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [
        { value: -100 },
        { value: 100 },
      ],
      delay: 200,
      endDelay: 400
    });

    expect(animation.animations[0].tweens[0].endDelay).toBe(0);
    expect(animation.animations[0].tweens[1].endDelay).toBe(400);
  });

  test('General keyframes instance parameters inheritance', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: [
        { value: -100 },
        { value: 100, duration: 100, delay: 300, endDelay: 600, easing: 'linear', round: 10 },
        { value: 50 },
      ],
      duration: 1500,
      delay: 200,
      endDelay: 400,
      round: 5,
      easing: 'easeOutQuad',
    });

    expect(animation.animations[0].tweens[0].duration).toBe(500); // 1500 / 3
    expect(animation.animations[0].tweens[0].delay).toBe(200); // Inherited because its the first keyframe
    expect(animation.animations[0].tweens[0].endDelay).toBe(0); // Not inherited because not last keyframe
    expect(animation.animations[0].tweens[0].easing(.5)).toBe(.75);
    expect(animation.animations[0].tweens[0].round).toBe(5);

    expect(animation.animations[0].tweens[1].duration).toBe(100);
    expect(animation.animations[0].tweens[1].delay).toBe(300);
    expect(animation.animations[0].tweens[1].endDelay).toBe(600);
    expect(animation.animations[0].tweens[1].easing(.5)).toBe(.5);
    expect(animation.animations[0].tweens[1].round).toBe(10);
  });

  test('Keyframes parameter', () => {
    const animation = anime({
      targets: '#target-id',
      keyframes: [
        { translateY: -100 },
        { translateX: 100, duration: 100, delay: 300, endDelay: 600, easing: 'linear', round: 10 },
        { translateY: 50 },
      ],
      duration: 1500,
      delay: 200,
      endDelay: 400,
      round: 5,
      easing: 'easeOutQuad',
    });

    expect(animation.animations[0].tweens[0].duration).toBe(500); // 1500 / 3
    expect(animation.animations[0].tweens[0].delay).toBe(200); // Inherited because its the first keyframe
    expect(animation.animations[0].tweens[0].endDelay).toBe(0); // Not inherited because not last keyframe
    expect(animation.animations[0].tweens[0].easing(.5)).toBe(.75);
    expect(animation.animations[0].tweens[0].round).toBe(5);

    expect(animation.animations[0].tweens[1].duration).toBe(100);
    expect(animation.animations[0].tweens[1].delay).toBe(300);
    expect(animation.animations[0].tweens[1].endDelay).toBe(600);
    expect(animation.animations[0].tweens[1].easing(.5)).toBe(.5);
    expect(animation.animations[0].tweens[1].round).toBe(10);
  });

});
