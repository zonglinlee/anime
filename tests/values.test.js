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

  test('CSS computed values', () => {
    const animation = anime({
      targets: '.css-properties',
      width: 100,
      fontSize: 10,
    });

    expect(animation.animations[0].tweens[0].from.original).toBe('150px');
    expect(animation.animations[1].tweens[0].from.original).toBe('20px');
  });

  test('CSS inline values', () => {
    const animation = anime({
      targets: '.with-inline-styles',
      width: 100,
    });

    expect(animation.animations[0].tweens[0].from.original).toBe('200px');
  });

  test('SVG Attribute values', () => {
    const animation = anime({
      targets: '#svg-element path',
      stroke: '#FFFFFF',
      d: 'M80 20c-30 0 0 30-30 30'
    });

    expect(animation.animations[0].type).toBe('attribute');
    expect(animation.animations[1].type).toBe('attribute');
  });

  test('Input values', () => {
    const animation = anime({
      targets: '#input-number',
      value: 50,
    });

    expect(animation.animations[0].tweens[0].from.original).toBe('0');
    expect(animation.animations[0].tweens[0].to.original).toBe('50');
  });
});
