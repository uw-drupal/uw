// run only on non-touch devices (e.g. a hover-friendly mouse device)
if (window.Modernizr && !Modernizr.touch) {

  /*!
   * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
   * http://cherne.net/brian/resources/jquery.hoverIntent.html
   *
   * You may use hoverIntent under the terms of the MIT license. Basically that
   * means you are free to use hoverIntent as long as this header is left intact.
   * Copyright 2007, 2013 Brian Cherne
   */
  !function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:7,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.abs(pX-cX)+Math.abs(pY-cY)<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}}(jQuery);

  /*
   * Project: Twitter Bootstrap Hover Dropdown
   * Author: Cameron Spear
   * Contributors: Mattia Larentis
   *
   * Dependencies?: Twitter Bootstrap's Dropdown plugin
   *
   * A simple plugin to enable twitter bootstrap dropdowns to active on hover and provide a nice user experience.
   *
   * No license, do what you want. I'd love credit or a shoutout, though.
   *
   * http://cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
   */
  ;(function($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {

      // the element we really care about
      // is the dropdown-toggle's parent
      $allDropdowns = $allDropdowns.add(this.parent());

      return this.each(function() {
        var $this = $(this).parent(),
          defaults = {
            delay: 500,
            instantlyCloseOthers: true
          },
          data = {
            delay: $(this).data('delay'),
            instantlyCloseOthers: $(this).data('close-others')
          },
          settings = $.extend(true, {}, defaults, options, data),
          timeout;

          var hover_in = function() {
            if(settings.instantlyCloseOthers === true)
              $allDropdowns.removeClass('open');

            window.clearTimeout(timeout);
            $(this).addClass('open');
          },
          hover_out = function() {
            timeout = window.setTimeout(function() {
              $this.removeClass('open');
            }, settings.delay);
          };

        $this.hoverIntent(hover_in, hover_out);
      });
    };

    // apply dropdownHover to all elements with the data-hover="dropdown" attribute
    $(document).ready(function() {
      $('[data-hover="dropdown"]').dropdownHover();
    });
  })(jQuery, this);

}