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

var $topnav = $('.thinstrip'),
  $search = $('#search form');

// FIXME: minor bug when viewport width changes and menu state isn't kept in sync
// To reproduce:
//   Resize to mobile, open the uw top-level links, then resize to desktop width

$('body').on('touchstart click', '#searchicon-wrapper, #listicon-wrapper', function () {
  var $this = $(this),
    $nav = [$search, $topnav],
    ismenu = $this.is('#listicon-wrapper');

    if (ismenu) {
      $nav.reverse();
    }

    $search.find('input.wTextInput').blur();

    var height = $nav[0].data('open') ? 0 :
      ismenu ? 340 : 45;

  $nav[0]
    .css('visibility', 'visible')
    .height(height)
    .data('open', !$nav[0].data('open'));

  $nav[1]
    .height(0)
    .data('open', false);

  // Toggle title Show/Hide text
  $this.attr('title', $this.attr('title').indexOf('Show') === -1 ?
    $this.attr('title').replace('Hide', 'Show') :
    $this.attr('title').replace('Show', 'Hide'));

  // if search is clicked
  if (!ismenu && $search.data('open')) {
    $search.find('input.wTextInput').focus();
    window.scrollTo(0, 0);
  }

  return false;

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