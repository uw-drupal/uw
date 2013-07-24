// Miscellaneous JS to run on DOM ready

jQuery(function ($) {

  // update aria attributes dynamically on dropdown menus
  var hover = '[data-hover="dropdown"]',
      toggle = '[data-toggle="dropdown"]';

  function update_dropdown_aria(e) {
    var $parent = $(this).parent(),
        menu_id = $(this).data('menu-id'),
        $menu = $('#' + menu_id),
        is_open = $parent.hasClass('open') && e.type !== 'mouseleave';
    $parent.attr('aria-controls', menu_id);
    $menu.attr('aria-expanded', is_open ? 'true' : 'false');
    $menu.attr('aria-hidden', !is_open ? 'true' : 'false');
  }

  // bind events to update the aria attributes on menus
  $(document)
    .on('click.uw.dropdown', toggle, update_dropdown_aria)
    .on('mouseenter.uw.dropdown mouseleave.uw.dropdown', hover, update_dropdown_aria);

  // for bootstrap
  $('table').addClass('table');

  // prevent ios nav bar from popping down
  $('[href=#]').removeAttr('href');

  // hide mobile safari url bar
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);

});