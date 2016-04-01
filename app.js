// sync sample content

$('#font1').html($('#input').val())
$('#font2').html($('#input').val())
$('#input')
    .keyup(function() {
      $('#font1').html($(this).val())
      $('#font2').html($(this).val())
    })

// listen font family

$('#fontfamily1')
    .keyup(function() {
      $('#font1').css('font-family', $(this).val());
      $('#input').css('font-family', $(this).val());
    });

$('#fontfamily2')
    .keyup(function() {
      $('#font2').css('font-family', $(this).val());
    });

// listen font weight

$('#fontweight1')
    .change(function() {
      $('#font1').css('font-weight', $(this).val());
    });

$('#fontweight2')
    .change(function() {
      $('#font2').css('font-weight', $(this).val());
    });
