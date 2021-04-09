function createEasingAnimation(easingName) {
  return {
    targets: '#target-id',
    opacity: [0, 1],
    easing: easingName,
    autoplay: false
  }
}

describe('Easings', () => {
  test('Linear', () => {
    const animation1 = anime(createEasingAnimation('linear'));
    const animation2 = anime(createEasingAnimation('linear'));
    const animation3 = anime(createEasingAnimation('linear'));

    animation1.seek(0);
    animation2.seek(500);
    animation3.seek(1000);

    expect(animation1.currentTime).toBe(0);
    expect(animation2.currentTime).toBe(500);
    expect(animation3.currentTime).toBe(1000);
  });

  test('Spring easing overrides instance\'s duration parameter', () => {
    const animationParams = createEasingAnimation('spring');
    animationParams.duration = 500;
    const animation = anime(animationParams);

    expect(animation.animations[0].tweens[0].duration).toBeGreaterThan(1000);
  });
});
