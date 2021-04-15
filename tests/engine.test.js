describe('Engine', () => {
  test('No active instances running', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: 50,
      autoplay: false
    });

    expect(anime.running.length).toBe(0);
  });

  test('Two active instances running', () => {
    const animation1 = anime({
      targets: '#target-id',
      translateX: 50,
    });

    const animation2 = anime({
      targets: '#target-id',
      translateY: 50,
    });

    expect(anime.running.length).toBe(2);
  });
});
