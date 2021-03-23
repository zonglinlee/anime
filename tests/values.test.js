describe('Values', () => {
  test('Function as values', () => {
    const animation = anime({
      targets: '.target-class',
      translateX: (el, i, total) => {
        const index = parseFloat(el.dataset.index);
        return total + ((i + index) * 100);
      },
      duration: (el, i, total) => {
        const index = parseFloat(el.dataset.index);
        return total + ((i + index) * 100);
      },
      delay: (el, i, total) => {
        const index = parseFloat(el.dataset.index);
        return total + ((i + index) * 100);
      },
      endDelay: (el, i, total) => {
        const index = parseFloat(el.dataset.index);
        return total + ((i + index) * 100);
      }
    });

    // Property value
    expect(animation.animations[0].tweens[0].to.numbers[0]).toBe(4);
    expect(animation.animations[1].tweens[0].to.numbers[0]).toBe(204);
    expect(animation.animations[2].tweens[0].to.numbers[0]).toBe(404);
    expect(animation.animations[3].tweens[0].to.numbers[0]).toBe(604);

    // Duration
    expect(animation.animations[0].tweens[0].duration).toBe(4);
    expect(animation.animations[1].tweens[0].duration).toBe(204);
    expect(animation.animations[2].tweens[0].duration).toBe(404);
    expect(animation.animations[3].tweens[0].duration).toBe(604);

    // Delay
    expect(animation.animations[0].tweens[0].delay).toBe(4);
    expect(animation.animations[1].tweens[0].delay).toBe(204);
    expect(animation.animations[2].tweens[0].delay).toBe(404);
    expect(animation.animations[3].tweens[0].delay).toBe(604);

    // EndDelay
    expect(animation.animations[0].tweens[0].endDelay).toBe(4);
    expect(animation.animations[1].tweens[0].endDelay).toBe(204);
    expect(animation.animations[2].tweens[0].endDelay).toBe(404);
    expect(animation.animations[3].tweens[0].endDelay).toBe(604);
  });

  test('Get CSS computed values', () => {
    const animation = anime({
      targets: '.css-properties',
      width: 100,
      fontSize: 10,
    });

    expect(animation.animations[0].tweens[0].from.original).toBe('150px');
    expect(animation.animations[1].tweens[0].from.original).toBe('20px');
  });

  test('Get CSS inline values', () => {
    const animation = anime({
      targets: '.with-inline-styles',
      width: 100,
    });

    expect(animation.animations[0].tweens[0].from.original).toBe('200px');
  });

  test('Get attribute animation type with SVG attribute values', () => {
    const animation = anime({
      targets: '#svg-element path',
      stroke: '#FFFFFF',
      d: 'M80 20c-30 0 0 30-30 30'
    });

    expect(animation.animations[0].type).toBe('attribute');
    expect(animation.animations[1].type).toBe('attribute');
  });

  test('Get attribute animation type with DOM attribute values', () => {
    const animation = anime({
      targets: '.with-width-attribute',
      width: 100,
    });

    expect(animation.animations[0].type).toBe('attribute');
  });

  test('Get transform animation type with mixed transforms values', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      translateY: 100,
      translateZ: 100,
      rotate: 100,
      rotateX: 100,
      rotateY: 100,
      rotateZ: 100,
      scale: 100,
      scaleX: 100,
      scaleY: 100,
      scaleZ: 100,
      skew: 100,
      skewX: 100,
      skewY: 100,
      perspective: 100,
      matrix: 100,
      matrix3d: 100,
    });

    animation.animations.forEach( a => {
      expect(a.type).toBe('transform');
    });
  });

  test('Get CSS animation type with mixed values', () => {
    const animation = anime({
      targets: ['.with-inline-styles'],
      width: 50,
      height: 50,
      fontSize: 50,
      backgroundColor: '#FFF',
    });

    animation.animations.forEach( a => {
      expect(a.type).toBe('css');
    });
  });

  test('Get object animation type with input values', () => {
    const animation = anime({
      targets: '#input-number',
      value: 50,
    });

    expect(animation.animations[0].type).toBe('object');
  });

  test('Get object animation type with plain JS object values', () => {
    const animation = anime({
      targets: testObject,
      plainValue: 20,
      valueWithUnit: '20px',
      multiplePLainValues: '32 64 128 256',
      multipleValuesWithUnits: '32px 64em 128% 25§ch'
    });

    animation.animations.forEach( a => {
      expect(a.type).toBe('object');
    });
  });
});
