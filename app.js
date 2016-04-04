'use strict';

/// id-selector shorthand

function $(x) {
  return document.getElementById(x);
}

// init

var s1 = $('sample1'), s2 = $('sample2');
s1.textContent = s2.textContent = $('input').value
s1.setAttribute('font-family', 'Tsukushi A Round Gothic');
s2.setAttribute('font-family', 'Tsukushi B Round Gothic');
s2.setAttribute('fill', 'green');
s2.setAttribute('fill-opacity', '.7');

// update sample content

$('input')
    .addEventListener(
        'input', function() { s1.textContent = s2.textContent = this.value; });

// update font family

$('fontfamily1')
    .addEventListener('input', function() {
      input.style.fontFamily = this.value || 'Tsukushi A Round Gothic';
      s1.setAttribute('font-family', this.value || 'Tsukushi A Round Gothic');
    });

$('fontfamily2')
    .addEventListener('input', function() {
      s2.setAttribute('font-family', this.value || 'Tsukushi B Round Gothic');
    });

// update font color

function updatePageColor(buttonID, bodyClass) {
  $(buttonID)
      .addEventListener(
          'click', function() { document.body.className = bodyClass; })
}

updatePageColor('select-light', 'color-light');
updatePageColor('select-sepia', 'color-sepia');
updatePageColor('select-storm', 'color-storm');
updatePageColor('select-dark', 'color-dark');

$('color2')
    .addEventListener('input', function() {
      s2.setAttribute('fill', this.value || 'green');
    });

// update slant

$('slant')
    .addEventListener('change', function() {
      s1.setAttribute('font-style', this.value);
      s2.setAttribute('font-style', this.value);
    });

// update font weight

$('fontweight1')
    .addEventListener(
        'change', function() { s1.setAttribute('font-weight', this.value) });

$('fontweight2')
    .addEventListener(
        'change', function() { s2.setAttribute('font-weight', this.value) });

// upate font size

$('size2')
    .addEventListener('input', function() {
      s2.setAttribute('font-size', this.value * 50 || 50)
    });

// update varter spacing

$('spacing2')
    .addEventListener('input', function() {
      s2.setAttribute('letter-spacing', this.value || 0)
    });

// update opacity

$('opacity2')
    .addEventListener('input', function() {
      s2.setAttribute('fill-opacity', this.value || .7)
    });
