describe('Targets', () => {
  test('Single element from CSS selector', () => {
    const animation = anime({
      targets: '#target-id'
    });

    const targetEl = document.querySelector('#target-id');
    expect(animation.animatables[0].target).toBe(targetEl);
  });

  test('Multiple elements from CSS selector', () => {
    const animation = anime({
      targets: '.target-class'
    });

    const targetEls = document.querySelectorAll('.target-class');
    targetEls.forEach((el, i) => {
      expect(animation.animatables[i].target).toBe(el);
    });
  });

  test('Single element from domNode', () => {
    const targetEl = document.querySelector('#target-id');
    const animation = anime({
      targets: targetEl
    });

    expect(animation.animatables[0].target).toBe(targetEl);
  });

  test('Multiple elements from nodeList', () => {
    const targetEls = document.querySelectorAll('.target-class');
    const animation = anime({
      targets: targetEls
    });

    targetEls.forEach((el, i) => {
      expect(animation.animatables[i].target).toBe(el);
    });
  });

  test('Single object from JS Object', () => {
    const animation = anime({
      targets: testObject
    });

    expect(animation.animatables[0].target).toBe(testObject);
  });

  test('Multiple elements from an Array of mixed CSS selectors', () => {
    const animation = anime({
      targets: ['#target-id', '.target-class', 'div[data-index="0"]']
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(animation.animatables[0].target).toBe(targetIdEl);
    expect(animation.animatables[0].target).toBe(targetDataEl);
    targetClassEls.forEach((el, i) => {
      expect(animation.animatables[i].target).toBe(el);
    });
  });

  test('Multiple elements and object from an Array of mixed target types', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const animation = anime({
      targets: [testObject, '#target-id', targetClassEls, 'div[data-index="0"]']
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(animation.animatables[0].target).toBe(testObject);
    expect(animation.animatables[1].target).toBe(targetIdEl);
    expect(animation.animatables[1].target).toBe(targetDataEl);
    expect(animation.animatables.length).toBe(5);
  });
});
