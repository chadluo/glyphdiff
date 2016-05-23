'use strict';

var def = {
  text: 'いろは',
  fontfamily1: 'Tsukushi A Round Gothic',
  fontfamily2: 'Tsukushi B Round Gothic',
  fontweight1: 400,
  fontweight2: 400,
  slant1: 'normal',
  slant2: 'normal',
  baseline: 1,
  darkmode: 0,
  color: '#40A040',
  // opacity: 0.7,
  size: 1.0,
  tracking: 0,
  x: 0,
  y: 0
};

var conf = {};

for (var k in def) {
  conf[k] = param(k) || def[k];
}

var s1 = $('sample1');
var s2 = $('sample2');

// sample content

$('gd-input').value = s1.textContent = s2.textContent = conf.text;
$('gd-input').oninput = function () {
  s1.textContent = s2.textContent = this.value || def.text;
  conf.text = this.value;
};

// font, weight and labels

s1.style.fontFamily = conf.fontfamily1;
$('gd-fontfamily1').value = (conf.fontfamily1 == def.fontfamily1 ? '' : conf.fontfamily1);
s1.style.fontWeight = $('gd-fontweight1').value = conf.fontweight1;

updateLabel('label-font1', s1);

$('gd-fontfamily1').oninput = function () {
  $('gd-input').style.fontFamily = s1.style.fontFamily = conf.fontfamily1 = this.value || def.fontfamily1;
  loadFonts();
  updateLabel('label-font1', s1);
};

$('gd-fontweight1').oninput = function () {
  s1.style.fontWeight = conf.fontweight1 = this.value;
  loadFonts();
  updateLabel('label-font1', s1);
};

s2.style.fontFamily = conf.fontfamily2;
$('gd-fontfamily2').value = (conf.fontfamily2 == def.fontfamily2 ? '' : conf.fontfamily2);
s2.style.fontWeight = $('gd-fontweight2').value = conf.fontweight2;

updateLabel('label-font2', s2);

loadFonts();

$('gd-fontfamily2').oninput = function () {
  s2.style.fontFamily = conf.fontfamily2 = this.value || def.fontfamily2;
  loadFonts();
  updateLabel('label-font2', s2);
};

$('gd-fontweight2').oninput = function () {
  s2.style.fontWeight = conf.fontweight = this.value;
  loadFonts();
  updateLabel('label-font2', s2);
};

// slantness

var slantOptions1 = document.getElementsByName('slant1'),
  slantOptions2 = document.getElementsByName('slant2');
for (var i = 0; i < 3; i++) {
  var curr1 = slantOptions1[i],
    curr2 = slantOptions2[i];
  if (curr1.value == conf.slant1) {
    curr1.checked = true;
    s1.style.fontStyle = curr1.value;
  }
  if (curr2.value == conf.slant2) {
    curr2.checked = true;
    s2.style.fontStyle = curr2.value;
  }
  curr1.onclick = function () {
    s1.style.fontStyle = this.value;
    conf.slant1 = this.value;
    loadFonts();
  };
  curr2.onclick = function () {
    s2.style.fontStyle = this.value;
    conf.slant2 = this.value;
    loadFonts();
  };
}

// baseline

$('gd-baseline').checked = conf.baseline == '1';
$('baseline').setAttribute('stroke-opacity', $('gd-baseline').checked ? 0.7 : 0);

$('gd-baseline').onchange = function () {
  $('baseline').setAttribute('stroke-opacity', this.checked ? 0.7 : 0);
  conf.baseline = this.checked ? 1 : 0;
};

// dark mode

$('gd-darkmode').checked = conf.darkmode == '1';
if ($('gd-darkmode').checked) {
  $('writepad').className = 'mdl-color-text--grey-400';
  document.body.className = 'mdl-color--grey-900';
}

$('gd-darkmode').onchange = function () {
  $('writepad').className = this.checked ? 'mdl-color-text--grey-400' : 'mdl-color-text--grey-900';
  document.body.className = this.checked ? 'mdl-color--grey-900' : 'mdl-color--grey-50 ';
  conf.darkmode = this.checked ? 1 : 0;
};

// color

s2.style.fill = $('label-color2').style.fill = $('gd-color2').value = conf.color;
$('gd-color2').oninput = function () {
  s2.style.fill = $('label-color2').style.fill = conf.color = this.value || def.color;
};

// size

s2.style.fontSize = conf.size * 45 + 'vh';
$('gd-size2').value = conf.size;
$('size2-tooltip').textContent = conf.size;

$('gd-size2').oninput = function () {
  s2.style.fontSize = this.value * 45 + 'vh';
  $('size2-tooltip').textContent = this.value;
  conf.size = this.value;
};

// letter spacing

s2.setAttribute('letter-spacing', conf.tracking + 'em');
$('gd-spacing2').value = conf.tracking;
$('spacing2-tooltip').textContent = conf.tracking;

$('gd-spacing2').oninput = function () {
  s2.setAttribute('letter-spacing', this.value + 'em');
  $('spacing2-tooltip').textContent = this.value;
  conf.tracking = this.value;
};

// translation

$('gd-translateX').value = conf.x;
$('gd-translateY').value = conf.y;
translate();

$('translateX-tooltip').textContent = conf.x;
$('translateY-tooltip').textContent = conf.y;

$('gd-translateX').oninput = function () {
  conf.x = this.value;
  translate();
  $('translateX-tooltip').textContent = conf.x;
}

$('gd-translateY').oninput = function () {
  conf.y = this.value;
  translate();
  $('translateY-tooltip').textContent = conf.y;
}

// share config snackbar

$('gd-share').onclick = function () {
  var t = document.createElement('textarea');
  var newURL = location.origin + location.pathname + queries();
  t.textContent = newURL;
  t.style.position = "fixed";
  document.body.appendChild(t);
  t.select();
  try {
    document.execCommand("copy");
  } catch (e) {} finally {
    $('share-link').MaterialSnackbar.showSnackbar({
      message: 'configuration copied. (not for Safari, please copy manually)'
    });
    document.body.removeChild(t);
  }
  history.pushState(null, null, newURL);
}

// helpers

// id selector shorthand

function $(x) {
  return document.getElementById(x);
}

// load external webfonts

function loadFonts() {
  WebFont.load({
    google: {
      families: [conf.fontfamily1 + ':' + conf.fontweight1 + (conf.slant1 == 'normmal' ? '' : conf.slant1),
        conf.fontfamily2 + ':' + conf.fontweight2 + (conf.slant2 == 'normmal' ? '' : conf.slant2)
      ]
    }
  });
}

// query

function param(name) {
  var results = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)").exec(window.location.href);
  return (results && results[2]) ? decodeURIComponent(results[2].replace(/\+/g, " ")) : '';
}

// labels

function getStyle(obj, property) {
  return window.getComputedStyle(obj, null).getPropertyValue(property);
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

// translation

function translate() {
  s2.setAttribute('transform', 'translate(' + conf.x + ',' + conf.y + ')');
}

// sharing query

function queries() {
  var result = [];
  for (var k in conf)
    if (conf[k] !== def[k])
      result.push(k + '=' + encodeURIComponent(conf[k]));
  return result.length ? '?' + result.join('&') : '';
}
