describe('Units', () => {
  test('Default transform units', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      translateY: 100,
      translateZ: 100,
      rotate: 360,
      rotateX: 360,
      rotateY: 360,
      rotateZ: 360,
      skew: 360,
      skewX: 360,
      skewY: 360,
      perspective: 1000,
    });

    // Translate
    expect(animation.animations[0].tweens[0].from.strings[1]).toBe('px');
    expect(animation.animations[1].tweens[0].from.strings[1]).toBe('px');
    expect(animation.animations[2].tweens[0].from.strings[1]).toBe('px');
    // Rotate
    expect(animation.animations[3].tweens[0].from.strings[1]).toBe('deg');
    expect(animation.animations[4].tweens[0].from.strings[1]).toBe('deg');
    expect(animation.animations[5].tweens[0].from.strings[1]).toBe('deg');
    expect(animation.animations[6].tweens[0].from.strings[1]).toBe('deg');
    // Skew
    expect(animation.animations[7].tweens[0].from.strings[1]).toBe('deg');
    expect(animation.animations[8].tweens[0].from.strings[1]).toBe('deg');
    expect(animation.animations[9].tweens[0].from.strings[1]).toBe('deg');
    // Perspective
    expect(animation.animations[10].tweens[0].from.strings[1]).toBe('px');
  });
});
