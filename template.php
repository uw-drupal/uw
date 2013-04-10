<?php

$theme_path = drupal_get_path('theme', 'uw');
require_once $theme_path . '/includes/theme.inc';

function uw_js_alter(&$javascript) {
  // Swap out jQuery to use an updated version of the library.
  $javascript['misc/jquery.js']['data'] = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
  $javascript['misc/jquery.js']['version'] = null;
}

function uw_preprocess_html(&$variables) {
  $variables['base_path'] = base_path();
}

function uw_preprocess_page(&$variables) {
  global $theme_path;
  $base_path = base_path();

  # modify primary_nav before rendering
  # add [data-hover="dropdown"] for dropdown hover functionality
  # kpr($variables['primary_nav']);
  foreach ($variables['primary_nav'] as &$link) {
    if (count($link['#below'])) {
      $link['#attributes']['aria-haspopup'] = 'true';
      $link['#localized_options']['attributes']['role'] = array('menuitem');
      $link['#localized_options']['attributes']['data-hover'] = array('dropdown');
      # unset links below second level
      foreach ($link['#below'] as $key => &$_link) {
        if ($key[0] !== '#') {
          unset($_link['#below']);
        }
      }
    }
  }

  # add fallback jquery
  drupal_add_js("window.jQuery || document.write('<script src=\"$base_path$theme_path/js/jquery-1.8.3.min.js\"><' + '/script>');", array('type' => 'inline', 'group' => JS_LIBRARY, 'weight' => -19.9999999, 'every_page' => TRUE));

  # add web fonts
  drupal_add_css('https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C400%2C300', 'external');

  $variables['patch_color'] = theme_get_setting('patch_color');
  $variables['band_color'] = theme_get_setting('band_color');
  $variables['default_logo'] = theme_get_setting('default_logo');
  $variables['show_patch'] = theme_get_setting('show_patch');
  $variables['show_search'] = theme_get_setting('show_search');
  $variables['search_default_site'] = theme_get_setting('search_default_site');
  $variables['default_header'] = theme_get_setting('default_header');
  $variables['header_path'] = file_create_url(theme_get_setting('header_path'));
}

/**
 * override bootstrap theme wrapper function for the primary menu links
 */
function uw_menu_tree__primary(&$variables) {
  return '<ul class="menu nav" role="menubar">' . $variables['tree'] . '</ul>';
}