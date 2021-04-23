describe('Timings', () => {
  test('Default timings parameters', async resolve => {
    let currentTime = 0;
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      update: a => {
        currentTime = a.currentTime;
      },
      complete: () => {
        expect(currentTime).toEqual(1000);
        resolve();
      },
    });
  });

  test('Specified timings parameters', async resolve => {
    let currentTime = 0;
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      delay: 100,
      duration: 200,
      endDelay: 300,
      update: a => {
        currentTime = a.currentTime;
      },
      complete: () => {
        expect(currentTime).toEqual(600);
        resolve();
      },
    });
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
