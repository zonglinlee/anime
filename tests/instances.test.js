describe('Instances', () => {
  test('Must have an id', () => {
    const instance01 = anime();
    const instance02 = anime();
    const instance03 = anime();

    expect(instance01.id).toBe(0);
    expect(instance02.id).toBe(1);
    expect(instance03.id).toBe(2);
  });

  test('Must have an empty chlidren array', () => {
    const instance01 = anime();

    expect(instance01.children).toEqual(expect.any(Array));
  });

  test('Must have an array of animatables', () => {
    const instance01 = anime();

    expect(instance01.animatables).toEqual(expect.any(Array));
  });

  test('Must have an array of animations', () => {
    const instance01 = anime();

    expect(instance01.animations).toEqual(expect.any(Array));
  });

  const complexTimingsParams = {
    targets: '#target-id',
    translateX: {
      value: 50,
      delay: () => 150,
      duration: () => 100,
      endDelay: () => 200
    },
    translateY: {
      value: 350,
      delay: 100,
      duration: 100,
      endDelay: 500
    },
    translateZ: {
      value: 200,
      delay: 350,
      duration: 300,
      endDelay: 400
    },
    delay: () => 100,
    duration: () => 100,
    endDelay: () => 500
  };

  test('Delay must be the smallest delay of the all the animations', () => {
    const animation = anime(complexTimingsParams);
    expect(animation.delay).toBe(100);
  });

  test('Duration must be the longest delay + duration of the all the animations', () => {
    const animation = anime(complexTimingsParams);
    expect(animation.duration).toBe(1050);
  });

  test('EndDelay must be the smallest endDelay from the the longest animation', () => {
    const animation = anime(complexTimingsParams);
    expect(animation.endDelay).toBe(400);
  });
});
