/*jslint browser:true*/
/*jslint node:true*/
'use strict';

var conf = {
  text: 'いろは',
  fontfamily1: 'Tsukushi A Round Gothic',
  fontfamily2: 'Tsukushi B Round Gothic',
  fontweight1: 400,
  fontweight2: 400,
  webfont1: '',
  webfont2: '',
  slant: 0,
  baseline: 1,
  dark: 0,
  color: 'green',
  opacity: 0.7,
  size: 1.0,
  tracking: 0,
  x: 0,
  y: 0
};

for (var k in conf) {
  conf[k] = param(k) || conf[k];
}

var s1 = $('sample1');
var s2 = $('sample2');

// sample content

$('gd-input').value = s1.textContent = s2.textContent = conf.text;
$('gd-input').oninput = function () {
  s1.textContent = s2.textContent = this.value;
};

// font, weight and labels

s1.style.fontFamily = $('gd-fontfamily1').value = conf.fontfamily1;

s1.style.fontWeight = $('gd-fontweight1').value = conf.fontweight1;
$('fontweight1-tooltip').textContent = 'Weight:' + conf.fontweight1;

updateLabel('label-font1', s1);

$('gd-fontfamily1').oninput = function () {
  $('gd-input').style.fontFamily = this.value || conf.fontfamily1;
  s1.style.fontFamily = this.value || conf.fontfamily1;
  updateLabel('label-font1', s1);
};

$('gd-fontweight1').oninput = function () {
  s1.style.fontWeight = this.value;
  $('fontweight1-tooltip').textContent = 'Weight:' + this.value;
  updateLabel('label-font1', s1);
};

s2.style.fontFamily = $('gd-fontfamily2').value = conf.fontfamily2;

s2.style.fontWeight = $('gd-fontweight2').value = conf.fontweight2;
$('fontweight2-tooltip').textContent = 'Weight:' + conf.fontweight2;

updateLabel('label-font2', s2);

$('gd-fontfamily2').oninput = function () {
  s2.style.fontFamily = this.value || conf.fontfamily2;
  updateLabel('label-font2', s2);
};

$('gd-fontweight2').oninput = function () {
  s2.style.fontWeight = this.value;
  $('fontweight2-tooltip').textContent = 'Weight:' + this.value;
  updateLabel('label-font2', s2);
};

// load external webfonts

var initialHead = document.head.innerHTML;

$('gd-webfont1').value = conf.webfont1;
$('gd-webfont2').value = conf.webfont2;

document.head.innerHTML = initialHead + conf.webfont1 + conf.webfont2;

$('gd-webfont1').oninput = function () {
  document.head.innerHTML = initialHead + this.value;
};
$('gd-webfont2').oninput = function () {
  document.head.innerHTML = initialHead + this.value;
};

// slantness

var slantOptions = document.getElementsByName('slant');
for (var i = 0; i < slantOptions.length; i++) {
  var curr = slantOptions[i];
  if (i == conf.slant) {
    curr.checked = true;
    s1.style.fontStyle = curr.value;
    s2.style.fontStyle = curr.value;
  }
  curr.onclick = function () {
    s1.style.fontStyle = this.value;
    s2.style.fontStyle = this.value;
  };
}

// baseline

$('gd-baseline').checked = conf.baseline;
if (!$('gd-baseline').checked) {
  $('baseline').setAttribute('stroke-opacity', 0);
}

$('gd-baseline').onchange = function () {
  $('baseline').setAttribute('stroke-opacity', this.checked
    ? 0.7
    : 0);
};

// dark mode

$('gd-darkmode').checked = conf.dark;
if ($('gd-darkmode').checked) {
  $('writepad').className = 'mdl-color-text--grey-400';
  document.body.className = 'mdl-color--grey-900';
}

$('gd-darkmode').onchange = function () {
  $('writepad').className = this.checked
    ? 'mdl-color-text--grey-400'
    : 'mdl-color-text--grey-900';
  document.body.className = this.checked
    ? 'mdl-color--grey-900'
    : 'mdl-color--grey-50 ';

};

// color

$('gd-color2').value = s2.style.fill = $('label-color2').style.fill = conf.color;

$('gd-color2').oninput = function () {
  s2.style.fill = $('label-color2').style.fill = this.value || conf.color;
};

// opacity

s2.style.fillOpacity = $('gd-opacity2').value = conf.opacity;
$('opacity2-tooltip').textContent = 'Opacity:' + conf.opacity;

$('gd-opacity2').oninput = function () {
  s2.style.fillOpacity = this.value;
  $('opacity2-tooltip').textContent = 'Opacity:' + this.value;
};

// size

s2.style.fontSize = conf.size * 45 + 'vh';
$('gd-size2').value = conf.size;
$('size2-tooltip').textContent = 'Relative size:' + conf.size;

$('gd-size2').oninput = function () {
  s2.style.fontSize = this.value * 45 + 'vh';
  $('size2-tooltip').textContent = 'Relative size:' + this.value;
};

// letter spacing

s2.setAttribute('letter-spacing', conf.tracking + 'em');
$('gd-spacing2').value = conf.tracking;
$('spacing2-tooltip').textContent = 'Letter Spacing:' + conf.tracking;

$('gd-spacing2').oninput = function () {
  s2.setAttribute('letter-spacing', this.value + 'em');
  $('spacing2-tooltip').textContent = 'Letter spacing:' + this.value;
};

// translation

$('gd-translateX').value = conf.x;
$('gd-translateY').value = conf.y;
translate();

$('translateX-tooltip').textContent = 'Translate-x:' + conf.x;
$('translateY-tooltip').textContent = 'Translate-y:' + conf.y;

$('gd-translateX').oninput = function () {
  conf.x = this.value;
  translate();
  $('translateX-tooltip').textContent = 'Translate-x:' + conf.x;
}

$('gd-translateY').oninput = function () {
  conf.y = this.value;
  translate();
  $('translateY-tooltip').textContent = 'Translate-y:' + conf.y;
}

// share config snackbar

$('gd-share').onclick = function () {
  $('share-link')
    .MaterialSnackbar
    .showSnackbar({message: 'configuration copied.'});
}

// helpers

// id selector shorthand

function $(x) {
  return document.getElementById(x);
}

// query

function param(name) {
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(window.location.href);
  return (results && results[2])
    ? decodeURIComponent(results[2].replace(/\+/g, " "))
    : '';
}

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
  $(obj).textContent = getFontFamily(target) + '-' + getFontWeight(target);
}

// translation

function translate() {
  s2.setAttribute('transform', 'translate(' + conf.x + ',' + conf.y + ')');
}
