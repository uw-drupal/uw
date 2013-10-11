/*
 * Navigation, search icon
 */

// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_navigation = {
    attach: function (context, settings) {
// #######################################

// only call in the document context
if (context != document) {
  return;
}

// FIXME: minor bug when viewport width changes and menu state isn't kept in sync
// To reproduce:
//   Resize to mobile, open the uw top-level links, then resize to desktop width

$('body').on('touchstart click', '.search-toggle', function () {
  $('#search form').find('input.wTextInput').focus();
  window.scrollTo(0, 0);
});

// override and allow top-level menu clicks (vs. bootstrap toggle behavior)
$('.dropdown').click(function (e) {
  if ($(this).hasClass('open')) {
    var href = $('a', this).attr('href');
    if (typeof href !== 'undefined') {
      window.location.href = href;
    }
  }
});

// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################