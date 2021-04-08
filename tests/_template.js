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
    <svg id="svg-element" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 400">
      <g fill="none" fill-rule="evenodd" stroke-width="2">
        <line id="line1" x1="51.5" x2="149.5" y1="51.5" y2="149.5" stroke="#F96F82" stroke-linecap="square"/>
        <line id="line2" x1="149.5" x2="51.5" y1="51.5" y2="149.5" stroke="#F96F82" stroke-linecap="square"/>
        <circle id="circle" cx="300" cy="100" r="50" stroke="#FED28B"/>
        <polygon id="polygon" stroke="#D1FA9E" points="500 130.381 464.772 149 471.5 109.563 443 81.634 482.386 75.881 500 40 517.614 75.881 557 81.634 528.5 109.563 535.228 149"/>
        <polyline id="polyline" stroke="#7BE6D6" points="63.053 345 43 283.815 95.5 246 148 283.815 127.947 345 63.5 345"/>
        <path id="path" stroke="#4E7EFC" d="M250 300c0-27.614 22.386-50 50-50s50 22.386 50 50v50h-50c-27.614 0-50-22.386-50-50z"/>
        <rect id="rect" width="100" height="100" x="451" y="251" stroke="#C987FE" rx="25"/>
      </g>
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
