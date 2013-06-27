/**
 * Branding: Header strip, patch, band, footer
 */

// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_branding = {
    attach: function (context, settings) {
// #######################################

// only call in the document context
if (context != document) {
  return;
}

var $thin    = $('.thinstrip'),
    strip  = $thin.clone().removeAttr('style').addClass('thinstrip-fixed'),
    search = $('#search form'),
    win    = $(window),
    bod    = $('body');

bod.append(strip.hide());
strip.data('otop',bod.hasClass('top'));

win.bind('scroll', function() {

  var top    = $(this).scrollTop(),
    pos = bod.hasClass('admin-bar') ? 28 : 0,
    adjust = bod.data('alert-height') || pos,
    $mini = $('#alert-mini');

  if ( $(this).width() < 768 )
    return false;

  if ( top < 180 + adjust){
    strip.css('top',-28).hide().data('showing',false);
    $mini.hide();
  }

  if ( top > 220 + adjust && !strip.data('showing') ) {
    strip.show().animate({top:strip.data('otop')+pos},{duration:300, easing:'swing'}).data('showing',true);
  }

  if ( $mini.length !== 0 && !bod.data('scrolling') )
  {
    if ( top < 300 + adjust)
      $mini.slideUp();

    if ( top > 330 + adjust)
      $mini.slideDown();
  }
});

// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################