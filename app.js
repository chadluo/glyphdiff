'use strict';

/// id-selector shorthand
function $(x) {
  return document.getElementById(x);
}

var input = $('input');
var canvas = $('pad');
var ctx = canvas.getContext('2d');
/// states
var content = 'いろは'
var font1 = 'Tsukushi A Round Gothic', font2 = 'Tsukushi B Round Gothic'
/// handlers
var family1 = $('fontfamily1'), family2 = $('fontfamily2');
var weight1 = $('fontweight1'), weight2 = $('fontweight2');
var size2 = $('size2');
var spacing2 = $('spacing2');
var opacity2 = $('opacity2');

function repaint() {
  // warmup
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * .8;
  var canvasX = canvas.width / 2, canvasY = canvas.height / 2
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // draw samples
  ctx.font = '31.25vh ' + font1
  ctx.fillText(content, canvasX, canvasY)
  ctx.fillStyle = 'rgba(0,192,0,0.7)';
  ctx.font = '31.25vh ' + font2
  ctx.fillText(content, canvasX, canvasY)
  // measureText()
};

window.addEventListener('resize', repaint, false);

// sync sample content

input.addEventListener('keyup', function() {
  content = input.value;
  repaint();
});

// update font family

family1.addEventListener('keyup', function() {
  input.style.fontFamily = family1.value;  // matching width
  font1 = fontfamily1.value;
  repaint();
});

family2.addEventListener('keyup', function() {
  font2 = fontfamily2.value;
  repaint();
});

// update font color

var light = $('color-light');
var sepia = $('color-sepia');
var storm = $('color-storm');
var dark = $('color-dark');
var color2 = $('color2');

light.addEventListener(
    'click', function() { document.body.className = 'color-light' });

sepia.addEventListener(
    'click', function() { document.body.className = 'color-sepia' });

storm.addEventListener(
    'click', function() { document.body.className = 'color-storm' });

dark.addEventListener(
    'click', function() { document.body.className = 'color-dark' });

color2.addEventListener('keyup', function() { f2.style.color = color2.value });

// update font weight


// weight1.addEventListener('change', () => {f1.style.fontWeight =
// weight1.value});

// weight2.addEventListener('change', () => {f2.style.fontWeight =
// weight2.value});

// update size

// size2.addEventListener('keyup', () => {f2.style.fontSize = size2.value});

// update varter spacing

// spacing2.addEventListener(
//     'keyup', () => {f2.style.varterSpacing = spacing2.value});

// update opacity

// opacity2.addEventListener('keyup', () => {f2.style.opacity =
// opacity2.value});

// init
repaint();



// // // // // //

// SVG alignment:
// horizontal text-anchor
// https://developer.mozilla.org/en/docs/Web/SVG/Attribute/text-anchor
// vertical alignment-baseline
// https://developer.mozilla.org/en/docs/Web/SVG/Attribute/text-anchor
