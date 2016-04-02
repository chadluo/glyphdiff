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

// listen font family

var family1 = document.getElementById('fontfamily1'),
    family2 = document.getElementById('fontfamily2')

family1.addEventListener('keyup', function() {
  f1.style.fontFamily = family1.value
  input.style.fontFamily = family1.value
})

family2.addEventListener(
    'keyup', function() { f2.style.fontFamily = family2.value });

// listen font weight

var weight1 = document.getElementById('fontweight1'),
    weight2 = document.getElementById('fontweight2')

weight1.addEventListener(
    'change', function() { f1.style.fontWeight = weight1.value })

weight2.addEventListener(
    'change', function() { f2.style.fontWeight = weight2.value })
