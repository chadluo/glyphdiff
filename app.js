/*jslint browser:true*/
/*jslint node:true*/
'use strict';

/// shorthands

function $(x) {
  return document.getElementById(x);
} // id selector

// init

var s1 = $('sample1'),
  s2 = $('sample2');
s1.textContent = s2.textContent = $('input').value;
s1.setAttribute('font-family', 'Tsukushi A Round Gothic');
$('input').style.fontFamily = 'Tsukushi A Round Gothic';
s2.setAttribute('font-family', 'Tsukushi B Round Gothic');
s2.setAttribute('fill', 'green');
s2.setAttribute('fill-opacity', '.7');

// update sample content

$('input')
  .oninput = function () { s1.textContent = s2.textContent = this.value; };

// update font family

$('fontfamily1')
  .oninput = function () {
    $('input').style.fontFamily = this.value || 'Tsukushi A Round Gothic';
    s1.setAttribute('font-family', this.value || 'Tsukushi A Round Gothic');
  };

$('fontfamily2')
  .oninput = function () {
    s2.setAttribute('font-family', this.value || 'Tsukushi B Round Gothic');
  };

// update font color

function updatePageColor(buttonID, bodyClass) {
  $(buttonID).onclick = function () { $('writepad').className = bodyClass; };
}

updatePageColor('select-light', 'color-light');
updatePageColor('select-sepia', 'color-sepia');
updatePageColor('select-storm', 'color-storm');
updatePageColor('select-dark', 'color-dark');

$('color2')
  .oninput = function () { s2.setAttribute('fill', this.value || 'green'); };

// update slant

var slantOptions = document.getElementsByName('slant');
for (var i = 0; i < slantOptions.length; i++) {
  slantOptions[i].onclick = function () {
    s1.setAttribute('font-style', this.value);
    s2.setAttribute('font-style', this.value);
  };
}

// update font weight

$('fontweight1')
  .oninput = function () {
    s1.setAttribute('font-weight', this.value);
    $('fontweight1-tooltip').textContent = 'Weight: ' + this.value;
  };

$('fontweight2')
  .oninput = function () {
    s2.setAttribute('font-weight', this.value);
    $('fontweight2-tooltip').textContent = 'Weight: ' + this.value;
  };

// upate font size

$('size2')
  .oninput = function () {
    s2.setAttribute('font-size', this.value * 0.6);
    $('size2-tooltip').textContent = 'Relative size: ' + Math.round(this.value * 100) / 10000;
  };

// update varter spacing

$('spacing2')
  .oninput = function () {
    s2.setAttribute('letter-spacing', this.value);
    $('spacing2-tooltip').textContent = 'Letter spacing: ' + this.value;
  };

// update opacity

$('opacity2')
  .oninput = function () {
    s2.setAttribute('fill-opacity', this.value * 0.01);
    $('opacity2-tooltip').textContent = 'Opacity: ' + this.value;
  };

// load webfonts

var h = document.head.innerHTML;

$('webfont1')
  .oninput = function () { document.head.innerHTML = h + this.value; };

$('webfont2')
  .oninput = function () { document.head.innerHTML = h + this.value; };

// toggle baseline

$('toggle-baseline')
  .onchange = function () {
    $('baseline').setAttribute('stroke-opacity', this.checked ? 0.7 : 0);
  };
