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
});
