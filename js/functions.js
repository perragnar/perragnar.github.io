// Menu toggle
$('.main-navigation-button').on('click', function() {
  $(this).toggleClass('active');
  $('.main-navigation ul').fadeToggle('fast');
});
