function setupAnimationCallBack(callbackName, callbackFunc) {
  const parameters = {
    targets: '#target-id',
    translateX: 100,
    autoplay: false,
    delay: 10,
    endDelay: 10,
    duration: 80,
  }
  parameters[callbackName] = callbackFunc;
  return parameters;
}

function setupTimelineCallBack(callbackName, callbackFunc) {
  const parameters = {
    autoplay: false,
  }
  parameters[callbackName] = callbackFunc;
  return parameters;
}

describe('Callbacks', () => {
  test('begin() on single instance', () => {
    let callbackCheck = false;

    const animation = anime(setupAnimationCallBack('begin', () => { callbackCheck = true; }));

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

    const timeline = anime.timeline(setupAnimationCallBack('begin', () => { tlCallbackCheck = true; }))
    .add(setupAnimationCallBack('begin', () => { tlAnim1CallbackCheck = true; }))
    .add(setupAnimationCallBack('begin', () => { tlAnim2CallbackCheck = true; }))

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

    const animation = anime(setupAnimationCallBack('complete', () => { callbackCheck = true; }));

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

    const timeline = anime.timeline(setupAnimationCallBack('complete', () => { tlCallbackCheck = true; }))
    .add(setupAnimationCallBack('complete', () => { tlAnim1CallbackCheck = true; }))
    .add(setupAnimationCallBack('complete', () => { tlAnim2CallbackCheck = true; }))

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

  test('change() on single instance', () => {
    let callbackCheck = false;
    let changes = 0;

    const animation = anime(setupAnimationCallBack('change', () => { changes++; callbackCheck = true; }));

    expect(callbackCheck).toBe(false);
    animation.seek(5);
    expect(changes).toBe(0);
    expect(callbackCheck).toBe(false);
    animation.seek(10); // delay: 10
    expect(changes).toBe(0);
    expect(callbackCheck).toBe(false);
    animation.seek(15);
    expect(callbackCheck).toBe(true);
    expect(changes).toBe(1);
  });

  test('change() in timeline', () => {
    let tlCallbackCheck = false;
    let tlAnim1CallbackCheck = false;
    let tlAnim2CallbackCheck = false;

    const timeline = anime.timeline(setupAnimationCallBack('change', () => { tlCallbackCheck = true; }))
    .add(setupAnimationCallBack('change', () => { tlAnim1CallbackCheck = true; }))
    .add(setupAnimationCallBack('change', () => { tlAnim2CallbackCheck = true; }))

    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(5);
    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(10); // delay: 10
    expect(tlCallbackCheck).toBe(false);
    expect(tlAnim1CallbackCheck).toBe(false);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(50);
    expect(tlCallbackCheck).toBe(true);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(false);
    timeline.seek(150);
    expect(tlCallbackCheck).toBe(true);
    expect(tlAnim1CallbackCheck).toBe(true);
    expect(tlAnim2CallbackCheck).toBe(true);
  });

});
