/*jslint browser:true*/
/*jslint node:true*/
'use strict';

/// shorthands

function $(x) { return document.getElementById(x); } // id selector
function l(t, e, c) { t.addEventListener(e, c); }    // event listener

// init

var s1 = $('sample1'), s2 = $('sample2');
s1.textContent = s2.textContent = $('input').value;
s1.setAttribute('font-family', 'Tsukushi A Round Gothic');
$('input').style.fontFamily = 'Tsukushi A Round Gothic';
s2.setAttribute('font-family', 'Tsukushi B Round Gothic');
s2.setAttribute('fill', 'green');
s2.setAttribute('fill-opacity', '.7');

// update sample content

l($('input'), 'input',
  function() { s1.textContent = s2.textContent = this.value; });

// update font family

l($('fontfamily1'), 'input', function() {
  $('input').style.fontFamily = this.value || 'Tsukushi A Round Gothic';
  s1.setAttribute('font-family', this.value || 'Tsukushi A Round Gothic');
});

l($('fontfamily2'), 'input', function() {
  s2.setAttribute('font-family', this.value || 'Tsukushi B Round Gothic');
});

// update font color

function updatePageColor(buttonID, bodyClass) {
  l($(buttonID), 'click', function() { document.body.className = bodyClass; });
}

updatePageColor('select-light', 'color-light');
updatePageColor('select-sepia', 'color-sepia');
updatePageColor('select-storm', 'color-storm');
updatePageColor('select-dark', 'color-dark');

l($('color2'), 'input',
  function() { s2.setAttribute('fill', this.value || 'green'); });

// update slant

l($('slant'), 'change', function() {
  s1.setAttribute('font-style', this.value);
  s2.setAttribute('font-style', this.value);
});

// update font weight

l($('fontweight1'), 'change',
  function() { s1.setAttribute('font-weight', this.value); });

l($('fontweight2'), 'change',
  function() { s2.setAttribute('font-weight', this.value); });

// upate font size

l($('size2'), 'input',
  function() { s2.setAttribute('font-size', this.value * 50 || 50); });

// update varter spacing

l($('spacing2'), 'input',
  function() { s2.setAttribute('letter-spacing', this.value || 0); });

// update opacity

l($('opacity2'), 'input',
  function() { s2.setAttribute('fill-opacity', this.value || 0.7); });

// load webfonts

var h = document.head.innerHTML;

l($('webfont1'), 'input',
  function() { document.head.innerHTML = h + this.value; });

l($('webfont2'), 'input',
  function() { document.head.innerHTML = h + this.value; });
