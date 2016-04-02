// sync sample content

var f1 = document.getElementById('font1'),
    f2 = document.getElementById('font2'),
    input = document.getElementById('input')

f1.textContent = input.value
f2.textContent = input.value

input.addEventListener('keyup', function() {
  f1.textContent = input.value
  f2.textContent = input.value
});

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
