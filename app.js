$('#font1').html($('#input').val())
$('#font2').html($('#input').val())
$('#input')
    .keyup(function() {
      $('#font1').html($(this).val())
      $('#font2').html($(this).val())
    })

$('#fontfamily1')
    .keyup(function() {
      $('#font1').css('font-family', $(this).val());
      $('#input').css('font-family', $(this).val());
    });

$('#fontfamily2')
    .keyup(function() {
      $('#font2').css('font-family', $(this).val());
    });
