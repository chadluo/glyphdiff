// document.getElementById('font1').innerHTML =
//     document.getElementById('font2').innerHTML;
// document.getElementById('font2').addEventListener('keyup', function() {
//   document.getElementById('font1').innerHTML =
//       document.getElementById('font2').innerHTML;
// });

$('#font1').html($('#input').val())
$('#font2').html($('#input').val())
$('#input')
    .keyup(function() {
      $('#font1').html($('#input').val())
      $('#font2').html($('#input').val())
    })
