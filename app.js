/*jslint browser:true*/
/*jslint node:true*/
'use strict';

/// shorthands

function $(x) {
  return document.getElementById(x);
} // id selector

// init

var s1 = $('sample1');
var s2 = $('sample2');
s1.textContent = s2.textContent = $('input').value;
$('input').style.fontFamily = 'Tsukushi A Round Gothic';

// update sample content

$('input').oninput = function () { s1.textContent = s2.textContent = this.value; };

// load webfonts
{
  var h = document.head.innerHTML;
  $('webfont1').oninput = function () { document.head.innerHTML = h + this.value; };
  $('webfont2').oninput = function () { document.head.innerHTML = h + this.value; };
}

// update font family

function getStyle(obj, property) {
  return window.getComputedStyle(obj, null).getPropertyValue(property);
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

$('fontfamily1').oninput = function () {
  $('input').style.fontFamily = this.value || 'Tsukushi A Round Gothic';
  s1.setAttribute('font-family', this.value || 'Tsukushi A Round Gothic');
  updateLabel('indicator-fontfamily1', s1, 'Tsukushi A Round Gothic');
};

$('fontfamily2').oninput = function () {
  s2.setAttribute('font-family', this.value || 'Tsukushi B Round Gothic');
  updateLabel('indicator-fontfamily2', s2, 'Tsukushi B Round Gothic');
};

// update font weight

$('fontweight1').oninput = function () {
  s1.setAttribute('font-weight', this.value);
  $('fontweight1-tooltip').textContent = 'Weight: ' + this.value;
  updateLabel('indicator-fontfamily1', s1, 'Tsukushi A Round Gothic');
};

$('fontweight2').oninput = function () {
  s2.setAttribute('font-weight', this.value);
  $('fontweight2-tooltip').textContent = 'Weight: ' + this.value;
  updateLabel('indicator-fontfamily2', s2, 'Tsukushi B Round Gothic');
};

// update slant
{
  var slantOptions = document.getElementsByName('slant');
  for (var i = 0; i < slantOptions.length; i++) {
    slantOptions[i].onclick = function () {
      s1.setAttribute('font-style', this.value);
      s2.setAttribute('font-style', this.value);
    };
  }
}

// toggle baseline

$('toggle-baseline').onchange = function () {
  $('baseline').setAttribute('stroke-opacity', this.checked ? 0.7 : 0);
};

// change font2 color

$('color2').oninput = function () {
  s2.setAttribute('fill', this.value || 'green');
  $('indicator2').setAttribute('fill', this.value || 'green');
};

// upate font size

$('size2').oninput = function () {
  s2.setAttribute('font-size', this.value * 0.45 + 'vh');
  $('size2-tooltip').textContent = 'Relative size: ' + Math.round(this.value * 100) / 10000;
};

// update varter spacing

$('spacing2').oninput = function () {
  s2.setAttribute('letter-spacing', this.value);
  $('spacing2-tooltip').textContent = 'Letter spacing: ' + this.value;
};

// update opacity

$('opacity2').oninput = function () {
  s2.setAttribute('fill-opacity', this.value * 0.01);
  $('opacity2-tooltip').textContent = 'Opacity: ' + this.value;
};

// change font1/background color
{
  var fabClass = 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect ';
  var isLightColor = true;

  $('color-select').onclick = function () {
    isLightColor = !isLightColor;
    $('writepad').className = isLightColor ?
      'mdl-color--grey-50 mdl-color-text--grey-900' : 'mdl-color--grey-900 mdl-color-text--grey-400';
    this.className = fabClass + (!isLightColor ? 'mdl-color--grey-50' : 'mdl-color--grey-900');
  };
}
