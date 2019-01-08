<h1 align="center">
  <a href="http://animejs.com"><img src="/documentation/assets/img/animejs-v3-header-animation.gif" width="250"/></a>
  <br>
  anime.js
  <br>
</h1>

<h4 align="center">JavaScript animation engine | v3.0.0 | <a href="http://animejs.com" target="_blank">animejs.com</a></h4>

<p align="center">
  [![npm version](https://img.shields.io/npm/v/animejs.svg?style=flat-square)](https://www.npmjs.com/package/animejs)
  [![npm downloads](https://img.shields.io/npm/dm/animejs.svg?style=flat-square)](https://www.npmjs.com/package/animejs)
  [![GitHub downloads](https://img.shields.io/github/downloads/atom/atom/animejs.svg?style=flat-square)](https://github.com/juliangarnier/anime)
</p>

<blockquote align="center">
  <em>Anime</em> <code>/ˈæn.ə.meɪ/</code> is a lightweight JavaScript animation library with a simple, yet powerfull API.<br>It works with any CSS Properties, individual CSS transforms, SVG or any DOM attributes, and JavaScript Objects.
</blockquote>

<p align="center">
  <a href="#getting-started">Getting started</a>&nbsp;|&nbsp;
  <a href="#documentation">Documentation</a>&nbsp;|&nbsp;
  <a href="#demos-and-examples">Demos and examples</a>&nbsp;|&nbsp;
  <a href="#browser-support">Browser support</a>
</p>

## Getting started

### Download

Via npm

```bash
$ npm install animejs --save
```

or manual [download](https://github.com/juliangarnier/anime/archive/master.zip).

### Usage

#### ES6 modules

```javascript
import anime from 'lib/anime.es.js';
```

#### CommonJS

```javascript
import anime from 'lib/anime.js';
```

#### File include

Link `anime.min.js` in your HTML :

```html
<script src="anime.min.js"></script>
```

### Hello world

```javascript
anime({
  targets: 'div',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});
```

## [Documentation](http://animejs.com/documentation/)

* [Keyframes](http://animejs.com/documentation/#animationKeyframes)
* [Stagering](http://animejs.com/documentation/#staggeringBasics)
* [Timeline](http://animejs.com/documentation/#timelineBasics)
* [Controls](http://animejs.com/documentation/#playPause)
* [CSS transforms](http://animejs.com/documentation/#CSStransforms)
* [Function based values](http://animejs.com/documentation/#functionBasedPropVal)
* [SVG Animations](http://animejs.com/documentation/#motionPath)
* [Easing functions](http://animejs.com/documentation/#linearEasing)

## [Demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)

* [CodePen demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)
* [juliangarnier.com](http://juliangarnier.com)
* [animejs.com](http://animejs.com)
* [Moving letters](http://tobiasahlin.com/moving-letters/) by [@tobiasahlin](https://twitter.com/tobiasahlin)
* [Animated image pieces](https://tympanus.net/Development/AnimatedImagePieces/) by [@crnacura](https://twitter.com/crnacura)
* [Organic shape animations](https://tympanus.net/Development/OrganicShapeAnimations/) by [@crnacura](https://twitter.com/crnacura)
* [Staggering animations](https://codepen.io/juliangarnier/pen/4fe31bbe8579a256e828cd4d48c86182?editors=0100)
* [Easings animations](https://codepen.io/juliangarnier/pen/444ed909fd5de38e3a77cc6e95fc1884)
* [Sphere animation](https://codepen.io/juliangarnier/pen/b3bb8ca599ad0f9d00dd044e56cbdea5?editors=0010)
* [Layered animations](https://codepen.io/juliangarnier/pen/6ca836535cbea42157d1b8d56d00be84?editors=0010)
* [anime.js logo animation](https://codepen.io/juliangarnier/pen/d43e8ec355c30871cbe775193255d6f6?editors=0010)


## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |

## <a href="http://animejs.com"><img src="/documentation/assets/img/animejs-v3-logo-animation.gif" width="150" alt="anime-js-v3-logo"/></a>

[Website](http://animejs.com/documentation/) | [Documentation](http://animejs.com/documentation/) | [Demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/) | [MIT License](LICENSE.md) | © 2019 [Julian Garnier](http://juliangarnier.com).