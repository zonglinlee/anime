<h1 align="center">
  <a href="https://animejs.com"><img src="/documentation/assets/img/animejs-v3-header-animation.gif" width="250"/></a>
  <br>
  anime.js
</h1>

<h4 align="center">JavaScript animation engine | <a href="https://animejs.com" target="_blank">animejs.com</a></h4>

<p align="center">
  <a href="https://www.npmjs.com/package/animejs" rel="nofollow"><img src="https://camo.githubusercontent.com/011820ee25bf1d3ddaf635d869903b98eccaeae7/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f616e696d656a732e7376673f7374796c653d666c61742d737175617265" alt="npm version" data-canonical-src="https://img.shields.io/npm/v/animejs.svg?style=flat-square" style="max-width:100%;"></a>
  <a href="https://www.npmjs.com/package/animejs" rel="nofollow"><img src="https://camo.githubusercontent.com/3e9b69d51aee25fad784a3097676696096621d47/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f616e696d656a732e7376673f7374796c653d666c61742d737175617265" alt="npm downloads" data-canonical-src="https://img.shields.io/npm/dm/animejs.svg?style=flat-square" style="max-width:100%;"></a>
</p>

<blockquote align="center">
  <em>Anime.js</em> (<code>/ˈæn.ə.meɪ/</code>) is a lightweight JavaScript animation library with a simple, yet powerful API.<br>
  It works with CSS properties, SVG, DOM attributes and JavaScript Objects.
</blockquote>

<p align="center">
  <a href="#getting-started">Getting started</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#demos-and-examples">Demos and examples</a>&nbsp;|&nbsp;<a href="#browser-support">Browser support</a>
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
<<<<<<< HEAD
import anime from 'lib/anime.js';
=======
anime({
  targets: input,
  value: 1000, // Animate the input value to 1000
  round: 1 // Remove decimals by rounding the value
});
>>>>>>> master
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
<<<<<<< HEAD
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
=======
  complete: function(anim) {
    console.log(anim.completed);
  }
});
```

Check if the animation has finished with `myAnimation.completed`, return `true` or `false`.

➜ [Complete example](http://animejs.com/documentation/#complete)

## Promises

`myAnimation.finished` returns a Promise object which will resolve once the animation has finished running.

➜ [Promises example](http://animejs.com/documentation/#finishedPromise)

## SVG

### Motion path

<img src="http://animejs.com/documentation/assets/img/readme/svg-motion-path.gif" width="332" />

Translate and rotate DOM elements along an SVG path:

```javascript
// Create a path `Object`
var path = anime.path('#motionPath path');

var motionPath = anime({
  targets: '#motionPath .el',
  translateX: path('x'), // Follow the x values from the path `Object`
  translateY: path('y'), // Follow the y values from the path `Object`
  rotate: path('angle')  // Follow the angle values from the path `Object`
});
```

➜ [Motion path example](http://animejs.com/documentation/#motionPath)

### Morphing

<img src="http://animejs.com/documentation/assets/img/readme/svg-morphing.gif" width="332" />

Animate the transition between two SVG shapes:

```html
<svg class="shape" width="128" height="128" viewBox="0 0 128 128">
  <polygon points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100"></polygon>
</svg>
```

```javascript
var svgAttributes = anime({
  targets: '.shape polygon',
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
});
```

Shapes need to have the same number of points.

➜ [Morphing example](http://animejs.com/documentation/#morphing)

### Line drawing

<img src="http://animejs.com/documentation/assets/img/readme/svg-line-drawing.gif" width="332" />

Line drawing animation of an SVG shape:

```javascript
anime({
  targets: '.shape path',
  strokeDashoffset: [anime.setDashoffset, 0]
});
```

➜ [Line drawing example](http://animejs.com/documentation/#lineDrawing)

## Easing functions

The `easing` parameter can accept either a string or a custom Bézier curve coordinates (array).

| Types | Examples | Infos
| --- | --- | ---
| String | `'easeOutExpo'` | Built in function names
| `Array` | [.91,-0.54,.29,1.56] | Custom Bézier curve coordinates ([x1, y1, x2, y2])

### Built in functions

Linear easing: `'linear'`

Penner's equations:

| easeIn | easeOut | easeInOut
| --- | --- | ---
| easeInQuad | easeOutQuad | easeInOutQuad |
| easeInCubic | easeOutCubic | easeInOutCubic
| easeInQuart | easeOutQuart | easeInOutQuart
| easeInQuint | easeOutQuint | easeInOutQuint
| easeInSine | easeOutSine | easeInOutSine
| easeInExpo | easeOutExpo | easeInOutExpo
| easeInCirc | easeOutCirc | easeInOutCirc
| easeInBack | easeOutBack | easeInOutBack
| easeInElastic | easeOutElastic | easeInOutElastic

➜ [Built in easing functions examples](http://animejs.com/documentation/#penner)

Usage:

```javascript
anime({
  targets: 'div',
  translateX: 100,
  easing: 'easeOutExpo' // Default 'easeOutElastic'
});
```

Elasticity of Elastic easings can be configured with the `elasticity` parameters:

```javascript
anime({
  targets: 'div',
  translateX: 100,
  easing: 'easeOutElastic',
  elasticity: 600 // Default 500, range [0-1000]
});
```

➜ [Elasticity examples](http://animejs.com/documentation/#elasticity)

### Custom Bézier curves

Define a Bézier curve with an `Array` of 4 coordinates:

```javascript
anime({
  targets: 'div',
  translateX: 100,
  easing: [.91,-0.54,.29,1.56]
});
```

Custom Bézier curves coordinates can be generated here <https://matthewlein.com/ceaser/>

➜ [Custom Bézier curves example](http://animejs.com/documentation/#customBezier)

### Defining custom functions

Expand the built in easing functions from `anime.easings`.

```javascript
// Add custom function
anime.easings['myCustomEasingName'] = function(t) {
  return Math.pow(Math.sin(t * 3), 3);
}

// Usage
anime({
  targets: 'div',
  translateX: 100,
  easing: 'myCustomEasingName'
});

// add custom Bézier curve function
anime.easings['myCustomCurve'] = anime.bezier([.91,-0.54,.29,1.56]);

// Usage
anime({
  targets: 'div',
  translateX: 100,
  easing: 'myCustomCurve'
});
```

➜ [Custom easing functions example](http://animejs.com/documentation/#customEasingFunction)

## Helpers

### anime.speed = x

Change all animations speed (from 0 to 1).

```javascript
anime.speed = .5; // Slow down all animations by half of their original speed
```

### anime.running

Return an `Array` of all active Anime instances.

```javascript
anime.running;
```

### anime.remove(target)

Remove one or multiple targets from the animation.

```javascript
anime.remove('.item-2'); // Remove all elements with the class 'item-2'
```

### anime.getValue(target, property)

Get current valid value from an element.

```javascript
anime.getValue('div', 'translateX'); // Return '100px'
```

### anime.path(pathEl)

Create a path Function for motion path animation.<br>
Accepts either a DOM node or CSS selector.

```javascript
var path = anime.path('svg path', 'translateX'); // Return path(attribute)
```

➜ [Motion path example](http://animejs.com/documentation/#motionPath)

### anime.setDashoffset(pathEl)

An helper for line drawing animation.<br>
Sets the 'stroke-dasharray' to the total path length and return its value.

```javascript
anime({
  targets: '.shape path',
  strokeDashoffset: [anime.setDashoffset, 0]
>>>>>>> master
});
```

## [Documentation](https://animejs.com/documentation/)

* [Targets](https://animejs.com/documentation/#cssSelector)
* [Properties](https://animejs.com/documentation/#cssProperties)
* [Property parameters](https://animejs.com/documentation/#duration)
* [Animation parameters](https://animejs.com/documentation/#direction)
* [Values](https://animejs.com/documentation/#unitlessValue)
* [Keyframes](https://animejs.com/documentation/#animationKeyframes)
* [Stagering](https://animejs.com/documentation/#staggeringBasics)
* [Timeline](https://animejs.com/documentation/#timelineBasics)
* [Controls](https://animejs.com/documentation/#playPause)
* [Callbacks and promises](https://animejs.com/documentation/#update)
* [SVG Animations](https://animejs.com/documentation/#motionPath)
* [Easing functions](https://animejs.com/documentation/#linearEasing)
* [Helpers](https://animejs.com/documentation/#remove)

## [Demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)

* [CodePen demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)
* [juliangarnier.com](http://juliangarnier.com)
* [animejs.com](https://animejs.com)
* [Moving letters](http://tobiasahlin.com/moving-letters/) by [@tobiasahlin](https://twitter.com/tobiasahlin)
* [Gradient topography animation](https://tympanus.net/Development/GradientTopographyAnimation/) by [@crnacura](https://twitter.com/crnacura)
* [Organic shape animations](https://tympanus.net/Development/OrganicShapeAnimations/) by [@crnacura](https://twitter.com/crnacura)
* [Pieces slider](https://tympanus.net/Tutorials/PiecesSlider/) by [@lmgonzalves](https://twitter.com/lmgonzalves)
* [Staggering animations](https://codepen.io/juliangarnier/pen/4fe31bbe8579a256e828cd4d48c86182?editors=0100)
* [Easings animations](https://codepen.io/juliangarnier/pen/444ed909fd5de38e3a77cc6e95fc1884)
* [Sphere animation](https://codepen.io/juliangarnier/pen/b3bb8ca599ad0f9d00dd044e56cbdea5?editors=0010)
* [Layered animations](https://codepen.io/juliangarnier/pen/6ca836535cbea42157d1b8d56d00be84?editors=0010)
* [anime.js logo animation](https://codepen.io/juliangarnier/pen/d43e8ec355c30871cbe775193255d6f6?editors=0010)


## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |

## <a href="https://animejs.com"><img src="/documentation/assets/img/animejs-v3-logo-animation.gif" width="150" alt="anime-js-v3-logo"/></a>

[Website](https://animejs.com/) | [Documentation](https://animejs.com/documentation/) | [Demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/) | [MIT License](LICENSE.md) | © 2019 [Julian Garnier](http://juliangarnier.com).