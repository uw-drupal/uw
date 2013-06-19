jQuery(document).ready(function($){

  //prevent ios nav bar from popping down
  $('[href=#]').removeAttr('href');
  $('table').addClass('table') //for bootstrap

    /*
     * UW Alert Banner
     */
    var data = {
      number:1,
      type:'post',
      status:'publish'
    }

    var alert_url =  window.location.hash.indexOf('alert') === -1 ?
          "https://public-api.wordpress.com/rest/v1/sites/uwemergency.wordpress.com/posts/?callback=?" :
          'https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/?callback=?';

    $.getJSON(alert_url, data,
        function(res){
          if ( !res || res.found < 1)
            return;

          var post  = res.posts[0]
            , cats  = post.categories
            , slugs = []
            , css   = ''

          var colors = ['red', 'orange', 'blue', 'steel'];

          $.each(cats, function(i,val) {
            slugs += '|'+val.slug
          })
          for (var i = 0; i < colors.length; i += 1) {
            if(slugs.indexOf(colors[i]) != -1 ) {
              css = 'uwalert-'+colors[i].toLowerCase();
            }
          };

          if ( window.location.hash.indexOf('alert') != -1 )
            css = window.location.hash.replace('#','')

          if( css.length === 0 ){
            return false;
          }

          var anchor  = $('<a/>').attr({'href': 'http://emergency.uw.edu', 'title':post.title}).html('More info')
            , excerpt = post.excerpt.replace(' [...]', '... '+anchor.prop('outerHTML'))
            , html    = $('<div id="uwalert-alert-message" class="'+css+'" />')
                          .html('<div><h1>'+post.title+'</h1>'+excerpt+'</div>')
            , adjust  = $('body').hasClass('admin-bar') ? $('#wpadminbar').height() : 0;

          $('body')
            .prepend(html)
            .data('alert-height', $('#uwalert-alert-message').outerHeight() + adjust )

          var mini = $('<a id="alert-mini" class="hidden-phone"/>')
                        .attr({href:'#',title:post.title})
                        .click(function() {
                          $('body').data('scrolling',true).animate({scrollTop:0}, {duration:500, easing:'swing', complete:function() {$('body').data('scrolling',false)}})
                          $(this).slideUp()
                          return false;
                        }).html('Campus Alert: '+post.title).addClass(css)

          $('body').append(mini)

        },
        function(){

    });


    /**
     * Header weather widget
     */
      var data = {
        q:'http://www.atmos.washington.edu/rss/home.rss',
        v:'2.0'
      }
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

  var lip = $('#lip'),
      linkRotator = $('#linkRotator'),
      ul = linkRotator.find('ul').first(),
      linkImage = $('#linkArrowIcon'),
      topnav = $('.thinstrip'),
      search = $('#search form'),
      links = linkImage.attr('src'),
      closeImage = $('#menuClose');

	ul.hide();
	linkImage.click(function(){
	    ul.show();
		var height = (linkRotator.height() != 0) ? 0 : ul.outerHeight();
		linkImage.addClass('hideLinkAnchor').one('webkitTransitionEnd', function() {
			  linkRotator.toggleClass('rotateLip').css('height', height);
		});
		return false;
	});

	closeImage.click(function(){
		if (linkRotator.height() != 0){
			linkRotator.css('height', 0).one('webkitTransitionEnd', function() {
				ul.hide();
				linkImage.removeClass('hideLinkAnchor');
			});
		}
		return false;
	});


  $('#q').on('focus', function() {
    window.scrollTo(0,0)
  })

  if ( $(window).width() < 768 ) {
    search.css('visibility','hidden')
    topnav.css('visibility','hidden')
  }

  $('body').on('touchstart click', '#searchicon-wrapper, #listicon-wrapper', function() {
    var $this = $(this)
      , $nav  = [search, topnav]
      , ismenu = $this.is('#listicon-wrapper')

    if ( ismenu )
      $nav.reverse()

    search.find('input.wTextInput').blur()

    var height = $nav[0].data('open') ? 0 :
                 ismenu ? 340 : 45;

    $nav[0]
      .css('visibility', 'visible')
      .height(height)
      .data('open',!$nav[0].data('open'))

    $nav[1]
      .height(0)
      .data('open', false )

    // Toggle title Show/Hide text
    $this.attr('title', $this.attr('title').indexOf('Show') ===  -1 ?
                          $this.attr('title').replace('Hide', 'Show') :
                          $this.attr('title').replace('Show', 'Hide') )

    // if search is clicked
    if ( !ismenu && search.data('open')) {
      search.find('input.wTextInput').focus()
      window.scrollTo(0,0)
    }

    return false;

  }).on('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', '.thinstrip, form.main-search', function(e) {

    var $this = $(this)

    //if ( !$this.data('open') && !$this.height() && $this.not('.thin-fixed'))
      //$this.css('visibility','hidden')

  })

});

jQuery(window).load(function() {
  $ = jQuery.noConflict();
  // hide mobile safari url bar
  setTimeout(function(){
    window.scrollTo(0, 0);
  }, 0);

  /**
   * Header Strip
   */
  var $thin    = $('.thinstrip')
      , strip  = $thin.clone().removeAttr('style').addClass('thin-fixed')
      , search = $('#search form')
      , win    = $(window)
      , bod    = $('body')


    bod.append(strip.hide())
    strip.data('otop',bod.hasClass('top'))
    win.bind('scroll', function() {

      var top    = $(this).scrollTop()
        , pos = bod.hasClass('admin-bar') ? 28 : 0
        , adjust = bod.data('alert-height') || pos
        , $mini = $('#alert-mini')

      if ( $(this).width() < 768 )
        return false

      if ( top < 180 + adjust){
        strip.css('top',-28).hide().data('showing',false)
        $mini.hide()
      }

      if ( top > 220 + adjust && !strip.data('showing') ) {
        strip.show().animate({top:strip.data('otop')+pos},{duration:300, easing:'swing'}).data('showing',true)
      }

      if ( $mini.length != 0 && !bod.data('scrolling') )
      {
        if ( top < 300 + adjust)
          $mini.slideUp()

        if ( top > 330 + adjust)
          $mini.slideDown()
      }
    });

/*
 * Dropdowns
 */
    // override and allow top-level menu clicks (vs. bootstrap toggle behavior)
    $('.dropdown').click(function(e) {
      if ($(this).hasClass('open') ) {
        var href = $('a', this).attr('href');
        if (typeof href !== 'undefined') {
          window.location.href = href;
        }
      }
    });

  /*
   * Responsive
   */
  $(window).resize(function() {
    var w = $(this).width()
    if ( w > 767 ) {
      search.removeAttr('style')
      $thin.removeAttr('style')
      strip.css('visibility','visible')
    }
  })

});

/** 'enhanced'-search (dev) **/
jQuery(document).ready(function($) {
  var $inputs  = $('#search ').find('input[type=radio]')
    , soptions = $('.search-options')
    , $toggle  = $('.search-toggle')
    , $flash   = $('.search-flash')
    , $q = $('#q')
    , query = encodeURIComponent($q.val())
    , ie = $.browser.msie //$('[id^=ie]')

  var update_placeholder = function() {
    var str = 'Search ' + $(this).data('placeholder')
    $q.prop('placeholder', str).attr('placeholder', str);
    if ( ie ) $q.val(str)
  }

  update_placeholder.call($inputs.filter(':checked'));
  $inputs.change(update_placeholder);

  $toggle.click(function() {
    if ( !ie ) $q.css('width', soptions.is(':hidden') ?  '225px' : '' )
    $(this).toggleClass('close-toggle')
    soptions.fadeToggle()
  })

  $('#search form').submit(function() {
    var $this  = $(this)
      , $input = $inputs.filter(':checked')
      , method = $input.val()

    if ( method === 'main' )
      return true;

    if ( method === 'directory') {
      window.location.href = 'http://www.washington.edu/home/peopledir/?method=name&whichdir=both&term=' + query
      return false;
    }

    if ( method === 'site') {
      window.location.href = $input.data('site') + 'search/node/' + query
      return false;
    }
    return true; //all else fails, just go to the normal search
  })

  $('#q').one('focus', function() {
    $toggle.fadeIn();
    //$flash.fadeIn().delay(2000).fadeOut()
    //soptions.fadeIn();
  })

})
