import buble from '@rollup/plugin-buble';
import json from '@rollup/plugin-json';
import { uglify } from "rollup-plugin-uglify";
import notify from 'rollup-plugin-notify';
import pkg from './package.json';

const date = new Date();
const inputPath = 'src/anime.js';
const outputName = 'anime';

const banner = version => {
  return `/*
  * anime.js v${ pkg.version } - ${ version }
  * (c) ${ date.getFullYear() } Julian Garnier
  * Released under the MIT license
  * animejs.com
*/
`;
}

const bubleOptions = {
  exclude: ['node_modules/**'],
  transforms: {
    dangerousForOf: true
  },
  targets: {
    firefox: 32,
    chrome: 24,
    safari: 6,
    opera: 15,
    edge: 10,
    ie: 11
  }
}

export default [
  // ES6
  {
    input: inputPath,
    output: [
      { file: pkg.main, format: 'umd', name: outputName, banner: banner('ES6 UMD') },
      { file: pkg.module, format: 'es', banner: banner('ES6 Module') }
    ],
    plugins: [json()]
  },
  // ES5 minified
  {
    input: inputPath,
    output: { file: pkg.files + '/anime.es5.min.js', format: 'iife', name: outputName },
    plugins: [
      json(),
      buble(bubleOptions),
      uglify({
        output: {
          preamble: banner('ES5 IIFE Minified')
        }
      }),
      notify()
    ]
  }
];
