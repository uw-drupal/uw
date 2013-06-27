// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_weather = {
    attach: function (context, settings) {
// #######################################

/**
 * Header weather widget
 */

// only call in the document context
if (context != document) {
  return;
}

var data = {
  q:'http://www.atmos.washington.edu/rss/home.rss',
  v:'2.0'
};

$.ajax({
  url: 'https://ajax.googleapis.com/ajax/services/feed/load?callback=?',
  dataType: 'jsonp',
  data: data,
  success: function(json) {
    var icon = $.trim(json.responseData.feed.entries[2].title.split('|')[1]);
    var weat = $.trim(json.responseData.feed.entries[1].title.split('|')[1]);
    var temp = $.trim(json.responseData.feed.entries[0].title.split('|')[1]);
    var html = '<li class="header-weather"><a href="http://www.atmos.washington.edu/weather/forecast/" title="Forecast is '+weat+'">';
    html += '<img src="//uw.edu/news/wp-content/themes/uw/img/weather/top-nav/'+icon+'.png" alt="Forecast is '+weat+'"/>';
    html += '</a></li>';
    html += '<li class="header-forcast"><a href="http://www.atmos.washington.edu/weather/forecast/">';
    html += 'Seattle '+temp;
    html += '</a></li>';
    $('.thinstrip ul').append(html);
  }
});

// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################