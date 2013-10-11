/*
 * UW Alert Banner
 */

// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_alert = {
    attach: function (context, settings) {
// #######################################

// only call in the document context
if (context != document) {
  return;
}

// no cache busting
var cache = $.ajaxSettings.cache;
$.ajaxSettings.cache = true;

// load alert.js asynchronously from washington.edu
$.getScript('//www.washington.edu/static/alert.js');

// restore cache setting
jQuery.ajaxSettings.cache = cache;


// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################