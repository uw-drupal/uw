jQuery(function($) {

  $('table').addClass('table'); // for bootstrap

  $('[href=#]').removeAttr('href'); //prevent ios nav bar from popping down

  // hide mobile safari url bar
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 0);

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

  // TODO: figure this out and separate out
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

  /** 'enhanced'-search (dev) **/

  // scroll to top when focusing search query
  $('#q').on('focus', function() {
    window.scrollTo(0,0)
  })

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

});