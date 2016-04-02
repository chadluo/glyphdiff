'use strict';

// sync sample content

var input = document.getElementById('input'),
    canvas = document.getElementById('pad'), ctx = canvas.getContext('2d'),
    canvasX, canvasY, font1 = 'Tsukushi A Round Gothic',
    font2 = 'Tsukushi B Round Gothic', content = 'いろは'


function repaint(content, font1, font2) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * .8;
  canvasX = canvas.width / 2, canvasY = canvas.height / 2
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '31.25vh ' + font1
  ctx.fillText(content, canvasX, canvasY)
  ctx.fillStyle = 'rgba(0,200,0,0.7)';
  ctx.font = '31.25vh ' + font2
  ctx.fillText(content, canvasX, canvasY)
  // measureText()
}

repaint(content, font1, font2)

input.addEventListener(
    'keyup', function() { repaint(input.value, font1, font2) });

// update font family

var family1 = document.getElementById('fontfamily1'),
    family2 = document.getElementById('fontfamily2')

family1.addEventListener('keyup', function() {
  f1.style.fontFamily = family1.value
  input.style.fontFamily = family1.value
})

family2.addEventListener(
    'keyup', function() { f2.style.fontFamily = family2.value });

// update font color

var light = document.getElementById('color-light'),
    sepia = document.getElementById('color-sepia'),
    storm = document.getElementById('color-storm'),
    dark = document.getElementById('color-dark'),
    color2 = document.getElementById('color2')

light.addEventListener(
    'click', function() { document.body.className = 'color-light' })

sepia.addEventListener(
    'click', function() { document.body.className = 'color-sepia' })

storm.addEventListener(
    'click', function() { document.body.className = 'color-storm' })

dark.addEventListener(
    'click', function() { document.body.className = 'color-dark' })

color2.addEventListener('keyup', function() { f2.style.color = color2.value });

// update font weight

var weight1 = document.getElementById('fontweight1'),
    weight2 = document.getElementById('fontweight2')

weight1.addEventListener(
    'change', function() { f1.style.fontWeight = weight1.value })

weight2.addEventListener(
    'change', function() { f2.style.fontWeight = weight2.value });

// update size

var size2 = document.getElementById('size2')
size2.addEventListener('keyup', function() { f2.style.fontSize = size2.value });

// update letter spacing

var spacing2 = document.getElementById('spacing2')
spacing2.addEventListener(
    'keyup', function() { f2.style.letterSpacing = spacing2.value });

// update opacity

var opacity2 = document.getElementById('opacity2')
opacity2.addEventListener(
    'keyup', function() { f2.style.opacity = opacity2.value });
