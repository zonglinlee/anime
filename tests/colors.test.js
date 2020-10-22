const fromHex3 = '#f99';
const fromHex3A = '#f999';
const fromHex6 = '#ff9999';
const fromHex6A = '#ff999999';
const fromRgb = 'rgb(255, 153, 153)';
const fromRgba = 'rgba(255, 153, 153, .6)';
const fromHsl = 'hsl(0, 100%, 80%)';
const fromHsla = 'hsla(0, 100%, 80%, .6)';

const expectedFromRgbValues = [255, 153, 153, 1];
const expectedFromRgbaValues = [255, 153, 153, .6];

const toHex3 = '#0FF';
const toHex3A = '#0FFC';
const toHex6 = '#00FFFF';
const toHex6A = '#00FFFFCC';
const toRgb = 'rgb(0, 255, 255)';
const toRgba = 'rgba(0, 255, 255, .8)';
const toHsl = 'hsl(180, 100%, 50%)';
const toHsla = 'hsla(180, 100%, 50%, .8)';

const expectedToRgbValues = [0, 255, 255, 1];
const expectedToRgbaValues = [0, 255, 255, .8];

describe('Colors', () => {
  // Hex
  test('Hex3 to Hex3', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex3, toHex3]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbValues);
  });

  test('Hex3A to Hex3A', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex3A, toHex3A]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbaValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbaValues);
  });

  test('Hex6 to Hex3', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6, toHex3]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbValues);
  });

  test('Hex6A to Hex3A', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6A, toHex3A]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbaValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbaValues);
  });

  test('Hex6 to RGB', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6, toRgb]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbValues);
  });

  test('Hex6 to RGBA', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6, toRgba]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbaValues);
  });

  test('Hex6A to RGBA', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6A, toRgba]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbaValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbaValues);
  });

  test('Hex6 to HSL', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6, toHsl]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbValues);
  });

  test('Hex6 to HSLA', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6, toHsla]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbaValues);
  });

  test('Hex6A to HSLA', () => {
    const animation = anime({
      targets: '#target-id',
      backgroundColor: [fromHex6A, toHsla]
    });
    expect(animation.animations[0].tweens[0].from.numbers).toStrictEqual(expectedFromRgbaValues);
    expect(animation.animations[0].tweens[0].to.numbers).toStrictEqual(expectedToRgbaValues);
  });
});

