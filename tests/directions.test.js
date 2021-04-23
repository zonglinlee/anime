describe('Directions', () => {
  test('Forward', async resolve => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      direction: 'normal',
      complete: (a) => {
        expect(a.progress).toEqual(1);
        resolve();
      },
    });
  });

  test('Reverse', async resolve => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      direction: 'reverse',
      complete: (a) => {
        expect(a.progress).toEqual(0);
        resolve();
      },
    });
  });

  test('Alternate', async resolve => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      direction: 'alternate',
      loopComplete: (a) => {
        expect(a.progress).toEqual(a.remainingLoops ? 1 : 0);
      },
      complete: (a) => {
        expect(a.progress).toEqual(0);
        resolve();
      },
    });
  });
});
