# anime.js 
# <a href="http://animejs.com"><img src="/documentation/assets/img/anime-readme-header.gif" width="100%" alt="anime-js-v3-logo"/></a>

>*Anime* `(/ˈæn.ə.meɪ/)` is a lightweight JavaScript animation library with a simple, yet powerfull API. It works with any CSS Properties, individual CSS transforms, SVG or any DOM attributes, and JavaScript Objects.

## Getting started

```bash
$ npm install animejs
```

```javascript
import anime from 'animejs'
```

Or manually [download](https://github.com/juliangarnier/anime/archive/master.zip) and link `anime.min.js` in your HTML :

```html
<script src="anime.min.js"></script>
```

Then start animating :

```javascript
anime({
  targets: 'div',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 }
  ],
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 2000,
  loop: true
});
```

* [Keyframes](#keyframes): Chain multiple animation properties.
* [Timeline](#timeline): Synchronize multiple instances together.
* [Playback controls](#playback-controls): Play, pause, restart, seek animations or timelines.
* [CSS transforms](#individual-CSS-transforms): Animate CSS transforms individually.
* [Function based values](#function-based-values): Multiple animated targets can have individual value.
* [SVG Animations](#svg): Motion path, line drawing and morphing animations.
* [Easing functions](#easing-functions): Use the built in functions or create your own Cubic Bézier curve easing.

### Demos and examples

* [CodePen demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)
* [juliangarnier.com](http://juliangarnier.com)
* [animejs.com](http://animejs.com)
* [kenzo.com/en/thejunglebook](https://kenzo.com/en/thejunglebook)
* [Stress test](http://codepen.io/juliangarnier/pen/9aea7f045d7db301eab41bc09dcfc04d?editors=0010)

## Usage

### Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |