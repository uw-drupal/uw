// Miscellaneous JS to run on DOM ready

jQuery(function ($) {

  // for bootstrap
  $('table').addClass('table');

  // prevent ios nav bar from popping down
  $('[href=#]').removeAttr('href');

  // hide mobile safari url bar
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);

});