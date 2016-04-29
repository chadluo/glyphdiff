/*jslint browser:true*/
/*jslint node:true*/
'use strict';

// id selector shorthand

function $(x) {
  return document.getElementById(x);
}

// init

var s1 = $('sample1');
var s2 = $('sample2');
$('gd-input').style.fontFamily = 'Tsukushi A Round Gothic';

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

// font family and label

function getStyle(obj, property) {
  return window
    .getComputedStyle(obj, null)
    .getPropertyValue(property);
}

function getFontFamily(obj, defaultValue) {
  return getStyle(obj, 'font-family').replace(/['"]+/g, '') || defaultValue;
}

function getFontWeight(obj) {
  return getStyle(obj, 'font-weight');
}

function updateLabel(obj, target, defaultFont) {
  $(obj).textContent = getFontFamily(target, defaultFont) + ' - ' + getFontWeight(target);
}

$('gd-fontfamily1').oninput = function () {
  $('gd-input').style.fontFamily = this.value || 'Tsukushi A Round Gothic';
  s1.style.fontFamily = this.value || 'Tsukushi A Round Gothic';
  updateLabel('label-font1', s1, 'Tsukushi A Round Gothic');
};

$('gd-fontfamily2').oninput = function () {
  s2.style.fontFamily = this.value || 'Tsukushi B Round Gothic';
  updateLabel('label-font2', s2, 'Tsukushi B Round Gothic');
};

// font weight

$('gd-fontweight1').oninput = function () {
  s1.style.fontWeight = this.value;
  $('fontweight1-tooltip').textContent = 'Weight: ' + this.value;
  updateLabel('label-font1', s1, 'Tsukushi A Round Gothic');
};

$('gd-fontweight2').oninput = function () {
  s2.style.fontWeight = this.value;
  $('fontweight2-tooltip').textContent = 'Weight: ' + this.value;
  updateLabel('label-font2', s2, 'Tsukushi B Round Gothic');
};

// slantness

var slantOptions = document.getElementsByName('slant');
for (var i = 0; i < slantOptions.length; i++) {
  slantOptions[i].onclick = function () {
    s1.style.fontStyle = this.value;
    s2.style.fontStyle = this.value;
  };
}

// toggle baseline

$('gd-baseline').onchange = function () {
  $('baseline').setAttribute('stroke-opacity', this.checked
    ? 0.7
    : 0);
};

// toggle dark mode

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
  s2.style.fill = this.value || 'green';
  $('label-color2').style.fill = this.value || 'green';
};

// sample2 opacity

$('gd-opacity2').oninput = function () {
  s2.style.fillOpacity = this.value * 0.01;
  $('opacity2-tooltip').textContent = 'Opacity: ' + this.value;
};

// upate font size

$('gd-size2').oninput = function () {
  s2.style.fontSize = this.value * .45 + 'vh';
  $('size2-tooltip').textContent = 'Relative size: ' + Math.round(this.value * 100) / 10000;
};

// sample2 letter spacing

$('gd-spacing2').oninput = function () {
  s2.setAttribute('letter-spacing', this.value + 'px');
  $('spacing2-tooltip').textContent = 'Letter spacing: ' + this.value;
};

// sample2 translation

function t(x, y) {
  s2.setAttribute('transform', 'translate(' + x + ',' + y + ')');
}

var x = 0;
var y = 0;

$('gd-translateX').oninput = function () {
  x = this.value;
  t(x, y);
  $('translateX-tooltip').textContent = 'Translate-x: ' + this.value;
}
$('gd-translateY').oninput = function () {
  y = this.value;
  t(x, y);
  $('translateY-tooltip').textContent = 'Translate-y: ' + this.value;
}
