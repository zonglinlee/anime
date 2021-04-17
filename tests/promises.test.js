describe('Promises', () => {
  test('Resolve promise on single instance', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100
    });

    let isPromiseResolved = false;

    function resolvePromise() {
      isPromiseResolved = true;
    }

    const promise = animation.finished.then(resolvePromise);

    return animation.finished.then(data => {
      expect(isPromiseResolved).toBe(true);
    });
  });

  test('Resolve promise on timeline instance', () => {
    const animation = anime.timeline()
    .add({
      targets: '#target-id',
      translateX: 100
    })
    .add({
      targets: '#target-id',
      translateX: 50
    })
    .add({
      targets: '#target-id',
      translateX: 150
    });

    let isPromiseResolved = false;

    function resolvePromise() {
      isPromiseResolved = true;
    }

    const promise = animation.finished.then(resolvePromise);

    return animation.finished.then(data => {
      expect(isPromiseResolved).toBe(true);
    });
  });
});
