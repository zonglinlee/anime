describe('Parameters', () => {
  test('Round', () => {
    const animation1 = anime({
      targets: global.testObject,
      plainValue: 3.14159265359
    });
    animation1.seek(1000);
    expect(animation1.animations[0].currentValue).toBe(3.14159265359);

    const animation2 = anime({
      targets: global.testObject,
      plainValue: 3.14159265359,
      round: 1
    });
    animation2.seek(1000);
    expect(animation2.animations[0].currentValue).toBe(3);

    const animation3 = anime({
      targets: global.testObject,
      plainValue: 3.14159265359,
      round: 10
    });
    animation3.seek(1000);
    expect(animation3.animations[0].currentValue).toBe(3.1);

    const animation4 = anime({
      targets: global.testObject,
      plainValue: 3.14159265359,
      round: 1000
    });
    animation4.seek(1000);
    expect(animation4.animations[0].currentValue).toBe(3.142);
  });

  test('Specific property parameters', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: {
        value: 100,
        easing: 'linear',
        round: 10,
        delay: 250,
        duration: 600,
        endDelay: 400
      },
      translateY: 200,
      easing: 'easeOutQuad',
      round: 100,
      delay: 350,
      duration: 700,
      endDelay: 500
    });

    const translateXTween = animation.animations[0].tweens[0];
    expect(translateXTween.easing(.5)).toBe(0.5);
    expect(translateXTween.round).toBe(10);
    expect(translateXTween.delay).toBe(250);
    expect(translateXTween.duration).toBe(600);
    expect(translateXTween.endDelay).toBe(400);

    const translateYTween = animation.animations[1].tweens[0];
    expect(translateYTween.easing(.5)).toBe(.75);
    expect(translateYTween.round).toBe(100);
    expect(translateYTween.delay).toBe(350);
    expect(translateYTween.duration).toBe(700);
    expect(translateYTween.endDelay).toBe(500);
  });
});
