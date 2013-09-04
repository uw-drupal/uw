<?php

$theme_path = drupal_get_path('theme', 'uw');
require_once $theme_path . '/includes/theme.inc';

function uw_id_safe($string) {
  // Replace with dashes anything that isn't A-Z, numbers, dashes, or underscores.
  return strtolower(preg_replace('/[^a-zA-Z0-9-]+/', '-', $string));
}

function uw_js_alter(&$javascript) {
  // Swap out jQuery to use an updated version of the library.
  $javascript['misc/jquery.js']['data'] = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
  $javascript['misc/jquery.js']['version'] = null;
}

function uw_preprocess_html(&$variables) {
  $variables['base_path'] = base_path();
}

# helper function processes menu render arrays
# - insert some aria and role attributes
function _uw_alter_menu(&$menu, $dropdown = false) {
  # correct $menu if menu_block menu
  if (isset($menu['#block']) && $menu['#block']->module === 'menu_block') {
    $menu = &$menu['#content'];
  }
  foreach (element_children($menu) as $_key) {
    $link = &$menu[$_key];
    $link['#attributes']['role'] = 'presentation';
    $link['#localized_options']['attributes']['role'] = 'menuitem';
    if (isset($link['#below']) && count($link['#below'])) {
      # dropdowns get special treatment
      if ($dropdown) {
        $link['#attributes']['aria-haspopup'] = 'true';
        $link['#localized_options']['attributes']['data-hover'] = 'dropdown';
      }
      foreach (element_children($link['#below']) as $__key) {
        $below_link = &$link['#below'][$__key];
        $below_link['#attributes']['role'] = 'presentation';
        $below_link['#localized_options']['attributes']['role'] = 'menuitem';
        # if dropdown, unset links below second level
        if ($dropdown) {
          unset($link['#below'][$__key]['#below']);
        }
      }
    }
  }
}

/**
 * Preprocess variables for region.tpl.php
 *
 * @see region.tpl.php
 */
function uw_preprocess_region(&$variables, $hook) {
  // remove "well" class added in bootstrap base theme
  if ($variables['region'] == 'sidebar_first') {
    if(($key = array_search('well', $variables['classes_array'])) !== false) {
        unset($variables['classes_array'][$key]);
    }
  }
}

function uw_preprocess_block(&$variables) {
  if ($variables['block']->region == 'sidebar_first') {
    $variables['classes_array'][] = 'widget';

    // menus get a special class
    if ($variables['block']->module == 'menu_block') {
      $variables['classes_array'][] = 'widget_nav_menu';
    }
  }
}

function uw_preprocess_page(&$variables) {
  global $theme_path;
  $base_path = base_path();

  # modify dropdown menus: primary_nav and any menu_* in the dropdowns region
  if (isset($variables['primary_nav']) && is_array($variables['primary_nav'])) {
    _uw_alter_menu($variables['primary_nav'], true);
  }

  # find all blocks that are prefixed "menu_"
  # and process those menus with _uw_alter_menu
  foreach (element_children($variables['page']) as $key) {
    $element = &$variables['page'][$key];
    if (is_array($element) && count($element)) {
      foreach ($element as $_key => &$block) {
        if (strpos($_key, 'menu_') !== false) {
          _uw_alter_menu($block, $key === 'dropdowns');
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
 * override bootstrap_menu_tree
 */
function uw_menu_tree(&$variables) {
  $role = "";
  if (strpos($variables['tree'], 'menuitem') !== false) {
    // FIXME: menubar should only be used on horizontal menus (?)
    $role = 'role="menubar"';
  }
  return t('<ul class="menu nav" !role>', array('!role' => $role)) . $variables['tree'] . '</ul>';
}

/**
 * Implements hook_form_FORM_ID_alter() for search_block_form().
 */
function uw_form_search_block_form_alter(&$form, &$form_state) {
  // Remove the 'pull-left' class set by the bootstrap parent theme, which was
  // obscuring part of the form input's clickable area.
  // There's probably a better way to do this, but we're just rebuilding 
  // with the known, desired classes.
  $form['#attributes']['class'] = array('form-search', 'content-search');
}

function uw_pubcookie_login() {
	$pc_login_link = $GLOBALS['base_path'] . pubcookie_login_link() . '?destination=' . drupal_get_path_alias();
  $links = "<a href='$pc_login_link'>&copy;</a> ";
	$links .= l( date('Y') . ' University of Washington' , 'http://www.washington.edu');
	return $links;
}
