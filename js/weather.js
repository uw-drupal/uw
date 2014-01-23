/**
 * Header weather widget
 */

// #### START D7 behaviors wrapper #######
(function ($) {

  Drupal.behaviors.uw_weather = {
    attach: function (context, settings) {
// #######################################

// only call in the document context
if (context != document) {
  return;
}

var params = {
  q: 'http://www.atmos.washington.edu/rss/home.rss',
  v: '2.0'
};

var data = {
  temp: null,
  weather: null,
  icon: null
};

// create an element to hold the weather
var $li = $('<li class="weather" />');
$('.thinstrip ul').append($li);

var fetch_weather = function() {
  $.ajax({
    url: 'https://ajax.googleapis.com/ajax/services/feed/load',
    dataType: 'jsonp',
    data: params,
    success: function(json) {
      var entries = json.responseData.feed.entries, index = 0;
      for (var prop in data) {
        data[prop] = entries[index++].title.split(' | ')[1];
      }
      $('li.weather').html(
        '<a href="http://www.atmos.washington.edu/weather/forecast.php"><img src="//uw.edu/news/wp-content/themes/uw/img/weather/top-nav/' + data.icon + '.png" title="Current weather: ' + data.weather + '" alt="" /> Seattle ' + data.temp + '</a>'
      );
    }
  });
};

fetch_weather();
setInterval(fetch_weather, 9e5); // every 15 minutes

// #### END D7 behaviors wrapper #########
    }
  };

})(jQuery);
// #######################################