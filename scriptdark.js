$('.mode').click(function() {
  $('body').toggleClass("dark");
  $(this).toggleClass("off");
  
  var toggl = $(this);
  toggl.addClass('scaling');
  setTimeout(function() {
    toggl.removeClass('scaling');
  }, 520);
});