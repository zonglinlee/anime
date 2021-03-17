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
});
