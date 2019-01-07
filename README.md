# <a href="http://animejs.com"><img src="/documentation/assets/img/animejs-v3-logo-animation.gif" width="200" height="80" alt="anime-js-v3-logo"/></a>

### Javascript animation engine
>*Anime* `(/ˈæn.ə.meɪ/)` is a lightweight JavaScript animation library with a simple, yet powerfull API. It works with any CSS Properties, individual CSS transforms, SVG or any DOM attributes, and JavaScript Objects.

## Getting started

```bash
$ npm install animejs
```

Or manually [download](https://github.com/juliangarnier/anime/archive/master.zip) the code.

```javascript
import anime from '/animejs'

anime({
  targets: 'div',
  translateX: 260,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});
```

## [Documentation]("http://animejs.com/documentation/")

* [Keyframes](http://animejs.com/documentation/#animationKeyframes)
* [Stagering](http://animejs.com/documentation/#staggeringBasics)
* [Timeline](http://animejs.com/documentation/#timelineBasics)
* [Controls](http://animejs.com/documentation/#playPause)
* [CSS transforms](http://animejs.com/documentation/#CSStransforms)
* [Function based values](http://animejs.com/documentation/#functionBasedPropVal)
* [SVG Animations](http://animejs.com/documentation/#motionPath)
* [Easing functions](http://animejs.com/documentation/#linearEasing)

## Demos and examples

* [CodePen demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)
* [juliangarnier.com](http://juliangarnier.com)
* [animejs.com](http://animejs.com)
* [kenzo.com/en/thejunglebook](https://kenzo.com/en/thejunglebook)
* [Stress test](http://codepen.io/juliangarnier/pen/9aea7f045d7db301eab41bc09dcfc04d?editors=0010)

### Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |