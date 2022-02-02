describe('Callbacks', () => {
  test('begin() on single instance', () => {
    let callbackCheck = false;

    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      autoplay: false,
      duration: 100,
      begin: () => {
        callbackCheck = true;
      }
    });

    expect(callbackCheck).toBe(false);
    animation.seek(50);
    expect(callbackCheck).toBe(false);
    animation.seek(0);
    expect(callbackCheck).toBe(true);
  });

  test('begin() in timeline', () => {
    let tlCallbackCheck = false;
    let tlAnim1CallbackCheck = false;
    let tlAnim2CallbackCheck = false;

    const timeline = anime.timeline({
      autoplay: false,
      begin: () => {
        tlCallbackCheck = true;
      }
    })
    .add({
      targets: '#target-id',
      translateX: 100,
      autoplay: false,
      duration: 100,
      begin: () => {
        tlAnim1CallbackCheck = true;
      }
    })
    .add({
      targets: '#target-id',
      translateY: 100,
      autoplay: false,
      duration: 100,
      begin: () => {
        tlAnim2CallbackCheck = true;
      }
    })

    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(50);
    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(150);
    expect(tlCallbackCheck).toBe(true);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(0);
    expect(tlCallbackCheck).toBe(true);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(true);
  });

  test('complete() on single instance', () => {
    let callbackCheck = false;

    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      autoplay: false,
      duration: 100,
      complete: () => {
        callbackCheck = true;
      }
    });

    expect(callbackCheck).toBe(false);
    animation.seek(50);
    expect(callbackCheck).toBe(false);
    animation.seek(0);
    expect(callbackCheck).toBe(false);
    animation.seek(100);
    expect(callbackCheck).toBe(true);
  });

  test('complete() in timeline', () => {
    let tlCallbackCheck = false;
    let tlAnim1CallbackCheck = false;
    let tlAnim2CallbackCheck = false;

    const timeline = anime.timeline({
      autoplay: false,
      complete: () => {
        tlCallbackCheck = true;
      }
    })
    .add({
      targets: '#target-id',
      translateX: 100,
      autoplay: false,
      duration: 100,
      complete: () => {
        tlAnim1CallbackCheck = true;
      }
    })
    .add({
      targets: '#target-id',
      translateY: 100,
      autoplay: false,
      duration: 100,
      complete: () => {
        tlAnim2CallbackCheck = true;
      }
    })

    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(50);
    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(150);
    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(0);
    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(200);
    expect(tlCallbackCheck).toBe(true);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(true);
  });

});
