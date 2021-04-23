describe('Directions', () => {
  test('Forward', async resolve => {
    let currentTime = 0;
    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      direction: 'normal',
      update: a => {
        currentTime = a.currentTime;
      },
      complete: (a) => {
        expect(a.progress).toEqual(1);
        resolve();
      },
    });
  });
});
