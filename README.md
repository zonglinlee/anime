# <a href="http://animejs.com"><img src="/documentation/assets/img/animejs-v3-logo-animation.gif" width="200" height="80" alt="anime-js-v3-logo"/></a>

### Javascript animation engine | v3.0.0 | [animejs.com](http://animejs.com/documentation/)
>*Anime* `(/ˈæn.ə.meɪ/)` is a lightweight JavaScript animation library with a simple, yet powerfull API. It works with any CSS Properties, individual CSS transforms, SVG or any DOM attributes, and JavaScript Objects.


## [Documentation](http://animejs.com/documentation/)

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


## Usage

Download via NPM package

```bash
$ npm install animejs
```

Or manually [download](https://github.com/juliangarnier/anime/archive/master.zip) the code.

Then link `anime.min.js` in your HTML :

```html
<script src="anime.min.js"></script>
```

Or import `anime` with ES6 modules :

```javascript
import anime from '/anime.es.js'
```

And start animating :

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


## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |



[animejs.com](http://animejs.com/documentation/) | Javascript animation engine | v3.0.0 | [MIT License](LICENSE.md). ©2019 [Julian Garnier](http://juliangarnier.com).