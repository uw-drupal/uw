/**
 * Branding: Header strip, patch, band, footer
 */

// FIXME: clean this up

// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_branding = {
    attach: function (context, settings) {
// #######################################

// only call in the document context
if (context != document) {
  return;
}

var $thinstrip = $('.thinstrip'),
  $thinstrip_fixed = $thinstrip.clone().removeAttr('style').addClass('thinstrip-fixed thinstrip-hidden visible-desktop'),
  $body = $('body'),
  is_visible = false;

$body.append($thinstrip_fixed);

var move_thinstrip = function () {

  var top = $(this).scrollTop(),
    adjust = $body.data('alert-height') || 0;

  if ($(this).width() < 768) {
    return false;
  }

  if (top < 200 + adjust && is_visible) {
    $thinstrip_fixed.addClass('thinstrip-hidden');
    is_visible = false;
  }

  if (top > 240 + adjust && !is_visible) {
    $thinstrip_fixed.removeClass('thinstrip-hidden');
    is_visible = true;
  }

};

// throttle scroll callback
$(window).bind('scroll', move_thinstrip);

// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################