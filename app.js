/*jslint browser:true*/
/*jslint node:true*/
'use strict';

// id selector shorthand

function $(x) {
  return document.getElementById(x);
}

// query

function param(name) {
  var url = window.location.href,
    regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results || !results[2])
    return null;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var s1 = $('sample1');
var s2 = $('sample2');

/// init from queries

// font and weight

var initFontFamily1 = param('fontfamily1') || 'Tsukushi A Round Gothic';
var initFontWeight1 = param('fontweight1') || 'normal';
s1.style.fontFamily = $('gd-fontfamily1').value = initFontFamily1;
s1.style.fontWeight = $('gd-fontweight1').value = initFontWeight1;

var initFontFamily2 = param('fontfamily2') || 'Tsukushi B Round Gothic';
var initFontWeight2 = param('fontweight2') || 'normal';
s2.style.fontFamily = $('gd-fontfamily2').value = initFontFamily2;
s2.style.fontWeight = $('gd-fontweight2').value = initFontWeight2;

// labels

function getStyle(obj, property) {
  return window
    .getComputedStyle(obj, null)
    .getPropertyValue(property);
}
function getFontFamily(obj) {
  return getStyle(obj, 'font-family').replace(/['"]+/g, '');
}
function getFontWeight(obj) {
  return getStyle(obj, 'font-weight');
}
function updateLabel(obj, target) {
  $(obj).textContent = getFontFamily(target) + ' - ' + getFontWeight(target);
}

updateLabel('label-font1', s1);
updateLabel('label-font2', s2);

// slantness

var slantOptions = document.getElementsByName('slant');
var slantState = param('slant') || 'normal';
for (var i = 0; i < slantOptions.length; i++) {
  var curr = slantOptions[i];
  if (curr.value == slantState) {
    curr.checked = true;
    s1.style.fontStyle = curr.value;
    s2.style.fontStyle = curr.value;
  }
}

// baseline and dark mode

$('gd-baseline').checked = param('baseline') == 1;
if (!$('gd-baseline').checked) {
  $('baseline').setAttribute('stroke-opacity', 0)
}

$('gd-darkmode').checked = param('dark') == 1;
if ($('gd-darkmode').checked) {
  $('writepad').className = 'mdl-color-text--grey-400';
  document.body.className = 'mdl-color--grey-900';
}

// color, size, opacity

var initColor2 = param('color') || 'green';
s2.style.fill = $('label-color2').style.fill = initColor2;

var size = param('size') || 1;
s2.style.fontSize = size * 45 + 'vh';
$('gd-size2').value = size;
$('size2-tooltip').textContent = 'Relative size: ' + size;

var initOpacity2 = param('opacity') || 0.7;
s2.style.fillOpacity = $('gd-opacity2').value = initOpacity2;
$('opacity2-tooltip').textContent = 'Opacity: ' + initOpacity2;

// translation

var x = param('x') || 0;
var y = param('y') || 0;

$('gd-translateX').value = x;
$('gd-translateY').value = y;

function translate(x, y) {
  s2.setAttribute('transform', 'translate(' + x + ',' + y + ')');
}

translate(x, y);

/// Listeners

// sample content

$('gd-input').oninput = function () {
  s1.textContent = s2.textContent = this.value;
};

// load external webfonts

var initialHead = document.head.innerHTML;
$('gd-webfont1').oninput = function () {
  document.head.innerHTML = initialHead + this.value;
};
$('gd-webfont2').oninput = function () {
  document.head.innerHTML = initialHead + this.value;
};

var initTracking = param('tracking') || 0;
s2.setAttribute('letter-spacing', initTracking + 'em');

// font family and label

$('gd-fontfamily1').oninput = function () {
  $('gd-input').style.fontFamily = this.value || initFontFamily1;
  s1.style.fontFamily = this.value || initFontFamily1;
  updateLabel('label-font1', s1);
};

$('gd-fontfamily2').oninput = function () {
  s2.style.fontFamily = this.value || initFontFamily2;
  updateLabel('label-font2', s2);
};

// font weight and label

$('gd-fontweight1').oninput = function () {
  s1.style.fontWeight = this.value;
  $('gd-fontweight1-tooltip').textContent = 'Weight: ' + this.value;
  updateLabel('label-font1', s1);
};

$('gd-fontweight2').oninput = function () {
  s2.style.fontWeight = this.value;
  $('gd-fontweight2-tooltip').textContent = 'Weight: ' + this.value;
  updateLabel('label-font2', s2);
};

// slantness

for (var i = 0; i < slantOptions.length; i++) {
  slantOptions[i].onclick = function () {
    s1.style.fontStyle = this.value;
    s2.style.fontStyle = this.value;
  };
}

// baseline

$('gd-baseline').onchange = function () {
  $('baseline').setAttribute('stroke-opacity', this.checked
    ? 0.7
    : 0);
};

// dark mode

$('gd-darkmode').onchange = function () {
  $('writepad').className = this.checked
    ? 'mdl-color-text--grey-400'
    : 'mdl-color-text--grey-900';
  document.body.className = this.checked
    ? 'mdl-color--grey-900'
    : 'mdl-color--grey-50';
};

// sample2 color

$('gd-color2').oninput = function () {
  s2.style.fill = $('label-color2').style.fill = this.value || initColor2;
};

// sample2 opacity

$('gd-opacity2').oninput = function () {
  s2.style.fillOpacity = this.value;
  $('opacity2-tooltip').textContent = 'Opacity: ' + this.value;
};

// sample2 size

$('gd-size2').oninput = function () {
  s2.style.fontSize = this.value * 45 + 'vh';
  $('size2-tooltip').textContent = 'Relative size: ' + this.value;
};

// sample2 letter spacing

$('gd-spacing2').oninput = function () {
  s2.setAttribute('letter-spacing', this.value + 'em');
  $('spacing2-tooltip').textContent = 'Letter spacing: ' + this.value;
};

// sample2 translation

$('gd-translateX').oninput = function () {
  x = this.value;
  translate(x, y);
  $('translateX-tooltip').textContent = 'Translate-x: ' + this.value;
}

$('gd-translateY').oninput = function () {
  y = this.value;
  translate(x, y);
  $('translateY-tooltip').textContent = 'Translate-y: ' + this.value;
}
