/*
 * Search
 */

// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_search = {
    attach: function (context, settings) {
// #######################################

// only call in the document context
if (context != document) {
  return;
}

var $inputs = $('#search').find('input[type=radio]'),
  soptions = $('.search-options'),
  $toggle = $('.search-toggle'),
  $flash = $('.search-flash'),
  $q = $('#q'),
  ie = $.browser.msie; //$('[id^=ie]')

var update_placeholder = function () {
  var str = 'Search ' + $(this).data('placeholder');
  $q.prop('placeholder', str).attr('placeholder', str);
  if (ie) $q.val(str);
};

update_placeholder.call($inputs.filter(':checked'));
$inputs.change(update_placeholder);

$toggle.click(function () {
  if (!ie) $q.css('width', soptions.is(':hidden') ? '225px' : '');
  $(this).toggleClass('close-toggle');
  soptions.fadeToggle();
});

$('#search form').submit(function () {
  var $this = $(this),
    $input = $inputs.filter(':checked'),
    method = $input.val(),
    query = encodeURIComponent($q.val());

    if (method === 'main')
      return true;

  if (method === 'directory') {
    window.location.href = 'http://www.washington.edu/home/peopledir/?method=name&whichdir=both&term=' + query;
    return false;
  }

  if (method === 'site') {
    window.location.href = $input.data('site') + 'search/node/' + query;
    return false;
  }
  return true; //all else fails, just go to the normal search
});

// scroll to top when focusing search query
$('#q').on('focus', function () {
  window.scrollTo(0, 0);
});

// fade in search toggle
$('#q').one('focus', function () {
  $toggle.fadeIn();
});


// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################