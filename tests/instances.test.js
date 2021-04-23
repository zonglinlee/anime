describe('Instances', () => {
  test('Must have an id', () => {
    const instance01 = anime();
    const instance02 = anime();
    const instance03 = anime();

    expect(instance01.id).toBe(0);
    expect(instance02.id).toBe(1);
    expect(instance03.id).toBe(2);
  });

  test('Must have an empty chlidren array', () => {
    const instance01 = anime();

    expect(instance01.children).toEqual(expect.any(Array));
  });

  test('Must have an array of animatables', () => {
    const instance01 = anime();

    expect(instance01.animatables).toEqual(expect.any(Array));
  });

  test('Must have an array of animations', () => {
    const instance01 = anime();

    expect(instance01.animations).toEqual(expect.any(Array));
  });
});
