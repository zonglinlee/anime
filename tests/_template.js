const anime = require("../lib/anime.umd.js");

beforeEach(() => {
  // Set default styles since Jest doesn't seem to properly inherits styles from html when using getComputedStyle
  document.head.innerHTML = `
    <style>
      * {
        width: 0px;
        height: 0px;
        font-size: 16px;
      }

      .css-properties {
        width: 150px;
        height: 300px;
        font-size: 20px;
      }
   </style>
  `;

  // Dom elements and SVG
  document.body.innerHTML = `
    <div id="target-id" class="target-class" data-index="0"></div>
    <div class="target-class with-width-attribute" width="200" data-index="1"></div>
    <div class="target-class with-inline-styles" data-index="2" style="width: 200px"></div>
    <div class="target-class" data-index="3"></div>
    <div class="css-properties"></div>
    <svg id="svg-element" width="100" height="100" viewBox="0 0 100 100">
      <path stroke="#000000" stroke-width="0" d="M80 20c-60 0 0 60-60 60"/>
    </svg>
    <input type="number" id="input-number" name="Input number test" min="0" max="100" value="0">
  `;

  // Object
  global.testObject = {
    plainValue: 10,
    valueWithUnit: '10px',
    multiplePLainValues: '16 32 64 128',
    multipleValuesWithUnits: '16px 32em 64% 128ch'
  }

  // Makes anime accessible in global scope
  global.anime = anime;
});
