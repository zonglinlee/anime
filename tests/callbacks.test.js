describe('Callbacks', () => {
  test('begin on single  instance', () => {
    let animationBeginHasBeenTriggered = false;

    const animation = anime({
      targets: '#target-id',
      translateX: 100,
      autoplay: false,
      duration: 100,
      begin: () => {
        animationBeginHasBeenTriggered = true;
      }
    });

    expect(animationBeginHasBeenTriggered).toBe(false);
    animation.seek(50);
    expect(animationBeginHasBeenTriggered).toBe(false);
    animation.seek(0);
    expect(animationBeginHasBeenTriggered).toBe(true);
  });

  test('begin in timeline', () => {
    let timelineBeginHasBeenTriggered = false;
    let timelineAnim1BeginHasBeenTriggered = false;
    let timelineAnim2BeginHasBeenTriggered = false;

    const timeline = anime.timeline({
      autoplay: false,
      duration: 100,
      begin: () => {
        timelineBeginHasBeenTriggered = true;
      }
    })
    .add({
      targets: '#target-id',
      translateX: 100,
      autoplay: false,
      duration: 100,
      begin: () => {
        timelineAnim1BeginHasBeenTriggered = true;
      }
    })
    .add({
      targets: '#target-id',
      translateY: 100,
      autoplay: false,
      duration: 100,
      begin: () => {
        timelineAnim2BeginHasBeenTriggered = true;
      }
    })

    expect(timelineBeginHasBeenTriggered).toBe(false);
    expect(timelineAnim1BeginHasBeenTriggered).toBe(false);
    expect(timelineAnim2BeginHasBeenTriggered).toBe(false);
    timeline.seek(50);
    expect(timelineBeginHasBeenTriggered).toBe(false);
    expect(timelineAnim1BeginHasBeenTriggered).toBe(false);
    expect(timelineAnim2BeginHasBeenTriggered).toBe(false);
    timeline.seek(150);
    expect(timelineBeginHasBeenTriggered).toBe(true);
    expect(timelineAnim1BeginHasBeenTriggered).toBe(true);
    expect(timelineAnim2BeginHasBeenTriggered).toBe(false);
    timeline.seek(0);
    expect(timelineBeginHasBeenTriggered).toBe(true);
    expect(timelineAnim1BeginHasBeenTriggered).toBe(true);
    expect(timelineAnim2BeginHasBeenTriggered).toBe(true);
  });

});
